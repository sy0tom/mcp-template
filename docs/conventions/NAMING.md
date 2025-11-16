# NAMING.md

このドキュメントは、このプロジェクトで使用する命名規則を定義します。

## 基本原則

1. **一貫性**: プロジェクト全体で一貫した命名規則を使用する
2. **明確性**: 名前から役割や用途が明確に分かる
3. **可読性**: コードを読む人が理解しやすい名前を選ぶ
4. **TypeScript の慣習**: TypeScript の標準的な命名規則に従う

## ファイル命名規則

| レイヤー       | 種類                       | 形式                                                             | 例                            |
| -------------- | -------------------------- | ---------------------------------------------------------------- | ----------------------------- |
| Domain         | エンティティ               | PascalCase                                                       | `User.ts`, `Order.ts`         |
| Domain         | 値オブジェクト             | PascalCase                                                       | `UserId.ts`, `UserName.ts`    |
| Domain         | リポジトリインターフェース | `I<Entity>Repository.ts`                                         | `IUserRepository.ts`          |
| Domain         | ドメインサービス           | `<service>.domain-service.ts` または `<service>.service.ts`      | `user.domain-service.ts`      |
| Application    | DTO                        | `<entity>.dto.ts`                                                | `user.dto.ts`                 |
| Application    | アプリケーションサービス   | `<service>.application-service.ts` または `<service>.service.ts` | `user.application-service.ts` |
| Application    | ワークフロー               | `<Workflow>Workflow.ts` (PascalCase)                             | `UserCreateWorkflow.ts`       |
| Infrastructure | リポジトリ実装             | `<Entity>RepositoryImpl.ts` (PascalCase)                         | `UserRepositoryImpl.ts`       |
| Infrastructure | 外部サービス実装           | `<service>.client.ts` または `<service>.adapter.ts`              | `email.client.ts`             |
| Interface      | MCPツールハンドラー        | `<Handler>Handler.ts` (PascalCase)                               | `McpHandler.ts`               |

**注意**:

- ハンドラー関数は `create<Handler>Handler` の形式で命名（例: `createMcpToolHandler`）
- 全てのファイル拡張子は `.ts`

## コード命名規則

### 関数・変数

| 種類           | 形式                                  | 例                                       |
| -------------- | ------------------------------------- | ---------------------------------------- |
| 変数           | camelCase                             | `user`, `userId`, `isValid`              |
| 定数           | UPPER_SNAKE_CASE                      | `MAX_RETRY_COUNT`, `API_BASE_URL`        |
| 関数・メソッド | camelCase（動詞で始める）             | `getUser`, `createUser`, `validateEmail` |
| 非同期関数     | camelCase（`async` キーワードを使用） | `getUserAsync`, `fetchUserData`          |

### 型・インターフェース

| 種類                             | 形式                                                                  | 例                                        |
| -------------------------------- | --------------------------------------------------------------------- | ----------------------------------------- |
| 関数ファクトリー                 | 関数名: `create<Service>` (camelCase)、型名: `<Service>` (PascalCase) | `createUserService` → `UserService`       |
| インターフェース                 | PascalCase（通常は `I` プレフィックス）                               | `IUserRepository`, `IEmailService`        |
| 型エイリアス                     | PascalCase                                                            | `UserService`, `Status`, `ApiResponse<T>` |
| ジェネリック型パラメータ         | 単一の大文字                                                          | `T`, `U`, `E`                             |
| ユニオン型・インターセクション型 | PascalCase                                                            | `UserOrGuest`, `UserAndProfile`           |

### エラー

| 種類         | 形式                              | 例                                 |
| ------------ | --------------------------------- | ---------------------------------- |
| エラークラス | PascalCase + `Error` サフィックス | `ValidationError`, `NotFoundError` |

**注意**: エラークラスはクラス使用禁止の例外として許可されています。詳細は [CODE_STYLE.md](./CODE_STYLE.md) を参照してください。

## ディレクトリ命名規則

- **標準形式**: kebab-case（小文字、ハイフン区切り）
  - 例: `user-management`, `order-processing`
- **プロジェクト標準ディレクトリ**:
  - 複数形: `entities`, `repositories`, `services`, `dto`
  - 単数形: `domain`, `application`, `infrastructure`, `interfaces`

## 注意事項

1. **生成コード**: `src/interfaces/generated/` 配下のファイルは自動生成されるため、命名規則は適用されません
2. **一貫性**: プロジェクト全体で一貫した命名規則を使用する
3. **可読性**: 名前が長すぎる場合は、適切に省略する（例: `UserApplicationService` → `UserService` でも可）
4. **レイヤーごとの規則**: 各レイヤーで異なる命名規則が適用される場合があるため、レイヤーごとの規則を確認する
