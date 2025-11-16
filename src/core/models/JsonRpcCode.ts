export const JsonRpcCode = {
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
  PARSE_ERROR: -32700,
  SERVER_ERROR: -32000,
  UNAUTHORIZED: -32001
} as const;

export type JsonRpcCodeType = (typeof JsonRpcCode)[keyof typeof JsonRpcCode];
