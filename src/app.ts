import { Hono } from "hono";
import { createMcpServerManager } from "@core/config";
import { appConfig } from "@core/config/AppConfig";
import { logger } from "@core/utils";
import { appContext } from "@core/config";
import { buildErrorResponse } from "@core/utils";

/**
 * Initialize the application and set up routing
 */
const createApp = (): Hono => {
  const app = new Hono();
  const mcpServerManager = createMcpServerManager(appConfig.name, appConfig.version, appContext);

  app.use("/mcp", async (c, next) => {
    // Set CORS headers
    c.header("Access-Control-Allow-Origin", "*");
    c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    c.header("Access-Control-Expose-Headers", "Content-Type");
    c.header("Access-Control-Max-Age", "86400");
    if (c.req.method === "OPTIONS") {
      return c.body(null, 204);
    }
    await next();
  });

  // Handle MCP endpoint
  app.all("/mcp", async (c) => {
    if (c.req.method === "OPTIONS") {
      return c.body(null, 204);
    }

    logger.info("MCP request received", {
      method: c.req.method,
      url: c.req.url
    });

    try {
      if (!mcpServerManager.isConnected()) {
        await mcpServerManager.connect();
      }
      return await mcpServerManager.handleRequest(c);
    } catch (error: unknown) {
      logger.error("Error handling MCP request", error, {
        method: c.req.method,
        url: c.req.url
      });
      return buildErrorResponse(c, error, null);
    }
  });

  return app;
};

const app = createApp();

// Bun automatically calls Bun.serve() when the default export is an object with a fetch function
export default {
  port: appConfig.port,
  fetch: app.fetch,
  idleTimeout: appConfig.idleTimeout
};

logger.info("Server starting", {
  name: appConfig.name,
  version: appConfig.version,
  port: appConfig.port,
  nodeEnv: appConfig.nodeEnv
});
