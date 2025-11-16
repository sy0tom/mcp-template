import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { AppContext } from "@core/config";
import { createMcpToolHandler } from "@interfaces/handlers";
import { StreamableHTTPTransport } from "@hono/mcp";
import type { BlankEnv, BlankInput } from "hono/types";
import type { Context } from "hono";

/**
 * Create an MCP server and register tool handlers
 *
 * @param serverName - Server name
 * @param version - Server version
 * @param appContext - Application context
 * @returns MCP server management object
 */
const createMcpServerManager = (
  serverName: string,
  version: string,
  appContext: AppContext
): {
  isConnected: () => boolean;
  connect: () => Promise<void>;
  handleRequest: (c: Context<BlankEnv, "/mcp", BlankInput>) => Promise<Response>;
} => {
  let isConnected = false;
  const transport = new StreamableHTTPTransport();
  const server = new McpServer({
    name: serverName,
    version
  });

  // Register tool handlers
  const toolHandlers = createMcpToolHandler(appContext);
  toolHandlers.forEach((handler) => {
    server.registerTool(
      handler.name,
      {
        description: handler.description,
        inputSchema: handler.inputSchema
      },
      handler.execute
    );
  });

  const connect = async (): Promise<void> => {
    if (!isConnected) {
      await server.connect(transport);
      isConnected = true;
    }
    return;
  };

  return {
    isConnected: () => isConnected,
    connect,
    handleRequest: async (c: Context<BlankEnv, "/mcp", BlankInput>): Promise<Response> => {
      const response = await transport.handleRequest(c);
      if (!response) {
        return new Response("Internal server error", { status: 500 });
      }
      return response;
    }
  };
};

type McpServerManager = ReturnType<typeof createMcpServerManager>;
export { createMcpServerManager, type McpServerManager };
