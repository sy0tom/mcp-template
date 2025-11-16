# TECH_STACK.md

このドキュメントは、このプロジェクトで使用している技術スタックについて説明します。

## ランタイム・フレームワーク

### Bun

- **説明**: JavaScript/TypeScript ランタイム
- **用途**: プロジェクトの実行環境
- **公式ドキュメント**: [Bun Documentation](https://bun.sh/docs)

### Hono

- **説明**: 軽量な Web フレームワーク
- **用途**: HTTP リクエスト/レスポンスの処理、ルーティング
- **公式ドキュメント**: [Hono Documentation](https://hono.dev/)

## バリデーション・型安全性

### Zod

- **説明**: TypeScript ファーストのスキーマバリデーションライブラリ
- **用途**: リクエスト/レスポンスのバリデーション
- **公式ドキュメント**: [Zod Documentation](https://zod.dev/)

### TypeScript

- **説明**: JavaScript に静的型付けを追加したプログラミング言語
- **用途**: 型安全性の確保
- **公式ドキュメント**: [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## エラーハンドリング

### neverthrow

- **説明**: Result 型による関数型エラーハンドリングライブラリ
- **用途**: Domain層とApplication層でのエラーハンドリング
- **公式ドキュメント**: [neverthrow Documentation](https://github.com/supermacro/neverthrow)
- **注意**: Domain層とApplication層では、必ず `Result<T, E>` 型を返し、メソッドチェーンで処理を連結します

### eslint-plugin-neverthrow

- **説明**: neverthrow のベストプラクティスを強制する ESLint プラグイン
- **用途**: neverthrow の適切な使用を保証
- **公式ドキュメント**: [eslint-plugin-neverthrow](https://github.com/supermacro/eslint-plugin-neverthrow)

## MCP (Model Context Protocol)

### @modelcontextprotocol/sdk

- **説明**: Model Context Protocol SDK
- **用途**: MCP サーバーの実装
- **公式ドキュメント**: [Model Context Protocol](https://modelcontextprotocol.io/)

### @hono/mcp

- **説明**: Hono と MCP の統合ライブラリ
- **用途**: Hono フレームワーク上で MCP サーバーを構築
- **公式ドキュメント**: [@hono/mcp](https://github.com/honojs/mcp)

## その他の依存関係

### @hono/zod-validator

- **説明**: Hono 用の Zod バリデーター
- **用途**: リクエストボディ、クエリパラメータ、パスパラメータのバリデーション

### zod-to-json-schema

- **説明**: Zod スキーマを JSON Schema に変換するライブラリ
- **用途**: OpenAPI 仕様との相互運用

## 依存関係の追加

新しい依存関係を追加する場合は、以下のコマンドを使用します：

- **ランタイム依存**: `bun add <package>`
- **開発依存**: `bun add -d <package>`

## 参考資料

- [Bun Documentation](https://bun.sh/docs)
- [Hono Documentation](https://hono.dev/)
- [Zod Documentation](https://zod.dev/)
- [neverthrow Documentation](https://github.com/supermacro/neverthrow)
- [Model Context Protocol](https://modelcontextprotocol.io/)
