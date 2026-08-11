---
order: 5
title: dispatch
---

# $dispatch

`$dispatch`は、ブラウザーイベントをディスパッチするための便利なショートカットです。

```html
<div @notify="alert('Hello World!')">
    <button @click="$dispatch('notify')">
        Notify
    </button>
</div>
```

ディスパッチするイベントと一緒にデータを渡すこともできます。このデータにはイベントの`.detail`プロパティとしてアクセスできます。

```html
<div @notify="alert($event.detail.message)">
    <button @click="$dispatch('notify', { message: 'Hello World!' })">
        Notify
    </button>
</div>
```

内部では、`$dispatch`はより冗長なAPIである`element.dispatchEvent(new CustomEvent(...))`のラッパーです。

**イベントの伝播に関する注意**

[イベントバブリング](https://en.wikipedia.org/wiki/Event_bubbling)があるため、同じ入れ子構造に属するノードからディスパッチされたイベントを捕捉する必要がある場合は、[`.window`](https://github.com/alpinejs/alpine#x-on) modifierを使う必要があります。

**例:**

```html
<!-- 🚫 動作しません -->
<div x-data>
    <span @notify="..."></span>
    <button @click="$dispatch('notify')">Notify</button>
</div>

<!-- ✅ .windowがあるため動作します -->
<div x-data>
    <span @notify.window="..."></span>
    <button @click="$dispatch('notify')">Notify</button>
</div>
```

> 最初の例が動作しないのは、`notify`がディスパッチされると、兄弟要素である`<span>`ではなく共通の祖先である`div`へ伝播するためです。2番目の例が動作するのは、兄弟要素が`window`レベルで`notify`をリッスンしており、カスタムイベントが最終的にそこまでバブリングするためです。

<a name="dispatching-to-components"></a>
## 他のコンポーネントへディスパッチする

先ほどの方法を利用すると、コンポーネント同士を通信させることもできます。

**例:**

```html
<div
    x-data="{ title: 'Hello' }"
    @set-title.window="title = $event.detail"
>
    <h1 x-text="title"></h1>
</div>

<div x-data>
    <button @click="$dispatch('set-title', 'Hello World!')">Click me</button>
</div>
<!-- クリックすると、h1の内容が"Hello World!"に設定されます。 -->
```

<a name="dispatching-to-x-model"></a>
## x-modelへディスパッチする

`$dispatch()`を使って、`x-model`データバインディングのデータ更新をトリガーすることもできます。たとえば次のようにします。

```html
<div x-data="{ title: 'Hello' }">
    <span x-model="title">
        <button @click="$dispatch('input', 'Hello World!')">Click me</button>
        <!-- ボタンを押すと、x-modelがバブリングする"input"イベントを捕捉し、titleを更新します。 -->
    </span>
</div>
```

これにより、`x-model`で値を設定できるカスタムinputコンポーネントを作成できるようになります。

<a name="cancelable-events"></a>
## キャンセル可能なイベント

`$dispatch`の戻り値を使って、イベントがキャンセルされたかどうかを確認できます。アクションのデフォルト動作を防ぎたい場合に便利です。

```html
<div x-data x-on:open="$event.preventDefault()">
    <div x-data="{ open: false }">
        <button @click="if($dispatch('open')){ open = true; }">Click me</button>
        <!-- ボタンを押すとイベントがディスパッチされ、結果がtruthy（どのハンドラーにも防がれていない）の場合だけコンテンツが表示されます。 -->

        <div x-show="open">
            <h1>Hello</h1>
        </div>
    </div>
</div>
```

これは、イベントハンドラーを使ってモーダルなどの開閉を防ぎたい場合に役立ちます。

<a name="overwriting-options"></a>
## オプションを上書きする

`$dispatch`の3番目のパラメーターを使って、イベントのデフォルトオプションを上書きできます。たとえば、`bubbles`を`false`に設定できます。

```html
<!-- 🚫 親要素でイベントをリッスンしているため動作しません -->
<div x-data="{ title: 'Hello' }" x-on:update-title="title = $event.detail">
    <button @click="$dispatch('update-title', 'Hello World!', {bubbles: false})">Click me</button>
</div>

<!-- ✅ 同じ要素でイベントをリッスンしているため動作します -->
<div x-data="{ title: 'Hello' }">
    <button x-on:update-title="title = $event.detail" @click="$dispatch('update-title', 'Hello World!', {bubbles: false})">Click me</button>
</div>
```

これは、イベントが親要素へバブリングするのを防ぎたい場合に便利です。
