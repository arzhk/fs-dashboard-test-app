import { Request, Response, NextFunction } from "express";

export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const errorHandler = (
  err: Error | APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.error(`[Error] ${new Date().toISOString()}:`, {
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });


  const errorTypes: Record<string, { status: number; message: string }> = {
    ValidationError: { status: 400, message: 'Validation Error' },
    MongoError: { status: 400, message: 'Database Error' },
    CastError: { status: 400, message: 'Database Error' },
    JsonWebTokenError: { status: 401, message: 'Authentication Error' },
    TokenExpiredError: { status: 401, message: 'Authentication Error' },
  };

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      success:false,
      message: err.message,
      details: err.details || undefined,
    });
  }

  const errorType = errorTypes[err.name];
  if (errorType) {
    return res.status(errorType.status).json({
        success:false,
      message: errorType.message,
      details: err.message,
    });
  }

  return res.status(500).json({
    success:false,
    message: process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message,
  });
};
