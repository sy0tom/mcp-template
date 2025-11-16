import { createUserRepository } from "@infrastructure/repositories";
import {
  type UserCreateWorkflow,
  type UsersGetWorkflow,
  createUserCreateWorkflow,
  createUsersGetWorkflow
} from "@application/workflows";
import { createSqliteClient } from "@infrastructure/clients";
import { appConfig } from "@core/config";

type AppContext = {
  usersGetWorkflow: UsersGetWorkflow;
  userCreateWorkflow: UserCreateWorkflow;
};

const db =
  appConfig.nodeEnv === "development"
    ? createSqliteClient(":memory:")
    : createSqliteClient("users.db");

const userRepository = createUserRepository({ db });

const appContext: AppContext = {
  usersGetWorkflow: createUsersGetWorkflow({ userRepository }),
  userCreateWorkflow: createUserCreateWorkflow({ userRepository })
};

export { appContext, type AppContext };
