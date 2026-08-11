# 翻訳ルール

このファイルを翻訳方針のSSOTとする。現在は `essentials/installation.md`、`directives/model.md`、`directives/on.md` に必要な範囲を定義する。

## 同期位置と翻訳済み範囲

- `.upstream-version` は `upstream/docs/` に保存した原文スナップショットのupstreamコミットSHAであり、全ページの翻訳完了を示さない。
- 翻訳済み範囲は、`upstream/docs/` と同じ相対パスにある `docs/` のMarkdownファイルで確認する。
- upstream更新時は、保存したSHA間の原文差分を確認し、既存の翻訳済みページへの影響だけを更新対象にする。未翻訳ページは先回りして翻訳しない。

## 基本

- 原文を要約せず、情報量を減らさない。
- 原文にない仕様・説明を追加しない。
- 技術的意味、条件、例外、注意事項を維持する。
- 見出し、段落、リスト、コード例、blockquote、リンク、HTMLアンカーを省略しない。
- コードの実行構造とコードフェンスの内容を壊さない。原文固有の未登録言語名は、コード内容を保持したままVitePressでハイライトできる標準言語へ置き換えることがある。
- 原文のコード例が裸のHTMLとして記述されている場合は、VitePressが実HTMLとして解釈するため、内容を変更せず `html` コードフェンスで囲む。
- 原文のfrontmatterの構造を維持し、`title`などの表示用テキストだけ翻訳する。

## Alpine固有の表記

次の識別子・名前は原則として翻訳しない。

- `x-data`、`x-model`、`x-on`、`@click`などのAlpine構文
- `$refs`、`$dispatch`などのmagic property
- modifier名、JavaScript識別子、HTML要素名、HTML属性名
- API名、npmパッケージ名、URL
- 日本語版に未翻訳ページへの相対リンクを残さず、公式Alpineサイトの対応URLへ向ける。
- `START_VERBATIM` で囲まれた公式サイト用の実行デモはMVPでは再現しない。対応する説明用コード例は保持する。

本文中のユーザー向け表示文字列は、技術的意味を変えない範囲で翻訳する。
