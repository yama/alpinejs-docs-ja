---
order: 7
title: html
---

# x-html

`x-html`は、指定した式の結果を要素の`innerHTML`プロパティに設定します。

> ⚠️ 信頼できるコンテンツにのみ使用し、ユーザーが提供したコンテンツには決して使用しないでください。⚠️
> 第三者のHTMLを動的に描画すると、簡単にXSS脆弱性につながります。

`x-html`を使ってユーザー名を表示する基本的な例を見てみましょう。

```html
<div x-data="{ username: '<strong>calebporzio</strong>' }">
    Username: <span x-html="username"></span>
</div>
```

これで`<span>`タグの内部HTMLが`<strong>calebporzio</strong>`に設定されます。
