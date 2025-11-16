/**
 * Application configuration
 */
export const appConfig = {
  name: process.env.MCP_SERVER_NAME || "mcp-template",
  version: process.env.MCP_SERVER_VERSION || "1.0.0",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  idleTimeout: process.env.IDLE_TIMEOUT
    ? Math.min(parseInt(process.env.IDLE_TIMEOUT, 10), 255)
    : 30,
  nodeEnv: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info"
} as const;

export type AppConfig = typeof appConfig;
