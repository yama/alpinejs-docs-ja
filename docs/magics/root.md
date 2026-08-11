---
order: 7
prefix: $
title: root
---

# $root

`$root`は、Alpineコンポーネントのルート要素を取得するために使えるmagic propertyです。言い換えると、DOMツリーを上へたどったときに`x-data`を含む最も近い要素です。

```html
<div x-data data-message="Hello World!">
    <button @click="alert($root.dataset.message)">Say Hi</button>
</div>
```
