---
order: 3
prefix: $
title: store
---

# $store

[`Alpine.store(...)`](https://alpinejs.dev/globals/alpine-store)で登録したAlpineのグローバルストアへ、`$store`を使って簡単にアクセスできます。たとえば次のようにします。

```html
<button x-data @click="$store.darkMode.toggle()">Toggle Dark Mode</button>

...

<div x-data :class="$store.darkMode.on && 'bg-black'">
    ...
</div>


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

`darkMode`ストアを登録し、`on`を`false`に設定しているため、`<button>`を押すと`on`が`true`になり、ページの背景色が黒に変わります。

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

[→ Alpineストアについて詳しく読む](https://alpinejs.dev/globals/alpine-store)
