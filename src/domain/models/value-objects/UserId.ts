import { z } from "zod";
import { Result, err, ok } from "neverthrow";

import { ValidationError } from "@core/errors";

/**
 * User ID value object schema
 */
const userIdSchema = z
  .string()
  .trim()
  .min(1, "User ID cannot be empty")
  .max(100, "User ID cannot exceed 100 characters");

/**
 * User ID value object
 */
type UserId = z.infer<typeof userIdSchema>;

/**
 * Create a UserId value object
 *
 * @param value - ID value
 * @returns UserId value object, or error if validation failed
 */
function createUserId(value?: unknown): Result<UserId, ValidationError> {
  const result = userIdSchema.safeParse(value);

  if (!result.success) {
    const errorMessage = result.error.errors.map((e) => e.message).join(", ");
    return err(new ValidationError(`Invalid user ID: ${errorMessage}`));
  }
  return ok(result.data);
}

export { createUserId, type UserId };
