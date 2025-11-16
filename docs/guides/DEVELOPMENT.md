# 開発ガイドライン

このドキュメントは、このプロジェクトの開発に必要な共通のガイドラインを説明します。

## プロジェクト概要

プロジェクト概要と技術スタックについては、[クイックスタートガイド](./QUICKSTART.md#プロジェクト概要) を参照してください。

## プロジェクト構造

パッケージ構成とアーキテクチャ設計の詳細については、[PACKAGE_DESIGN.md](../architecture/PACKAGE_DESIGN.md) を参照してください。

## 開発ガイドライン

### 新しいエンドポイントを追加する場合

1. **ハンドラーを実装**: `src/interfaces/handlers/` にハンドラーを追加
2. **Zod スキーマを定義**: 必要に応じてバリデーション用のスキーマを定義
3. **アプリケーションサービスを作成**: `src/application/services/` にビジネスロジックを実装
4. **必要に応じてドメインモデルを追加**: `src/domain/` にエンティティや値オブジェクトを追加

### エラーハンドリングについて

エラーハンドリングの詳細については、[CODE_STYLE.md](../conventions/CODE_STYLE.md#エラーハンドリング) を参照してください。

**重要**: Application層とDomain層では、必ず `neverthrow` の `Result` 型を使用し、メソッドチェーンで処理を連結します。

### バリデーション

Zod スキーマは手動で定義します。`@hono/zod-validator` を使用してバリデーションを実装してください。

### 依存関係の追加

- **ランタイム依存**: `bun add <package>`
- **開発依存**: `bun add -d <package>`

## ファイル命名規則

詳細な命名規則については、[NAMING.md](../conventions/NAMING.md) を参照してください。

## コーディング規約

詳細なコーディング規約については、[CODE_STYLE.md](../conventions/CODE_STYLE.md) を参照してください。

## 注意事項

1. **依存関係の方向**: レイヤー間の依存関係を守る。詳細は [PACKAGE_DESIGN.md](../architecture/PACKAGE_DESIGN.md#依存関係の方向) を参照
2. **エラーハンドリング**:
   - **Domain層・Application層**: 必ず `Result<T, E>` 型を返し、メソッドチェーンを使用。詳細は [CODE_STYLE.md](../conventions/CODE_STYLE.md#エラーハンドリング) を参照
   - **Interface層**: Application層から返された `Result` を `match()` などで処理
3. **型安全性**: TypeScript の型を活用し、`any` を避ける。詳細は [CODE_STYLE.md](../conventions/CODE_STYLE.md#型定義) を参照
4. **メソッドチェーンの使用**: Domain層・Application層では早期リターンではなく、メソッドチェーンで処理を連結する。詳細は [CODE_STYLE.md](../conventions/CODE_STYLE.md#メソッドチェーンの使用) を参照

## スクリプト

利用可能なスクリプトについては、[クイックスタートガイド](./QUICKSTART.md#スクリプト) を参照してください。

## 参考資料

技術スタックの詳細と参考資料については、[TECH_STACK.md](../architecture/TECH_STACK.md) を参照してください。
