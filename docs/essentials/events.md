---
order: 4
title: Events
---

# イベント

Alpineを使うと、ブラウザーイベントを簡単にリッスンして反応できます。

<a name="listening-for-simple-events"></a>
## 単純なイベントをリッスンする

`x-on`を使うと、要素上または要素内でディスパッチされたブラウザーイベントをリッスンできます。

ボタンのクリックをリッスンする基本的な例は次のとおりです。

```html
<button x-on:click="console.log('clicked')">...</button>
```

別の方法として、イベントの省略構文`@`も使えます。これ以降は省略構文を使います。

```html
<button @click="...">...</button>
```

`click`に加えて、名前を指定すれば任意のブラウザーイベントをリッスンできます。たとえば、`@mouseenter`、`@keyup`などはすべて有効な構文です。

<a name="listening-for-specific-keys"></a>
## 特定のキーをリッスンする

`<input>`要素内で`enter`キーが押されたことをリッスンしたいとします。次のように`.enter`を追加するだけで簡単に実現できます。

```html
<input @keyup.enter="...">
```

キーのmodifierを組み合わせて、`shift`を押しながら`enter`を押すようなキーの組み合わせもリッスンできます。

```html
<input @keyup.shift.enter="...">
```

<a name="preventing-default"></a>
## デフォルト動作を防止する

ブラウザーイベントに反応する際、イベントの「デフォルト動作を防止」することがよくあります。

たとえば、フォーム送信をリッスンしつつ、ブラウザーによるフォームリクエストの送信を防ぎたい場合は、`.prevent`を使えます。

```html
<form @submit.prevent="...">...</form>
```

`.stop`を適用すれば、`event.stopPropagation()`と同じこともできます。

<a name="accessing-the-event-object"></a>
## イベントオブジェクトにアクセスする

ネイティブのブラウザーイベントオブジェクトへコード内からアクセスしたい場合があります。Alpineは`$event` magic変数を自動的に注入するため、簡単にアクセスできます。

```html
<button @click="$event.target.remove()">Remove Me</button>
```

<a name="dispatching-custom-events"></a>
## カスタムイベントをディスパッチする

ブラウザーイベントをリッスンするだけでなく、ディスパッチすることもできます。これは、他のAlpineコンポーネントとの通信や、Alpineの外部にあるツールでイベントを発生させる場合に非常に便利です。

Alpineはこのために`$dispatch`というmagicヘルパーを公開しています。

```html
<div @foo="console.log('foo was dispatched')">
    <button @click="$dispatch('foo')"></button>
</div>
```

ボタンをクリックすると、Alpineが「foo」というブラウザーイベントをディスパッチし、`<div>`の`@foo`リスナーがそれを受け取って反応します。

<a name="listening-for-events-on-window"></a>
## window上のイベントをリッスンする

ブラウザーにおけるイベントの性質上、トップレベルのwindowオブジェクト上でイベントをリッスンすると便利な場合があります。

次の例のように、コンポーネント間で完全に通信できます。

```html
<div x-data>
    <button @click="$dispatch('foo')"></button>
</div>

<div x-data @foo.window="console.log('foo was dispatched')">...</div>
```

上の例で最初のコンポーネントのボタンをクリックすると、Alpineが「foo」イベントをディスパッチします。ブラウザーのイベントの仕組みにより、イベントは親要素を通って最上位の「window」まで「バブル」します。

2つ目のコンポーネントでは`.window`を使ってwindow上の「foo」をリッスンしているため、ボタンをクリックするとこのリスナーがイベントを受け取り、「foo was dispatched」というメッセージをログに出力します。

[→ `x-on`について詳しく読む](/directives/on)
