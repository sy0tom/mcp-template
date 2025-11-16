import type { IUserRepository } from "@domain/repositories";
import type { User } from "@domain/models";
import { InternalServerError } from "@core/errors";
import type { Database } from "bun:sqlite";
import { toRegisteredUsers } from "@infrastructure/mapper";
import { ResultAsync } from "neverthrow";

type Dependencies = {
  db: Database;
};

function createUserRepository({ db }: Dependencies): IUserRepository {
  const findAllStmt = db.prepare("SELECT * FROM users ORDER BY created_at DESC");
  const insertStmt = db.prepare(
    "INSERT INTO users (id, name, age, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
  );

  return {
    findAll(): ResultAsync<User[], InternalServerError> {
      return ResultAsync.fromPromise(
        Promise.resolve().then(() => {
          try {
            const rows = findAllStmt.all() as Array<{
              id: string;
              name: string;
              age: number;
              created_at: string;
              updated_at: string;
            }>;
            if (rows.length === 0) {
              return [];
            }
            return toRegisteredUsers(rows);
          } catch (error) {
            if (error instanceof InternalServerError) {
              throw error;
            }
            throw new InternalServerError("Failed to find all users", error as Error);
          }
        }),
        (error) =>
          error instanceof InternalServerError
            ? error
            : new InternalServerError("Failed to find all users", error as Error)
      );
    },

    save(user: User): ResultAsync<void, InternalServerError> {
      return ResultAsync.fromPromise(
        Promise.resolve().then(() => {
          try {
            insertStmt.run(
              user.id,
              user.name,
              user.age,
              user.createdAt.toISOString(),
              user.updatedAt.toISOString()
            );
          } catch (error: unknown) {
            throw new InternalServerError("Failed to save user", error);
          }
        }),
        (error) =>
          error instanceof InternalServerError
            ? error
            : new InternalServerError("Failed to save user", error as Error)
      );
    }
  };
}

export { createUserRepository };
