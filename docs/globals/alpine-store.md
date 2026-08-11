---
order: 2
title: store()
---

# Alpine.store

Alpineは`Alpine.store()` APIを通じて、グローバルな状態管理を提供します。

<a name="registering-a-store"></a>
## ストアを登録する

Alpineストアは、`alpine:init`リスナーの中で定義することも、`Alpine`をビルドへimportする場合は`Alpine.start()`を手動で呼び出す前に定義することもできます。

**scriptタグから:**
```html
<script>
    document.addEventListener('alpine:init', () => {
        Alpine.store('darkMode', {
            on: false,

            toggle() {
                this.on = ! this.on
            }
        })
    })
</script>
```

**バンドルから:**
```js
import Alpine from 'alpinejs'

Alpine.store('darkMode', {
    on: false,

    toggle() {
        this.on = ! this.on
    }
})

Alpine.start()
```

<a name="accessing stores"></a>
## ストアへアクセスする

`$store` magic propertyを使うと、Alpine式の中から任意のストアのデータへアクセスできます。

```html
<div x-data :class="$store.darkMode.on && 'bg-black'">...</div>
```

ストア内のプロパティを変更することもでき、そのプロパティに依存するすべてのものが自動的に反応します。たとえば次のようにします。

```html
<button x-data @click="$store.darkMode.toggle()">Toggle Dark Mode</button>
```

また、2番目のパラメーターを省略すると、`Alpine.store()`を使って外部からストアへアクセスできます。

```html
<script>
    Alpine.store('darkMode').toggle()
</script>
```

<a name="initializing-stores"></a>
## ストアを初期化する

Alpineストアに`init()`メソッドを指定すると、ストアの登録直後に実行されます。これは、ストア内の状態を適切な初期値で初期化する場合に便利です。

```html
<script>
    document.addEventListener('alpine:init', () => {
        Alpine.store('darkMode', {
            init() {
                this.on = window.matchMedia('(prefers-color-scheme: dark)').matches
            },

            on: false,

            toggle() {
                this.on = ! this.on
            }
        })
    })
</script>
```

上の例では、新しく`init()`メソッドを追加しています。これにより、ページ上でAlpineが何かを描画する前に、`on`ストア変数がブラウザーのカラースキーム設定に応じて設定されます。

<a name="single-value-stores"></a>
## 単一値ストア

ストアにオブジェクト全体が必要ない場合は、任意の種類のデータをストアとして設定して使えます。

上の例を、boolean値を使ってより簡単にしたものは次のとおりです。

```html
<button x-data @click="$store.darkMode = ! $store.darkMode">Toggle Dark Mode</button>

...

<div x-data :class="$store.darkMode && 'bg-black'">
    ...
</div>


<script>
    document.addEventListener('alpine:init', () => {
        Alpine.store('darkMode', false)
    })
</script>
```
