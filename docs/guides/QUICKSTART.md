# クイックスタートガイド

このドキュメントは、AIエージェントと人間のエンジニアが共通して必要な、プロジェクトのセットアップと基本的な使用方法を説明します。

## プロジェクト概要

このプロジェクトは、**Clean Architecture / DDD (Domain-Driven Design)** パターンに基づいた、**Model Context Protocol (MCP)** サーバーのテンプレートです。

### 技術スタック

- **ランタイム**: Bun
- **フレームワーク**: Hono
- **バリデーション**: Zod
- **エラーハンドリング**: neverthrow

技術スタックの詳細については、[TECH_STACK.md](../architecture/TECH_STACK.md) を参照してください。

## セットアップ

### 1. 依存関係のインストール

```bash
bun install
```

### 2. アプリケーションの起動

開発サーバーを起動します。

```bash
bun run dev
```

## スクリプト

利用可能なスクリプトは以下の通りです：

- `bun run dev`: 開発サーバーを起動

## 次のステップ

- **開発を始める**: [開発ガイドライン](./DEVELOPMENT.md) を参照してください
- **アーキテクチャを理解する**: [アーキテクチャ設計](../architecture/PACKAGE_DESIGN.md) を参照してください
- **コーディング規約を確認する**: [コーディング規約](../conventions/CODE_STYLE.md) を参照してください

## トラブルシューティング

### ポートが使用中のエラー

```text
error: Failed to start server. Is port 3000 in use?
```

**対処方法**:

1. 既存のプロセスを停止: `lsof -ti:3000 | xargs kill -9` (macOS/Linux)
2. または、別のポートを使用するように設定を変更

### その他の問題

問題が発生した場合は、[開発ガイドライン](./DEVELOPMENT.md) を参照してください。
