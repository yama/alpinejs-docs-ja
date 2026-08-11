---
order: 2
title: init
---

# x-init

`x-init`ディレクティブを使うと、Alpineの任意の要素の初期化フェーズにフックできます。

```html
<div x-init="console.log('I\'m being initialized!')"></div>
```

上の例では、DOMの更新がさらに行われる前に「I'm being initialized!」がコンソールへ出力されます。

次に、`x-init`を使ってJSONを取得し、コンポーネントの処理前に`x-data`へ保存する例を見てみましょう。

```html
<div
    x-data="{ posts: [] }"
    x-init="posts = await (await fetch('/posts')).json()"
>...</div>
```

<a name="next-tick"></a>
## $nextTick

Alpineが描画を完全に終えた後まで待ってからコードを実行したい場合があります。

これは、Reactにおける`useEffect(..., [])`や、Vueにおける`mount`のようなものです。

Alpine内部の`$nextTick` magicを使うと、これを実現できます。

```html
<div x-init="$nextTick(() => { ... })"></div>
```

<a name="standalone-x-init"></a>
## 単独の`x-init`

`x-data` HTMLブロックの内外にある任意の要素へ`x-init`を追加できます。たとえば、次のようにします。

```html
<div x-data>
    <span x-init="console.log('I can initialize')"></span>
</div>

<span x-init="console.log('I can initialize too')"></span>
```

<a name="auto-evaluate-init-method"></a>
## init()メソッドの自動評価

コンポーネントの`x-data`オブジェクトに`init()`メソッドが含まれている場合、そのメソッドは自動的に呼び出されます。たとえば、次のようにします。

```html
<div x-data="{
    init() {
        console.log('I am called automatically')
    }
}">
    ...
</div>
```

`Alpine.data()`構文で登録したコンポーネントも同様です。

```js
Alpine.data('dropdown', () => ({
    init() {
        console.log('I will get evaluated when initializing each "dropdown" component.')
    },
}))
```

`init()`メソッドを含む`x-data`オブジェクトと`x-init`ディレクティブの両方がある場合、`x-data`のメソッドがディレクティブより先に呼び出されます。

```html
<div
    x-data="{
        init() {
            console.log('I am called first')
        }
    }"
    x-init="console.log('I am called second')"
    >
    ...
</div>
```
