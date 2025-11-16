import type { AppError } from "@core/errors";
import type { User } from "@domain/models";
import type { IUserRepository } from "@domain/repositories";
import { ResultAsync } from "neverthrow";

interface UsersGetWorkflow {
  execute: () => ResultAsync<UsersGetResult, AppError>;
}

type Dependencies = {
  userRepository: IUserRepository;
};

type UsersGetResult = {
  users: {
    id: string;
    name: string;
    age: number;
  }[];
};

const createUsersGetWorkflow = ({ userRepository }: Dependencies): UsersGetWorkflow => {
  const convertToResult = (users: User[]): UsersGetResult => {
    return { users: users.map((user) => ({ id: user.id, name: user.name, age: user.age })) };
  };
  return {
    execute: () => {
      return userRepository.findAll().map(convertToResult);
    }
  };
};

export { createUsersGetWorkflow, type UsersGetWorkflow };
