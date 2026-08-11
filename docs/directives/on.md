---
order: 5
title: on
---

# x-on

`x-on`を使うと、発生したDOMイベントに対して簡単にコードを実行できます。

クリック時にアラートを表示する、単純なボタンの例を見てみましょう。

```html
<button x-on:click="alert('Hello World!')">Say Hi</button>
```

> `x-on`は小文字のイベント名だけを監視できます。HTML属性では大文字と小文字が区別されないためです。`x-on:CLICK`と記述すると、`click`という名前のイベントを監視します。camelCaseの名前を持つカスタムイベントを監視する必要がある場合は、[`.camel` helper](#camel)を使ってこの制限を回避できます。また、[`x-bind`](/directives/bind#bind-directives)を使ってJavaScriptコード内で要素に`x-on`ディレクティブを付ければ、（大文字と小文字が保持されるため）別の方法で対応できます。

<a name="shorthand-syntax"></a>
## 短縮構文

`x-on:`が冗長すぎると感じる場合は、短縮構文の`@`を使えます。

先ほどと同じコンポーネントを、短縮構文で書くと次のようになります。

```html
<button @click="alert('Hello World!')">Say Hi</button>
```

> 上のスニペットには含まれていませんが、親要素に`x-data`が定義されていない場合、`x-on`は使用できません。[→ `x-data`について詳しく読む](/directives/data)

<a name="the-event-object"></a>
## イベントオブジェクト

式からネイティブのJavaScriptイベントオブジェクトにアクセスしたい場合は、Alpineのmagic propertyである`$event`を使えます。

```html
<button @click="alert($event.target.getAttribute('message'))" message="Hello World">Say Hi</button>
```

また、Alpineは、末尾の括弧を付けずに参照したメソッドにもイベントオブジェクトを渡します。例：

```html
<button @click="handleClick">...</button>

<script>
    function handleClick(e) {
        // Now you can access the event object (e) directly
    }
</script>
```

<a name="keyboard-events"></a>
## キーボードイベント

Alpineでは、特定のキーに対する`keydown`および`keyup`イベントを簡単に監視できます。

入力要素内で`Enter`キーを監視する例を見てみましょう。

```html
<input type="text" @keyup.enter="alert('Submitted!')">
```

これらのキーボードmodifierを連結して、より複雑なリスナーを作ることもできます。

これは、`Shift`キーを押しながら`Enter`キーを押したときに実行され、`Enter`だけを押したときには実行されないリスナーです。

```html
<input type="text" @keyup.shift.enter="alert('Submitted!')">
```

[`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)で公開されている有効なキー名は、kebab-caseに変換すればmodifierとして直接使えます。

```html
<input type="text" @keyup.page-down="alert('Submitted!')">
```

よく監視するキーを、簡単に参照できるよう一覧にします。

| Modifier | キーボードキー |
| --- | --- |
| `.shift` | Shift |
| `.enter` | Enter |
| `.space` | Space |
| `.ctrl` | Ctrl |
| `.cmd` | Cmd |
| `.meta` | MacではCmd、WindowsではWindowsキー |
| `.alt` | Alt |
| `.up` `.down` `.left` `.right` | 上／下／左／右矢印 |
| `.escape` | Escape |
| `.tab` | Tab |
| `.caps-lock` | Caps Lock |
| `.equal` | Equal、`=` |
| `.period` | Period、`.` |
| `.comma` | Comma、`,` |
| `.slash` | Forward Slash、`/` |

<a name="mouse-events"></a>
## マウスイベント

上記のキーボードイベントと同様に、Alpineでは`click`イベントを処理するためのmodifierを使えます。

| Modifier | イベントキー |
| --- | --- |
| `.shift` | shiftKey |
| `.ctrl` | ctrlKey |
| `.cmd` | metaKey |
| `.meta` | metaKey |
| `.alt` | altKey |

これらは`click`、`auxclick`、`context`、`dblclick`イベントだけでなく、`mouseover`、`mousemove`、`mouseenter`、`mouseleave`、`mouseout`、`mouseup`、`mousedown`イベントでも機能します。

`Shift`キーを押しているときに動作が変わるボタンの例を見てみましょう。

```html
<button type="button"
    x-data="{ message: 'select' }"
    @click="message = 'selected'"
    @click.shift="message = 'added to selection'"
    @mousemove.shift="message = 'add to selection'"
    @mouseout="message = 'select'"
    x-text="message"></button>
```

> 通常のクリックイベントに`ctrl`などのmodifierを付けると、多くのブラウザでは自動的に`contextmenu`イベントになります。同様に、右クリックでは`contextmenu`イベントが発生しますが、`contextmenu`イベントが防止された場合は`auxclick`イベントも発生します。

<a name="custom-events"></a>
## カスタムイベント

Alpineのイベントリスナーは、ネイティブのDOMイベントリスナーをラップしたものです。そのため、カスタムイベントを含むあらゆるDOMイベントを監視できます。

カスタムDOMイベントをディスパッチし、それを同時に監視するコンポーネントの例を見てみましょう。

```html
<div x-data @foo="alert('Button Was Clicked!')">
    <button @click="$event.target.dispatchEvent(new CustomEvent('foo', { bubbles: true }))">...</button>
</div>
```

ボタンをクリックすると、`@foo`リスナーが呼び出されます。

`.dispatchEvent` APIは冗長なので、Alpineには簡単に使える`$dispatch` helperがあります。

`$dispatch` magic propertyを使うと、同じコンポーネントを次のように書けます。

```html
<div x-data @foo="alert('Button Was Clicked!')">
    <button @click="$dispatch('foo')">...</button>
</div>
```

[→ `$dispatch`について詳しく読む](/magics/dispatch)

<a name="modifiers"></a>
## Modifier

Alpineには、イベントリスナーの動作をカスタマイズするためのディレクティブmodifierが多数あります。

<a name="prevent"></a>
### .prevent

`.prevent`は、ブラウザのイベントオブジェクトで`.preventDefault()`を呼び出すのと同じです。

```html
<form @submit.prevent="console.log('submitted')" action="/foo">
    <button>Submit</button>
</form>
```

上の例では、`.prevent`を付けるとボタンをクリックしてもフォームは`/foo`エンドポイントへ送信されません。代わりにAlpineのリスナーが処理し、イベントがそれ以上処理されないように「防止」します。

<a name="stop"></a>
### .stop

`.stop`は`.prevent`と同様に、ブラウザのイベントオブジェクトで`.stopPropagation()`を呼び出すのと同じです。

```html
<div @click="console.log('I will not get logged')">
    <button @click.stop>Click Me</button>
</div>
```

上の例でボタンをクリックしても、メッセージはログに出力されません。これはイベントの伝播を直ちに停止し、`@click`リスナーのある`<div>`へバブルアップさせないためです。

<a name="outside"></a>
### .outside

`.outside`は、付加した要素の外側で発生したクリックを監視するための便利なhelperです。簡単なドロップダウンコンポーネントの例を見てみましょう。

```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Toggle</button>

    <div x-show="open" @click.outside="open = false">
        Contents...
    </div>
</div>
```

上の例では、「Toggle」をクリックしてコンテンツを表示した後、コンテンツの外側のページ上のどこかをクリックすると、コンテンツを閉じられます。

これは、`.outside`が登録された要素をクリックしていない場所からのクリックを監視しているためです。

> `.outside`の式は、登録された要素がページ上で表示されている場合にだけ評価される点に注意してください。そうでなければ、「Toggle」ボタンをクリックしたときに、非表示の要素に対する`@click.outside`ハンドラーも発火するという厄介な競合状態が起きます。

<a name="window"></a>
### .window

`.window` modifierを付けると、Alpineは要素自体ではなく、ページのルート`window`オブジェクトにイベントリスナーを登録します。

```html
<div @keyup.escape.window="...">...</div>
```

上のスニペットは、ページ上のどこで押された場合でも「escape」キーを監視します。

このように、マークアップの一部でページ全体のイベントを扱いたい場合、リスナーに`.window`を付けると非常に便利です。

<a name="document"></a>
### .document

`.document`は`.window`と同様に動作しますが、`window`グローバルではなく`document`グローバルにリスナーを登録します。

<a name="once"></a>
### .once

リスナーに`.once`を付けると、ハンドラーが一度だけ呼び出されるようになります。

```html
<button @click.once="console.log('I will only log once')">...</button>
```

<a name="debounce"></a>
### .debounce

イベントハンドラーを「debounce」して、一定時間（デフォルトでは250ミリ秒）操作がない場合にだけ呼び出すと便利なことがあります。

たとえば、入力するたびにネットワークリクエストを発生させる検索フィールドにdebounceを追加すると、キーストロークごとにネットワークへリクエストが送信されるのを防げます。

```html
<input @input.debounce="fetchResults">
```

これで、`fetchResults`はキーストロークごとではなく、250ミリ秒間キーストロークがなかった後にだけ呼び出されます。

debounce時間を長くしたり短くしたりしたい場合は、`.debounce` modifierの後ろに期間を付けます。

```html
<input @input.debounce.500ms="fetchResults">
```

これで、`fetchResults`は500ミリ秒間操作がない場合にだけ呼び出されます。

<a name="throttle"></a>
### .throttle

`.throttle`は`.debounce`に似ていますが、処理を無期限に遅延させるのではなく、250ミリ秒ごとにハンドラー呼び出しを実行します。

イベントが繰り返し長時間発生する場合で、`.debounce`では適切に処理できず、一定間隔でイベントを処理し続けたいときに便利です。

例：

```html
<div @scroll.window.throttle="handleScroll">...</div>
```

上の例はthrottleのよい使用例です。`.throttle`がなければ、ページをスクロールする間に`handleScroll`メソッドが何百回も呼び出され、サイトの動作が大幅に遅くなる可能性があります。`.throttle`を付けることで、`handleScroll`が250ミリ秒ごとにだけ呼び出されるようにしています。

> 補足：この正確な方法は、このドキュメントサイト自体でも右側のサイドバーに現在のセクションを表示するために使われています。

`.debounce`と同様に、throttleするイベントにもカスタム期間を追加できます。

```html
<div @scroll.window.throttle.750ms="handleScroll">...</div>
```

これで、`handleScroll`は750ミリ秒ごとにだけ呼び出されます。

<a name="self"></a>
### .self

イベントリスナーに`.self`を付けると、イベントが子要素からではなく、そのイベントリスナーを宣言した要素自体から発生した場合だけ処理されます。

```html
<button @click.self="handleClick">
    Click Me

    <img src="...">
</button>
```

上の例では、`<button>`の中に`<img>`タグがあります。通常、`<img>`など`<button>`要素内で発生したクリックは、ボタンの`@click`リスナーで拾われます。

しかし、この場合は`.self`を付けているため、ボタン自体をクリックした場合だけ`handleClick`が呼び出されます。`<img>`要素で発生したクリックは処理されません。

<a name="camel"></a>
### .camel

```html
<div @custom-event.camel="handleCustomEvent">
    ...
</div>
```

上の例の`customEvent`のように、camelCaseのイベントを監視したい場合があります。HTML属性内ではcamelCaseがサポートされていないため、Alpineが内部でイベント名をcamelCaseに変換するには`.camel` modifierが必要です。

上の例に`.camel`を付けることで、Alpineは`custom-event`ではなく`customEvent`を監視します。

<a name="dot"></a>
### .dot

```html
<div @custom-event.dot="handleCustomEvent">
    ...
</div>
```

`.camelCase` modifierと同様に、イベント名にドット（`custom.event`など）が含まれるイベントを監視したい場合があります。Alpineではイベント名のドットが予約されているため、イベント名をダッシュで記述し、`.dot` modifierを付ける必要があります。

上のコード例では、`custom-event.dot`がイベント名`custom.event`に対応します。

<a name="passive"></a>
### .passive

ブラウザは、ページ上でJavaScriptが実行されている場合でも、スクロールを高速かつ滑らかに保つための最適化を行います。しかし、touchイベントやwheelイベントのリスナーが適切に実装されていないと、この最適化が妨げられ、サイトのパフォーマンスが低下することがあります。

touchイベントを監視する場合は、スクロールのパフォーマンスを妨げないよう、リスナーに`.passive`を付けることが重要です。

```html
<div @touchstart.passive="...">...</div>
```

[→ passive listenerについて詳しく読む](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners)

<a name="passive-false"></a>
### .passive.false

現在のブラウザでは、touchイベントとwheelイベントのリスナーはデフォルトでpassiveです。`.passive.false`を渡すと、これらのイベントをキャンセル可能にでき、`preventDefault`を呼び出せるようになります。

```html
<div @touchmove.passive.false="$event.preventDefault()">...</div>
```

### .capture

イベントのcaptureフェーズ（イベントの対象からDOMを上へバブルする前）にこのリスナーを実行したい場合は、このmodifierを追加します。

```html
<div @click.capture="console.log('I will log first')">
    <button @click="console.log('I will log second')"></button>
</div>
```

[→ イベントのcaptureとbubbleフェーズについて詳しく読む](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#usecapture)
