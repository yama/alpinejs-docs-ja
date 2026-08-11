# Alpine.js 日本語ドキュメント

## 現在の方針

- upstreamの正本は `alpinejs/alpine` の `main`、原文ルートは `packages/docs/src/en/`。
- upstream原文は `upstream/docs/`、日本語訳は原文と同じ相対パスで `docs/` に置く。
- `.upstream-version` は `upstream/docs/` に保存した原文スナップショットのupstreamコミットSHAを記録する。全ページの翻訳完了を示すものではない。
- 翻訳ルールのSSOTは `config/translation-rules.md`、用語のSSOTは `config/glossary.yml`。
- 現在の翻訳済みページは `essentials/installation.md` と `directives/model.md`。
- 日本語版はVitePressで静的サイトとして公開する。
- 公式サイトの実行デモはMVPの対象外とする。
