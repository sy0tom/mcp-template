import type { AppError } from "@core/errors";
import { buildErrorResponseForTool, buildSuccessResponse } from "@core/utils";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { Result } from "neverthrow";
import type { AppContext } from "@core/config";
import z from "zod";

interface McpTool {
  readonly name: string;
  readonly description: string;
  readonly inputSchema: z.ZodTypeAny;
  readonly execute: (args?: Record<string, unknown>) => Promise<CallToolResult>;
}

const createMcpToolHandler = (appContext: AppContext): McpTool[] => {
  return [
    {
      name: "get-users",
      description: "Get all users",
      inputSchema: z.object({}),
      execute: async (): Promise<CallToolResult> => {
        const result = await appContext.usersGetWorkflow.execute();
        return handleResult(result);
      }
    },
    {
      name: "create-user",
      description: "Create a new user",
      inputSchema: z.object({
        name: z.string().describe("The name of the user"),
        age: z.number().describe("The age of the user")
      }),
      execute: async (args?: Record<string, unknown>): Promise<CallToolResult> => {
        const result = await appContext.userCreateWorkflow.execute(args);
        return handleResult(result);
      }
    }
  ] as const;
};

const handleResult = <T>(result: Result<T, AppError>): CallToolResult => {
  return result.match(
    (value) => buildSuccessResponse(value),
    (error) => buildErrorResponseForTool(error)
  );
};

type McpToolHandler = ReturnType<typeof createMcpToolHandler>;
export { createMcpToolHandler, type McpToolHandler };
