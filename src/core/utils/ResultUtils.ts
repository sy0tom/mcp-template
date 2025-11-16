import type { AppError } from "@core/errors";
import { type Result, ResultAsync } from "neverthrow";

const resultToResultAsync = <T, E extends AppError>(
  result: Result<T, E>
): ResultAsync<T, AppError> => {
  return result.match(
    (value) => ResultAsync.fromSafePromise(Promise.resolve(value)),
    (error) => ResultAsync.fromPromise(Promise.reject(error), (err) => err as AppError)
  );
};

export { resultToResultAsync };
