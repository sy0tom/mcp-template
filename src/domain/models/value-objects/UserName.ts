import { z } from "zod";
import { Result, err, ok } from "neverthrow";

import { ValidationError } from "@core/errors";

/**
 * User name value object schema
 */
const userNameSchema = z
  .string()
  .trim()
  .min(1, "User name cannot be empty")
  .max(100, "User name cannot exceed 100 characters");

/**
 * User name value object
 */
type UserName = z.infer<typeof userNameSchema>;

/**
 * Create a UserName value object
 *
 * @param value - Name value
 * @returns UserName value object, or error if validation failed
 */
function createUserName(value?: unknown): Result<UserName, ValidationError> {
  const parseResult = userNameSchema.safeParse(value);
  if (!parseResult.success) {
    return err(
      new ValidationError(
        `Invalid user name: ${parseResult.error.errors.map((e) => e.message).join(", ")}`
      )
    );
  }
  return ok(parseResult.data);
}

export { createUserName, type UserName };
