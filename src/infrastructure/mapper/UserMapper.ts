import {
  type User,
  createRegisteredUser,
  createUserAge,
  createUserId,
  createUserName
} from "@domain/models";

const toRegisteredUsers = (
  rows: {
    id: string;
    name: string;
    age: number;
    created_at: string;
    updated_at: string;
  }[]
): User[] => {
  const users: User[] = [];

  for (const row of rows) {
    const userIdResult = createUserId(row.id);
    if (userIdResult.isErr()) {
      throw userIdResult.error;
    }

    const userNameResult = createUserName(row.name);
    if (userNameResult.isErr()) {
      throw userNameResult.error;
    }

    const userAgeResult = createUserAge(row.age);
    if (userAgeResult.isErr()) {
      throw userAgeResult.error;
    }

    const user = createRegisteredUser(
      userIdResult.value,
      userNameResult.value,
      userAgeResult.value,
      new Date(row.created_at),
      new Date(row.updated_at)
    );

    users.push(user);
  }

  return users;
};

export { toRegisteredUsers };
