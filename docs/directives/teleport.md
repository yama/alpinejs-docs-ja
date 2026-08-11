---
order: 12
title: teleport
description: AlpineのテンプレートをDOMの別の場所へ移動する
graph_image: https://alpinejs.dev/social_teleport.jpg
---

# x-teleport

`x-teleport`ディレクティブを使うと、Alpineのテンプレートの一部をページ上のDOMの別の場所へ完全に移動できます。

これはモーダル（特にネストしたモーダル）のようなものに便利です。現在のAlpineコンポーネントのz-indexの範囲から抜け出せるためです。

<a name="x-teleport"></a>
## x-teleport

`<template>`要素に`x-teleport`を付けると、その要素を指定したセレクターへ「追加」するようAlpineに指示できます。

> `x-teleport`のセレクターには、`document.querySelector`のようなものに通常渡す任意の文字列を指定できます。タグ名（`body`）、クラス名（`.my-class`）、ID（`#my-id`）、その他の有効なCSSセレクターなど、最初に一致する要素が見つかります。

[→ `document.querySelector`について詳しく読む](https://developer.mozilla.org/ja/docs/Web/API/Document/querySelector)

少し作為的なモーダルの例を見てみましょう。

```html
<body>
    <div x-data="{ open: false }">
        <button @click="open = ! open">Toggle Modal</button>

        <template x-teleport="body">
            <div x-show="open">
                Modal contents...
            </div>
        </template>
    </div>

    <div>Some other content placed AFTER the modal markup.</div>

    ...

</body>
```

モーダルを切り替えると、実際のモーダルの内容が「Some other content...」要素の**後**に表示されることに注目してください。Alpineの初期化時に`x-teleport="body"`を見つけ、指定された要素セレクターへその要素を追加して初期化するためです。

<a name="forwarding-events"></a>
## イベントを転送する

Alpineは、teleportの体験をできる限りシームレスにしようとします。テンプレートで通常行うことは、`x-teleport`テンプレート内でも行えるはずです。teleportされたコンテンツからは、コンポーネントの通常のAlpineスコープや、`$refs`、`$root`などの機能にもアクセスできます。

ただし、ネイティブのDOMイベントにはteleportという概念がありません。たとえばteleportされた要素の内部から`click`イベントを発生させると、そのイベントは通常どおりDOMツリーを上へバブルします。

この体験をさらにシームレスにするため、`<template x-teleport...>`要素自体にイベントリスナーを登録するだけで、イベントを「転送」できます。

```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Toggle Modal</button>

    <template x-teleport="body" @click="open = false">
        <div x-show="open">
            Modal contents...
            (click to close)
        </div>
    </template>
</div>
```

これで、`<template>`要素の外側からteleportされた要素の内部で発生したイベントをリッスンできるようになったことに注目してください。

Alpineは`<template x-teleport...>`に登録されたイベントリスナーを探し、liveなteleport後のDOM要素を越えてイベントが伝播するのを止めます。その後、そのイベントのコピーを作成し、`<template x-teleport...>`から再度ディスパッチします。

<a name="nesting"></a>
## ネスト

あるモーダルを別のモーダルの中にネストしたい場合、teleportは特に便利です。Alpineなら簡単に実現できます。

```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Toggle Modal</button>

    <template x-teleport="body">
        <div x-show="open">
            Modal contents...

            <div x-data="{ open: false }">
                <button @click="open = ! open">Toggle Nested Modal</button>

                <template x-teleport="body">
                    <div x-show="open">
                        Nested modal contents...
                    </div>
                </template>
            </div>
        </div>
    </template>
</div>
```

両方のモーダルを「オン」に切り替えた後、それらは子要素として記述されていますが、ページ上では互いの内部ではなく兄弟要素として描画されます。
