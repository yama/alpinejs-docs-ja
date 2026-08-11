# Alpine.js 日本語ドキュメント

Alpine.js公式ドキュメントの非公式日本語版です。

## 現在の構成

- upstream: `alpinejs/alpine` の `main`
- 原文: `upstream/docs/`
- 日本語訳: `docs/`
- 原文スナップショットのupstream SHA: `.upstream-version`
- 翻訳ルール: `config/translation-rules.md`
- 用語集: `config/glossary.yml`
- 公開基盤: VitePress
- 現在の翻訳済みページ: `essentials/installation.md`, `directives/model.md`, `directives/on.md`

公式サイト固有の実行デモは、現時点では再現しません。

`.upstream-version` は `upstream/docs/` の原文スナップショットの基準を示します。全ページの翻訳完了状態を示すものではありません。翻訳済みページは、`docs/` に対応するファイルが存在するページです。

## 開発

```shell
npm install
npm run docs:dev
npm run docs:build
```
