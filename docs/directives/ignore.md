---
order: 11
title: ignore
---

# x-ignore

デフォルトでは、Alpineは`x-init`または`x-data`を含む要素のDOMツリー全体を走査して初期化します。

何らかの理由でHTMLの特定の部分をAlpineに触れさせたくない場合は、`x-ignore`を使ってそれを防げます。

```html
<div x-data="{ label: 'From Alpine' }">
    <div x-ignore>
        <span x-text="label"></span>
    </div>
</div>
```

上の例では、Alpineに`div`の内容を完全に無視するよう指示したため、`<span>`タグに「From Alpine」は入りません。
