---
order: 6
prefix: $
title: nextTick
---

# $nextTick

`$nextTick`は、AlpineがリアクティブなDOM更新を行った**後**に、指定した式だけを実行できるmagic propertyです。これは、行ったデータ更新がDOMの状態へ反映された**後**にDOMを操作したい場合に便利です。

```html
<div x-data="{ title: 'Hello' }">
    <button
        @click="
            title = 'Hello World!';
            $nextTick(() => { console.log($el.innerText) });
        "
        x-text="title"
    ></button>
</div>
```

上の例では、`$nextTick`を使ってAlpineがDOMの更新を終えるまで待つため、コンソールには`"Hello"`ではなく`"Hello World!"`が出力されます。

<a name="promises"></a>

## Promise

`$nextTick`はPromiseを返すため、`$nextTick`を使って保留中のDOM更新後まで非同期関数を一時停止できます。このように使う場合、`$nextTick`へ引数を渡す必要もありません。

```html
<div x-data="{ title: 'Hello' }">
    <button
        @click="
            title = 'Hello World!';
            await $nextTick();
            console.log($el.innerText);
        "
        x-text="title"
    ></button>
</div>
```
