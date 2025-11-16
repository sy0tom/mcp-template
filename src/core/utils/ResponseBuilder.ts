import type { Context } from "hono";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { JsonRpcCode } from "@core/models";
import type { AppError } from "@core/errors";

export const buildSuccessResponse = <T>(data: T): CallToolResult => {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data)
      }
    ]
  };
};

export const buildErrorResponseForTool = (error: AppError): CallToolResult => {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          error: {
            code: error.code,
            message: error.message,
            statusCode: error.statusCode
          }
        })
      }
    ]
  };
};

export const buildErrorResponse = (
  context: Context,
  error: unknown,
  id: string | null
): Response => {
  const convertedError = convertError(error);
  return context.json(
    {
      jsonrpc: "2.0",
      error: convertedError,
      id
    },
    convertedError.status
  );
};

const convertError = (
  error: unknown
): {
  code: number;
  message: string;
  status: 500;
} => {
  return {
    code: JsonRpcCode.INTERNAL_ERROR,
    message: error instanceof Error ? error.message : String(error),
    status: 500 as const
  };
};
