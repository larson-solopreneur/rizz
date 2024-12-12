
# ストリートナンパ実績管理アプリ

## 概要
ストリートナンパの声かけ記録を管理するWebアプリケーションです。

## 技術スタック
- フロントエンド: React, TypeScript, TailwindCSS
- バックエンド: Express.js
- データベース: PostgreSQL
- ORM: Drizzle

## 環境構築手順

1. Replitで新しいプロジェクトを作成
2. 依存関係のインストール:
```bash
npm install
```

3. データベースのセットアップ:
```bash
npm run db:push
```

4. 開発サーバーの起動:
```bash
npm run dev
```

## 開発環境

アプリケーションは以下のポートで実行されます：
- Web アプリケーション: 5000番ポート

## 主な機能
- ユーザー認証（ログイン/登録）
- 声かけ記録の作成
- 統計情報の表示
- 履歴の確認

## トラブルシューティング

### データベースエラー
エラー: `DATABASE_URL must be set`
解決策: Replitのシークレットに`DATABASE_URL`が正しく設定されているか確認してください。

### ビルドエラー
エラー: `Type ... is not assignable to type ...`
解決策: `npm run check`を実行してタイプエラーを確認し、必要な型定義を修正してください。

### 実行時エラー
エラー: `Port 5000 is already in use`
解決策: 
1. 既存のプロセスを確認: `ps aux`
2. 該当するプロセスを終了: `kill <PID>`

## コントリビューション
1. Replitでプロジェクトをフォーク
2. 機能の追加やバグ修正を実装
3. プルリクエストを作成

## ライセンス
MIT
