---
order: 1
prefix: $
title: el
---

# $el

`$el`は、現在のDOMノードを取得するために使えるmagic propertyです。

```html
<button @click="$el.innerHTML = 'Hello World!'">Replace me with "Hello World!"</button>
```
