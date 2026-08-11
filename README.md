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
- 現在の翻訳済みページ: `start-here.md`, `essentials.md`, `essentials/installation.md`, `essentials/events.md`, `essentials/lifecycle.md`, `essentials/state.md`, `essentials/templating.md`, `directives.md`, `directives/data.md`, `directives/model.md`, `directives/on.md`, `directives/show.md`, `directives/text.md`, `directives/effect.md`, `directives/for.md`, `directives/cloak.md`, `directives/ignore.md`, `directives/id.md`, `directives/ref.md`, `directives/html.md`, `directives/if.md`, `directives/modelable.md`, `directives/init.md`, `directives/teleport.md`, `directives/transition.md`, `directives/bind.md`, `magics.md`, `magics/data.md`, `magics/dispatch.md`, `magics/el.md`, `magics/id.md`, `magics/root.md`, `magics/nextTick.md`, `magics/refs.md`, `magics/store.md`, `magics/watch.md`, `globals.md`, `globals/alpine-data.md`, `globals/alpine-bind.md`, `globals/alpine-store.md`, `plugins.md`, `plugins/anchor.md`, `plugins/collapse.md`, `plugins/intersect.md`, `plugins/mask.md`, `plugins/persist.md`, `plugins/resize.md`, `advanced.md`, `advanced/async.md`, `advanced/csp.md`, `advanced/reactivity.md`
- OSS翻訳の共通ワークフロー候補: `notes/oss-docs-ja-workflow-v0.1.md`

公式サイト固有の実行デモは、現時点では再現しません。

`.upstream-version` は `upstream/docs/` の原文スナップショットの基準を示します。全ページの翻訳完了状態を示すものではありません。翻訳済みページは、`docs/` に対応するファイルが存在するページです。

## 開発

```shell
npm install
npm run docs:dev
npm run docs:build
```
