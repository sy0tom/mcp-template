import { z } from "zod";
import { Result, err, ok } from "neverthrow";

import { ValidationError } from "@core/errors";

/**
 * User age value object schema
 */
const userAgeSchema = z
  .number()
  .int("Age must be an integer")
  .min(0, "Age must be 0 or greater")
  .max(150, "Age must be 150 or less");

/**
 * User age value object
 */
type UserAge = z.infer<typeof userAgeSchema>;

/**
 * Create a UserAge value object
 *
 * @param value - Age value
 * @returns UserAge value object, or error if validation failed
 */
function createUserAge(value?: unknown): Result<UserAge, ValidationError> {
  const parseResult = userAgeSchema.safeParse(value);
  if (!parseResult.success) {
    return err(
      new ValidationError(
        `Invalid age: ${parseResult.error.errors.map((e) => e.message).join(", ")}`
      )
    );
  }
  return ok(parseResult.data);
}

export { createUserAge, type UserAge };
