# CODE_STYLE.md

このドキュメントは、このプロジェクトで使用するコーディング規約を定義します。

## 基本原則

1. **型安全性**: TypeScript の型システムを最大限に活用する
2. **可読性**: コードは書くよりも読まれる時間の方が長い
3. **一貫性**: プロジェクト全体で一貫したスタイルを維持する
4. **関数型プログラミング**: クラスは原則として使用禁止。関数ファクトリーパターンを使用する（エラークラスのみ例外）

## 型定義

### 型推論の活用

可能な限り型推論を使用し、明示的な型アノテーションは必要な場合のみ使用します。

```typescript
// Good: 型推論を使用
const userNameResult = createUserName("John Doe");

// Good: 型が複雑な場合
const result: ResultAsync<User[], AppError> = userRepository.findAll();
```

### `any` の使用について

`any` 型の使用は原則として避けます。必要な場合は `unknown` を使用し、適切な型ガードを実装します。

### 型エイリアス vs インターフェース

- **インターフェース**: オブジェクトの形状を定義し、拡張可能な場合（リポジトリなど）
- **型エイリアス**: ユニオン型、インターセクション型、複雑な型、関数ファクトリーの戻り値型の場合

```typescript
// インターフェース（拡張可能な契約）
export interface IUserRepository {
  findAll(): ResultAsync<User[], AppError>;
}

// 型エイリアス（関数ファクトリーの戻り値型）
export type UsersGetWorkflow = ReturnType<typeof createUsersGetWorkflow>;
```

## 関数ファクトリーパターン

**クラスは原則として使用禁止です。関数ファクトリーパターンを使用します。**

### 値オブジェクト

値オブジェクトは `zod` スキーマを使用してバリデーションを行い、`create<ValueObject>` 関数で作成します。

```typescript
import { z } from "zod";
import { Result, err, ok } from "neverthrow";
import { ValidationError } from "@core/errors";

const userNameSchema = z
  .string()
  .trim()
  .min(1, "User name cannot be empty")
  .max(100, "User name cannot exceed 100 characters");

type UserName = z.infer<typeof userNameSchema>;

function createUserName(value?: unknown): Result<UserName, ValidationError> {
  const parseResult = userNameSchema.safeParse(value);
  if (!parseResult.success) {
    return err(
      new ValidationError(
        `Invalid user name: ${parseResult.error.errors.map((e) => e.message).join(", ")}`
      )
    );
  }
  return ok(parseResult.data);
}

export { createUserName, type UserName };
```

### エンティティ

エンティティは型エイリアスで定義し、`create<Entity>` 関数で作成します。

```typescript
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
  return { id, name, age, createdAt: now, updatedAt: now };
}

export { type User, createNewUser };
```

### ワークフロー

ワークフローは関数ファクトリーとして実装し、`execute` メソッドを持つオブジェクトを返します。

```typescript
interface UsersGetWorkflow {
  execute: () => ResultAsync<UsersGetResult, AppError>;
}

const createUsersGetWorkflow = ({ userRepository }: Dependencies): UsersGetWorkflow => {
  return {
    execute: () => userRepository.findAll().map(convertToResult)
  };
};

export { createUsersGetWorkflow, type UsersGetWorkflow };
```

### リポジトリ

リポジトリは関数ファクトリーとして実装し、Domain層のインターフェースを実装します。

```typescript
function createUserRepository({ db }: Dependencies): IUserRepository {
  return {
    findAll(): ResultAsync<User[], InternalServerError> {
      return ResultAsync.fromPromise(
        Promise.resolve().then(() => {
          // データベース処理
        }),
        (error) => new InternalServerError("Failed to find all users", error as Error)
      );
    }
  };
}
```

## エラーハンドリング

### neverthrow の使用

Domain層とApplication層では、必ず `neverthrow` の `Result` / `ResultAsync` 型を使用します。例外は投げません。

### メソッドチェーンの使用

エラーハンドリングはメソッドチェーンで連結します。Domain層・Application層では早期リターンは使用しません。

```typescript
// Good: メソッドチェーンで連結
function execute(): ResultAsync<UserCreateResult, AppError> {
  return resultToResultAsync(createCommand(unValidParam))
    .andThen((command) => saveNewUser(command))
    .map(convertToResult);
}

// Bad: 早期リターン（Domain層・Application層では禁止）
function execute(): ResultAsync<UserCreateResult, AppError> {
  const commandResult = createCommand(unValidParam);
  if (commandResult.isErr()) {
    return ResultAsync.fromSafePromise(Promise.reject(commandResult.error));
  }
  // ...
}
```

### エラー型の統一

プロジェクト全体で `AppError` クラスとそのサブクラス（`ValidationError`, `NotFoundError`, `InternalServerError`）を使用します。

```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: JsonRpcCodeType,
    public readonly statusCode: number = 500,
    public override readonly cause?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(message, JsonRpcCode.INVALID_PARAMS, 400, cause);
    this.name = "ValidationError";
  }
}
```

## 非同期処理

非同期処理では `ResultAsync` を使用し、メソッドチェーンで処理を連結します。

```typescript
// Good: ResultAsync とメソッドチェーンを使用
function execute(): ResultAsync<UsersGetResult, AppError> {
  return userRepository.findAll().map(convertToResult);
}

// Bad: Promise チェーンや早期リターン
async function execute(): Promise<UsersGetResult> {
  const result = await userRepository.findAll();
  if (result.isErr()) {
    throw result.error;
  }
  return convertToResult(result.value);
}
```

## インポート・エクスポート

### インポートの順序

1. 外部ライブラリ
2. 内部モジュール（`@core`, `@domain` など）
3. 型のみのインポート

**注意**: インポートの順序はESLintで自動的にチェックされます。

### 名前付きエクスポートを優先

デフォルトエクスポートよりも名前付きエクスポートを優先します。

```typescript
export function createUsersGetWorkflow(deps: Dependencies): UsersGetWorkflow {
  // ...
}

export type UsersGetWorkflow = ReturnType<typeof createUsersGetWorkflow>;
```

## コメント

- **Why（なぜ）**: コードの意図や理由を説明
- **What（何）**: 複雑なロジックの動作を説明
- **How（どう）**: 実装の詳細はコードで表現（コメントは最小限）

パブリックAPIには JSDoc コメントを追加します。

## コードフォーマット

コードフォーマット（インデント、セミコロン、クォート、末尾カンマ、行の長さなど）はPrettierとESLintで自動的に制御されます。`bun run format` または `bun run lint:fix` を実行すると自動的にフォーマットされます。

## テスト

テストファイルは `*.test.ts` または `*.spec.ts` の形式で命名します。テストは AAA パターン（Arrange, Act, Assert）を使用します。

```typescript
test("createUserName should return UserName on success", () => {
  // Arrange
  const name = "John Doe";

  // Act
  const result = createUserName(name);

  // Assert
  expect(result.isOk()).toBe(true);
  if (result.isOk()) {
    expect(result.value).toBe(name);
  }
});
```

## レイヤーごとの規約

### Domain層

- ビジネスロジックのみを含む
- 外部依存を持たない
- 値オブジェクトは `Result` 型を返す
- メソッドチェーンを使用
- **関数ファクトリーパターンを使用**（クラスは使用しない）

### Application層

- ユースケースを実装（ワークフロー）
- Domain層に依存
- `ResultAsync` 型を返す
- メソッドチェーンを使用
- **関数ファクトリーパターンを使用**（クラスは使用しない）

### Infrastructure層

- 外部依存の実装
- Domain層のインターフェースを実装
- `ResultAsync` 型を返す
- **関数ファクトリーパターンを使用**（クラスは使用しない）

### Interface層

- HTTPリクエスト/レスポンスの処理（MCPツールの処理）
- Application層を呼び出し
- `Result` や `ResultAsync` を `match()` などで処理
- 早期リターンを使用可能

```typescript
const handleResult = <T>(result: Result<T, AppError>): CallToolResult => {
  return result.match(
    (value) => buildSuccessResponse(value),
    (error) => buildErrorResponseForTool(error)
  );
};
```

## パフォーマンス最適化

1. **関数ファクトリーパターンの活用**: クラスよりも軽量
2. **並列処理**: 独立した処理は `ResultAsync.combine()` などで並列実行
3. **Bun のネイティブ API**: Bun のネイティブ API を優先的に使用（例: `bun:sqlite`）

## 参考資料

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [neverthrow Documentation](https://github.com/supermacro/neverthrow)
- [Bun Documentation](https://bun.sh/docs)
