---
order: 3
title: bind()
---

# Alpine.bind

`Alpine.bind(...)`を使うと、アプリケーション内で[`x-bind`](/directives/bind#bind-directives)オブジェクトを再利用できます。

簡単な例を見てみましょう。Alpineで属性を手動でバインドする代わりに、次のようにします。

```html
<button type="button" @click="doSomething()" :disabled="shouldDisable"></button>
```

これらの属性を再利用可能なオブジェクトにまとめ、それをバインドするために`x-bind`を使えます。

```html
<button x-bind="SomeButton"></button>

<script>
    document.addEventListener('alpine:init', () => {
        Alpine.bind('SomeButton', () => ({
            type: 'button',

            '@click'() {
                this.doSomething()
            },

            ':disabled'() {
                return this.shouldDisable
            },
        }))
    })
</script>
```
