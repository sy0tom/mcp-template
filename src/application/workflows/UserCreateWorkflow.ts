import type { AppError } from "@core/errors";
import {
  type User,
  type UserAge,
  type UserName,
  createUserAge,
  createUserName
} from "@domain/models";
import type { IUserRepository } from "@domain/repositories";
import { type Result, ResultAsync } from "neverthrow";
import { ValidationError } from "@core/errors";
import { createNewUser } from "@domain/models";
import { resultToResultAsync } from "@core/utils";

interface UserCreateWorkflow {
  execute: (unValidParam?: Record<string, unknown>) => ResultAsync<UserCreateResult, AppError>;
}

type UserCreateCommand = {
  name: UserName;
  age: UserAge;
};

type UserCreateResult = {
  id: string;
  name: string;
  age: number;
};

type Dependencies = {
  userRepository: IUserRepository;
};

const createUserCreateWorkflow = ({ userRepository }: Dependencies): UserCreateWorkflow => {
  const createCommand = (
    unValidParam?: Record<string, unknown>
  ): Result<UserCreateCommand, ValidationError> => {
    return createUserName(unValidParam?.name).andThen((name) =>
      createUserAge(unValidParam?.age).map((age) => ({ name, age }))
    );
  };
  const saveNewUser = (command: UserCreateCommand): ResultAsync<User, AppError> => {
    const user = createNewUser(command.name, command.age);
    return userRepository.save(user).map(() => user);
  };

  const convertToResult = (user: User): UserCreateResult => {
    return { id: user.id, name: user.name, age: user.age };
  };

  return {
    execute: (unValidParam?: Record<string, unknown>): ResultAsync<UserCreateResult, AppError> => {
      return resultToResultAsync(createCommand(unValidParam))
        .andThen((command) => saveNewUser(command))
        .map(convertToResult);
    }
  };
};

export { createUserCreateWorkflow, type UserCreateWorkflow };
