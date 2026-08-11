---
order: 1
title: data()
---

# Alpine.data

`Alpine.data(...)`を使うと、アプリケーション内で`x-data`コンテキストを再利用できます。

たとえば、次のような`dropdown`コンポーネントを考えてみましょう。

```html
<div x-data="dropdown">
    <button @click="toggle">...</button>

    <div x-show="open">...</div>
</div>

<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('dropdown', () => ({
            open: false,

            toggle() {
                this.open = ! this.open
            }
        }))
    })
</script>
```

ご覧のとおり、通常は`x-data`の中に直接定義するプロパティとメソッドを、別のAlpineコンポーネントオブジェクトへ取り出しています。

<a name="registering-from-a-bundle"></a>
## バンドルから登録する

Alpineコードにビルドステップを使うことを選択した場合は、次のようにコンポーネントを登録します。

```js
import Alpine from 'alpinejs'
import dropdown from './dropdown.js'

Alpine.data('dropdown', dropdown)

Alpine.start()
```

これは、次の内容の`dropdown.js`ファイルがあることを前提としています。

```js
export default () => ({
    open: false,

    toggle() {
        this.open = ! this.open
    }
})
```

<a name="initial-parameters"></a>
## 初期パラメーター

`Alpine.data`プロバイダーは、名前をそのまま使って（`x-data="dropdown"`のように）参照できるだけでなく、関数として（`x-data="dropdown()"`のように）参照することもできます。関数として直接呼び出すと、初期データオブジェクトの作成時に使う追加パラメーターを渡せます。

```html
<div x-data="dropdown(true)">
```
```js
Alpine.data('dropdown', (initialOpenState = false) => ({
    open: initialOpenState
}))
```

これで、必要に応じて異なるパラメーターを渡しながら`dropdown`オブジェクトを再利用できます。

<a name="init-functions"></a>
## init関数

コンポーネントに`init()`メソッドが含まれている場合、Alpineはコンポーネントを描画する前に自動的に実行します。たとえば次のようにします。

```js
Alpine.data('dropdown', () => ({
    init() {
        // Alpineがコンポーネントの残りを初期化する前に
        // このコードが実行されます。
    }
}))
```

<a name="destroy-functions"></a>
## destroy関数

コンポーネントに`destroy()`メソッドが含まれている場合、Alpineはコンポーネントをクリーンアップする前に自動的に実行します。

主な用途は、Alpineからは利用できない別のライブラリやブラウザーAPIでイベントハンドラーを登録する場合です。次の例では、`destroy()`メソッドを使ってそのようなハンドラーをクリーンアップする方法を示します。

```js
Alpine.data('timer', () => ({
    timer: null,
    counter: 0,
    init() {
      // コンポーネントインスタンスを参照するイベントハンドラーを登録
      this.timer = setInterval(() => {
        console.log('Increased counter to', ++this.counter);
      }, 1000);
    },
    destroy() {
        // ハンドラーを切り離し、メモリと副作用の漏れを防ぐ
        clearInterval(this.timer);
    },
}))
```

コンポーネントが破棄される例として、`x-if`の中でコンポーネントを使う場合があります。

```html
<span x-data="{ enabled: false }">
    <button @click.prevent="enabled = !enabled">Toggle</button>

    <template x-if="enabled">
        <span x-data="timer" x-text="counter"></span>
    </template>
</span>
```

<a name="using-magic-properties"></a>
## magic propertyを使う

コンポーネントオブジェクトからmagic methodやmagic propertyへアクセスしたい場合は、`this`コンテキストを使います。

```js
Alpine.data('dropdown', () => ({
    open: false,

    init() {
        this.$watch('open', () => {...})
    }
}))
```

<a name="encapsulating-directives-with-x-bind"></a>
## `x-bind`でディレクティブをカプセル化する

コンポーネントのデータオブジェクトだけでなく、それ以上のものを再利用したい場合は、`x-bind`を使ってAlpineのテンプレートディレクティブ全体をカプセル化できます。

次の例では、先ほどの`dropdown`コンポーネントのテンプレートの詳細を`x-bind`で取り出しています。

```html
<div x-data="dropdown">
    <button x-bind="trigger"></button>

    <div x-bind="dialogue"></div>
</div>
```

```js
Alpine.data('dropdown', () => ({
    open: false,

    trigger: {
        ['@click']() {
            this.open = ! this.open
        },
    },

    dialogue: {
        ['x-show']() {
            return this.open
        },
    },
}))
```
