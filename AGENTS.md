# Alpine.js 日本語ドキュメント

## 現在の方針

- upstreamの正本は `alpinejs/alpine` の `main`、原文ルートは `packages/docs/src/en/`。
- upstream原文は `upstream/docs/`、日本語訳は原文と同じ相対パスで `docs/` に置く。
- 同期位置は、翻訳・レビュー・ビルドが完了したupstreamコミットSHAを `.upstream-version` に記録する。
- 翻訳ルールのSSOTは `config/translation-rules.md`、用語のSSOTは `config/glossary.yml`。
- 現在の翻訳対象は `essentials/installation.md` のみ。
- 日本語版はVitePressで静的サイトとして公開する。
- 公式サイトの実行デモはMVPの対象外とする。
