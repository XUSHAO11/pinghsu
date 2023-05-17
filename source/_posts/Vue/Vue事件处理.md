---
title: Vue事件处理
categories: Linux
tags: Linux
icon: note
---
# Vue事件处理

v-on监听事件简写为@

```js
<div>
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
  <button @click="greet">Greet</button>
</div>
```

标签内写了处理事件函数名，相应的应该在Vue实例的methods属性里添加一个函数

```js
 methods: {
      greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
```

## 事件传参

当html代码内只写函数名时，是不传参数的，所以事件函数内默认能接受到事件对象event

如果加个括号，代表需要传入参数，那么默认就不会传入事件对象event需要在传值时加入$event来进行传值

```js
<button @click="warn('Hello', $event)">
  Submit
</button>

methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()//取消默认事件发生
    }
    alert(message)
  }
}
```

## 鼠标事件修饰符

- `.stop`   阻止事件冒泡
- `.prevent`   阻止默认行为
- `.capture`   给元素添加一个监听器，当元素发生冒泡时首先触发带有capture的元素
- `.self`   把事件限制在自己身上，只有触发事件源全等于自己时才会触发，事件源在子元素不会触发
- `.once`   限制事件只触发一次
- `.native`   给组件绑定事件时，就算写click也会被默认为是自定义事件，如果加上native修饰符，那么则会被解析为点击事件
- xxxxxxxxxx this.$destroy()vm.$destroy()js

由于有些事件，会先执行事件的回调函数，再执行事件的默认行为，比如说滚动事件，如果事件的回调函数需要的计算量很大，那么则会先进行计算，再执行滚动的动作，这样非常影响使用，而.passive会把滚动的动作和回调函数同时进行，不会有卡顿

```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

事件修饰符可以单独使用，也可以串联使用，当串联使用时顺序十分重要

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

## 按键修饰符

```js
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />
```

### 常用按键别名

Vue 为一些常用的按键提供了别名：

- `.enter`
- `.tab `    特殊(需要配合keydown使用)因为tab按下时默认有切换焦点，绑定keyup事件时焦点已被切换
- `.delete` (捕获“Delete”和“Backspace”两个按键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

以下四个属于系统修饰符，配合keydown时没有问题，当配合keyup使用时需要按下的同时配合按下其他键，随后释放其他键事件才会被触发

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

组合按键使用

```js
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>
```

### 按键码和按键名

按键码后续不推荐使用，按键名可以

注意:上述的常见按键别名修饰符和案件编码不同，如果想要触发一个事件处理函数，

```js
event.keyCode   事件对象的keyCode属性为按键码
event.key       事件对象的key属性为按键名
//当按键名为两个单词时比如CapsLock(切换大小写按键)，修饰符内需要把大写转换为小写，把驼峰式命名的地方改为-连接
比如CapsLock需要改为caps-lock
```

```js
<input v-on:keyup.alt.enter="clear">
//这样写必须按下alt+enter才能同时触发
<input v-on:keyup.alt.13="clear">
//这样写单独摁下alt或者Code值为13的enter键，或者一起按都会触发
```

当要捕捉某个精准的按键，需要打印事件对象获得keyCode按键码(即将被废弃)

比如回车键的按键码是13，那么我们可以这样写

```js
<input @keyup.13="clear" />
```

### 按键修饰符

`.exact`    修饰符允许你控制由精确的系统修饰符组合触发的事件。

```js
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

