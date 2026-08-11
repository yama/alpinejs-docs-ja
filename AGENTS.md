# Alpine.js 日本語ドキュメント

## 現在の方針

- upstreamの正本は `alpinejs/alpine` の `main`、原文ルートは `packages/docs/src/en/`。
- upstream原文は `upstream/docs/`、日本語訳は原文と同じ相対パスで `docs/` に置く。
- `.upstream-version` は `upstream/docs/` に保存した原文スナップショットのupstreamコミットSHAを記録する。全ページの翻訳完了を示すものではない。
- 翻訳ルールのSSOTは `config/translation-rules.md`、用語のSSOTは `config/glossary.yml`。
- 現在の翻訳済みページは `essentials/installation.md`、`directives/model.md`、`directives/on.md`。
- 日本語版はVitePressで静的サイトとして公開する。
- 公式サイトの実行デモはMVPの対象外とする。

## 翻訳レビュー手順

長いページは、次の手順で翻訳とレビューを進める。

1. 原文の見出し、コード、リスト、blockquote、リンクなどの構造を列挙する。
2. 列挙した構造をもとにレビュー単位を決める。
3. 単位ごとに翻訳し、原文と構造・意味を確認する。
4. 各単位の完了状態を記録する。
5. `expected`、`reviewed`、`unreviewed` を照合する。
6. `unreviewed = 0` を確認して完了とする。
