# Review Analysis Frontend

レビュー分析ダッシュボードのフロントエンド。**Next.js 15** + **TypeScript** + **Tailwind CSS** を使用したモダンなUI。

## プロジェクト概要

- **フレームワーク**: Next.js 15（最新のApp Router対応）
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **パッケージ管理**: npm / yarn / pnpm / bun
- **バックエンド**: FastAPI（review_analysis_back）

## 要件

- Node.js 18以上
- npm / yarn / pnpm / bun

## セットアップ

### 1. プロジェクトディレクトリに移動

```bash
cd review_analysis_front
```

### 2. 依存パッケージをインストール

```bash
npm install
# または
yarn install
# または
pnpm install
# または
bun install
```

### 3. 環境変数を設定（`.env.local` ファイルを作成）

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 起動コマンド

### 開発モード

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、プロジェクトが確認できます。

### ビルド

```bash
npm run build
```

### 本番モード

```bash
npm run start
```

### リント・コード整形

```bash
npm run lint
# Prettier でコード整形
npm run format
```

## プロジェクト構成

```
review_analysis_front/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # ルートレイアウト
│   ├── page.tsx                    # ホームページ
│   ├── globals.css                 # グローバルスタイル
│   └── design-system/              # デザインシステムページ
│       └── page.tsx
├── lib/
│   └── utils.ts                    # ユーティリティ関数
├── public/                         # 静的ファイル
├── components.json                 # UI フレームワーク設定
├── next.config.ts                  # Next.js 設定
├── tsconfig.json                   # TypeScript 設定
├── tailwind.config.ts              # Tailwind CSS 設定
├── package.json                    # 依存関係
├── .env.example                    # 環境変数テンプレート
├── .gitignore
└── README.md                       # このファイル
```

## 開発ワークフロー

### 1. ページを作成

`app/` ディレクトリに新しい `.tsx` ファイルを追加：

```tsx
export default function Page() {
  return <h1>新しいページ</h1>
}
```

### 2. コンポーネントを追加

`components/` ディレクトリにコンポーネントを作成：

```tsx
// components/ReviewCard.tsx
export function ReviewCard({ review }: { review: Review }) {
  return <div>{review.content}</div>
}
```

### 3. リント・フォーマット

```bash
npm run lint
npm run format
```

### 4. ビルド・テスト

```bash
npm run build
```

### 5. コミット・プッシュ

```bash
git add .
git commit -m "feat: add review list page"
git push origin main
```

## バックエンド連携

バックエンドの FastAPI サーバーと通信します：

```tsx
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`
)
const data = await response.json()
```

## 主な技術

| 技術 | 用途 |
|-----|------|
| **Next.js 15** | React フレームワーク |
| **TypeScript** | 型安全な開発 |
| **Tailwind CSS** | ユーティリティファーストなスタイリング |
| **App Router** | ファイルベースのルーティング |

## 環境変数

```bash
# .env.local の例
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**NEXT_PUBLIC_** プレフィックス: ブラウザに公開される環境変数

## トラブルシューティング

### モジュールが見つからないエラー

```bash
npm install
npm run dev
```

### ポート 3000 が既に使用されている

```bash
npm run dev -- -p 3001
```

### TypeScript エラー

```bash
npm run type-check
```

## 本番デプロイ

### Vercel へのデプロイ（推奨）

1. [Vercel](https://vercel.com) にサインアップ
2. GitHub リポジトリを接続
3. 環境変数を設定
4. デプロイ

```bash
# または CLI で
npm i -g vercel
vercel
```

### その他のホスティング

```bash
npm run build
# 出力は .next ディレクトリ
```

## 参考資料

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Next.js チュートリアル](https://nextjs.org/learn)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [TypeScript ドキュメント](https://www.typescriptlang.org/docs)

## ライセンス

MIT

## 関連リポジトリ

- [Review Analysis Backend](https://github.com/e10meishoku/review_analysis_back) - FastAPI バックエンド

