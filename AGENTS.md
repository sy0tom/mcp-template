# AGENTS.md

このドキュメントは、AIエージェントがこのプロジェクトを理解し、適切に作業できるようにするためのガイドです。

## 共通ガイドライン

このプロジェクトの開発に関する共通のガイドラインについては、以下のドキュメントを参照してください：

- **[クイックスタートガイド](./docs/guides/QUICKSTART.md)**: セットアップと基本的な使用方法
- **[開発ガイドライン](./docs/guides/DEVELOPMENT.md)**: プロジェクト概要、開発ガイドライン、注意事項など
- **[アーキテクチャ設計](./docs/architecture/PACKAGE_DESIGN.md)**: パッケージ構成とアーキテクチャ設計
- **[技術スタック](./docs/architecture/TECH_STACK.md)**: 使用技術の詳細
- **[コーディング規約](./docs/conventions/CODE_STYLE.md)**: コーディングスタイルと規約
- **[命名規則](./docs/conventions/NAMING.md)**: ファイル・変数・関数の命名規則

## AIエージェント向けベストプラクティス

このセクションは、AIエージェントがこのプロジェクトで正確に動作するための重要なガイドラインです。

### 初回セットアップ時の手順

初回セットアップの詳細な手順については、[クイックスタートガイド](./docs/guides/QUICKSTART.md) を参照してください。

### エラー発生時の対処手順

トラブルシューティングについては、[クイックスタートガイド](./docs/guides/QUICKSTART.md#トラブルシューティング) を参照してください。

### 開発ワークフロー

1. **新しいエンドポイントの追加時**
   - ハンドラーを `src/interfaces/handlers/` に実装
   - 必要に応じてZodスキーマを定義
   - アプリケーションサービスを作成
   - 必要に応じてドメインモデルを追加
   - `bun run dev` でエラーがないか確認

2. **依存関係の追加時**
   - 詳細は [開発ガイドライン](./docs/guides/DEVELOPMENT.md#依存関係の追加) を参照
   - 追加後、`bun run dev` で動作確認

## AIエージェントの振る舞い方

### 作業の進め方

1. **常に共通ガイドラインを参照**: 作業を開始する前に、[開発ガイドライン](./docs/guides/DEVELOPMENT.md) を確認してください
2. **レイヤー構造を理解**: Clean Architecture のレイヤー構造を理解し、適切な層にコードを配置してください（[アーキテクチャ設計](./docs/architecture/PACKAGE_DESIGN.md) を参照）
3. **エラーハンドリング**: Domain層・Application層では必ず `neverthrow` の `Result` 型を使用し、メソッドチェーンで処理を連結してください（[コーディング規約](./docs/conventions/CODE_STYLE.md#エラーハンドリング) を参照）
4. **型安全性**: TypeScript の型を活用し、`any` を避けてください（[コーディング規約](./docs/conventions/CODE_STYLE.md#型定義) を参照）

### ファイル編集の優先順位

1. **ハンドラー実装** (`src/interfaces/handlers/`): ハンドラーを実装
2. **アプリケーションサービス** (`src/application/services/`): ビジネスロジックの実装
3. **ドメインモデル** (`src/domain/`): エンティティや値オブジェクトの追加
4. **Zodスキーマ**: 必要に応じてバリデーション用のスキーマを定義

## 禁止事項

以下の行為は禁止されています：

1. **レイヤー間の依存関係の違反**: 内側のレイヤーが外側のレイヤーに依存しないようにする（[アーキテクチャ設計](./docs/architecture/PACKAGE_DESIGN.md) を参照）
2. **例外の使用**: Domain層・Application層では例外を投げず、`Result` 型を使用する（[コーディング規約](./docs/conventions/CODE_STYLE.md#エラーハンドリング) を参照）
3. **`any` 型の使用**: 型安全性を保つため、`any` 型の使用を避ける（[コーディング規約](./docs/conventions/CODE_STYLE.md#型定義) を参照）
4. **クラスの使用**: クラスは原則として使用禁止（エラークラスのみ例外）（[コーディング規約](./docs/conventions/CODE_STYLE.md#関数ファクトリーパターン) を参照）
5. **早期リターンの使用**: Domain層・Application層では早期リターンではなく、メソッドチェーンを使用する（[コーディング規約](./docs/conventions/CODE_STYLE.md#メソッドチェーンの使用) を参照）

## トラブルシューティング

トラブルシューティングについては、以下のドキュメントを参照してください：

- [クイックスタートガイドのトラブルシューティング](./docs/guides/QUICKSTART.md#トラブルシューティング)
