import { FastifyInstance } from "fastify";

function isDbError(error: unknown): error is {
  message: string;
  code?: string;
  detail?: string;
  constraint?: string;
  table?: string;
  column?: string;
  cause?: unknown;
} {
  return typeof error === 'object' && error !== null;
}

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, req, res) => {
    req.log.error({
      err: error,
      method: req.method,
      url: req.url,
      userId: req.user?.userId,
    });

    if (error.validation) {
      return res.status(400).send({
        message: 'Validation error',
        details: error.validation,
      });
    }

    if (isDbError(error)) {
      req.log.error({
        message: error.message,
        code: error.code,
        detail: error.detail,
        constraint: error.constraint,
        table: error.table,
        column: error.column,
        cause: error.cause,
        method: req.method,
        url: req.url,
        userId: req.user?.userId,
      });
    }
    
    return res.status(500).send({
      message: 'Internal server error',
    });
  });
}