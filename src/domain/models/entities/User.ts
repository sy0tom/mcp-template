import type { UserAge, UserId, UserName } from "@domain/models";
import { generateId } from "@core/utils";

/**
 * User entity
 */
type User = RegisteredUser;

interface RegisteredUser {
  id: UserId;
  name: UserName;
  age: UserAge;
  createdAt: Date;
  updatedAt: Date;
}

function createNewUser(name: UserName, age: UserAge): RegisteredUser {
  const id = generateId();
  const now = new Date();
  return createRegisteredUser(id, name, age, now, now);
}

function createRegisteredUser(
  id: UserId,
  name: UserName,
  age: UserAge,
  createdAt: Date,
  updatedAt: Date
): RegisteredUser {
  return { id, name, age, createdAt, updatedAt };
}

export { type User, createNewUser, createRegisteredUser };
