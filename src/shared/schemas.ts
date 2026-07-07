import { type TSchema, Type } from '@sinclair/typebox';

export function createApiResponseSchema<T extends TSchema>(
  dataSchema: T,
  options?: { $id?: string; meta?: TSchema },
) {
  const properties: Record<string, TSchema> = {
    data: dataSchema,
  };

  if (options?.meta) {
    properties.meta = Type.Optional(options.meta);
  }

  return Type.Object(properties, { $id: options?.$id });
}
