---
order: 8
prefix: $
title: data
---

# $data

`$data`は、現在のAlpineデータスコープ（通常は`x-data`によって提供される）へアクセスできるmagic propertyです。

ほとんどの場合、式の中でAlpineデータへ直接アクセスできます。たとえば`x-data="{ message: 'Hello Caleb!' }"`とすると、`x-text="message"`のように使えます。

しかし、すべてのスコープをカプセル化した実際のオブジェクトを、他の関数へ渡すために使えると便利な場合があります。

```html
<div x-data="{ greeting: 'Hello' }">
    <div x-data="{ name: 'Caleb' }">
        <button @click="sayHello($data)">Say Hello</button>
    </div>
</div>

<script>
    function sayHello({ greeting, name }) {
        alert(greeting + ' ' + name + '!')
    }
</script>
```

ボタンを押すと、`@click="..."`を呼び出した式のAlpineスコープをすべて含むデータオブジェクトが渡されるため、ブラウザーに`Hello Caleb!`と表示されます。

ほとんどのアプリケーションではこのmagic propertyは必要ありませんが、より深く複雑なAlpineユーティリティでは非常に役立ちます。
