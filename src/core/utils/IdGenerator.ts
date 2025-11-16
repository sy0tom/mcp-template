import uuid from "ui7";

/**
 * Generate a new UUID v4
 *
 * @returns A new UUID string
 */
const generateId = (): string => {
  return uuid();
};

export { generateId };
