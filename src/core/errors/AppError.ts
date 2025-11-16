import { JsonRpcCode, type JsonRpcCodeType } from "@core/models";

/**
 * Base application error class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: JsonRpcCodeType,
    public readonly statusCode: number = 500,
    public override readonly cause?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(message, JsonRpcCode.INVALID_PARAMS, 400, cause);
    this.name = "ValidationError";
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found", cause?: unknown) {
    super(message, JsonRpcCode.INTERNAL_ERROR, 404, cause);
    this.name = "NotFoundError";
  }
}

/**
 * Internal server error
 */
export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error", cause?: unknown) {
    super(message, JsonRpcCode.INTERNAL_ERROR, 500, cause);
    this.name = "InternalServerError";
  }
}
