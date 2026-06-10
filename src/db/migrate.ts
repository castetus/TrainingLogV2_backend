import { pool } from './pool';
import fs from 'fs';

async function createMigrationsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id TEXT PRIMARY KEY,
      applied_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
};

async function getMigrationFiles(): Promise<string[]> {
  const files = await fs.promises.readdir('./migrations');
  return files.filter(file => file.endsWith('.sql')).sort();
};

async function hasMigrationBeenApplied(id: string): Promise<boolean> {
  const result = await pool.query('SELECT 1 FROM migrations WHERE id = $1', [id]);
  return Boolean(result.rowCount);
};

async function applyMigrations(): Promise<void> {
  await createMigrationsTable();

  const migrationFiles = await getMigrationFiles();

  for (const file of migrationFiles) {
    const id = file.replace('.sql', '');
    if (await hasMigrationBeenApplied(id)) {
      console.log(`Migration ${id} already applied, skipping.`);
      continue;
    }

    const sql = await fs.promises.readFile(`./migrations/${file}`, 'utf-8');

    await pool.query('BEGIN');

    try {
      await pool.query(sql);

      await pool.query(
        'INSERT INTO migrations (id) VALUES ($1)',
        [id]
      );

      await pool.query('COMMIT');

      console.log(`Applied migration: ${id}`);
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }
  }
};

applyMigrations();