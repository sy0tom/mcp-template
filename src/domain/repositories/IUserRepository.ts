import type { User } from "@domain/models";
import type { ResultAsync } from "neverthrow";
import type { AppError } from "@core/errors";

/**
 * User repository interface
 */
export interface IUserRepository {
  /**
   * Find all users
   *
   * @returns ResultAsync containing array of users or error
   */
  findAll(): ResultAsync<User[], AppError>;
  /**
   * Save a user (create or update)
   *
   * @param user - User entity to save
   * @returns ResultAsync containing void or error
   */
  save(user: User): ResultAsync<void, AppError>;
}
