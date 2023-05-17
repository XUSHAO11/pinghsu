---
title: Vue开篇
categories: Linux
tags: Linux
icon: note
---
# Vue开篇

Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。

渐进式意思就是由浅入深，由简单到复杂的去使用，既可以快速实现简单的应用功能，又有丰富的插件资源和解决方案，帮我们构建出复杂的中大型前端项目

而我们的学习过程，也是渐进式的，由浅入深的去学习VUE。

## Vue的安装

- 独立版本

直接下载并用 <script> 标签引入，Vue 会被注册为一个全局变量。

重要提示：在开发时请用开发版本，遇到常见错误它会给出友好的警告。

开发环境不要用最小压缩版，不然就失去了错误提示和警告!

- 网络版本

```js
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

```js
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
```

- npm下载

```js
npm i vue
```

## 兼容性

Vue **不支持** IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有[兼容 ECMAScript 5 的浏览器](https://caniuse.com/#feat=es5)。

## 语法格式

>HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法)的名需要使用其等价的 kebab-case (短横线分隔命名) 
>
>```
>Vue.component('myComponentName', { /* ... */ })
>```
>
>那我们在写在页面时标签就要这样写
>
>```
><my-component-name>  </my-component-name>
>```
>
>大写处更换为-连接符

## Vue实例

>注意:一个vue实例不可能去接管多个容器，如果有多个容器的情况，vue事例永远只接管第一个容器
>
>不能多个vue实例同时来接管同一个容器，如果有多个的情况下永远是第一个vue实例来接管该容器
>
>vue实例与容器直接的对应关系是一对一的

```js
new Vue({
el:'.main'   //选择容器
})


new Vue({
}).$mount('.mian')
```

**数据对象**

```js
// 我们的数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})
```

当data里的数据发生改变时，视图(页面dom元素)会进行重新渲染，值得注意的是只有当实例被创建时就已经存在于 `data` 中的 property 才是**响应式**的。也就是说如果你添加一个新的 property，比如：

```js
vm.b = 'hi'
```

那么对 `b` 的改动将不会触发任何视图的更新。如果你知道你会在晚些时候需要一个 property，但是一开始它为空或不存在，那么你仅需要设置一些初始值。比如：空字符串，空数组，0，false，null等

## MVVM模型

Vue的设计从mvvm模型上参考了许多。

M：模型(Model)     data里的数据

V：视图(View)     模板代码

VM：视图模型(ViewModel)    Vue实例

学习Vue的过程中，了解vue的原理和实现理念是非常重要的，模型就是data的数据，视图就是dom也就是页面元素。

视图模型也就是Vue实例，他通过数据绑定来实现视图和模型同步

## 模板语法

### 插值语法

在Vue选中的实例中使用{{}}符号插值，内部可以写简单的运算符和表达式以及变量等，但是不能使用if判断和for循环等

```js
<div id='mian'>
   {{1+1}}//2
   {{message==18?true:false}}//true
   {{message.split('').reverse().join('')}}
</div>
<script>
   new Vue({
   el:'.mian'
   data:{
   message:18
}
})
</script>
```

### 指令语法

v-bind指令用来给元素自定义属性或自带属性赋值，也可以进行组件父子传值(herf属性，src属性等)

通俗的说v-bind语法的使用是为了使用vue实例的数据的，比如当需要动态使用元素的属性时，那么就是需要使用v-bind语法绑定，绑定v-bind后写的代码将会被当成一个表达式来执行

```js
<button v-bind:disabled="true">Button</button>
//给button的disabled属性赋值
<div v-bind:classs='styke'></div>
//给div的classs属性赋值，也就是给div赋类名
```

v-bind的简写就是直接写:

```js
v-bind:class='aa'   和   :class='aa'是等价的
```

## 数据绑定语法

Vue中有2种数据绑定的方式：

1.单向绑定(v-bind)：数据只能从data流向页面。

2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。

>双向绑定一般都应用在表单类元素上（如：input、select等）
>
>v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。

但是我们日常需要用到的数据绑定的地方，一般只有渲染，不会进行双向绑定，防止数据污染，所以使用:value来获取数据单向渲染页面。

**v-model语法通常作用在表单元素内，所以会有修饰符存在**

#### .lazy

默认情况下，`v-model` 会在每次 `input` 事件后更新数据。你可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据

意思就是，双向数据绑定会延迟，只有当输入完成，也就是输入框失去焦点时才会更新数据

```js
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

#### .number

number修饰符可以把用户输入的数据转换为数值型，本质是字符串的`parseFloat()`方法，当无法被转换为数值型时则返回原值

`.number` 修饰符会在输入框有 `type="number"` 时自动启用。

```js
<input v-model.number="age" />
```

#### .trim

如果你想要默认自动去除用户输入内容中两端的空格，你可以在 `v-model` 后添加 `.trim` 修饰符

```js
<input v-model.trim="msg" />
```

## template标签

Vue自定义的标签，不会被渲染，为了不破坏页面布局，搭配v-if使用，不可以搭配v-show使用(因为v-show本质是display得取值问题，而template标签本来就不会被渲染)

组件使用template标签定义

## Vue操作数据Api

Vue提供的操作数据的方法

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

原生的方法不会有双向数据绑定

Vue如果想要替换数据数组那么需要使用改变原数组的方法，不能使用会生成一个新数组的方法

比如数组的filter concat slice等方法

## Vue的API

#### nextTick

Vue底层为了保证效率性，只有当一个回调函数解析完才会重新解析模板渲染页面，当一个函数内多次修改模板时，Vue会等函数执行完，只渲染最终结果

但是Dom元素没渲染到页面上不能做某些操作(比如给input框自动聚焦等)

所以就有了这个函数，是当真实dom渲染完毕执行的函数

```js
this.$nextTick(() => {
    //这里的回调函数注意是在dom节点被更新之后才会运行的
    this.$refs.inputTitle.focus();
})
```