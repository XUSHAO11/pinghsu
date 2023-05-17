---
title: Vue生命周期
categories: Linux
tags: Linux
icon: note
---
# Vue生命周期

>1.又名：生命周期回调函数、生命周期函数、生命周期钩子。
>
>2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
>
>3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
>
>4.生命周期函数中的this指向是vm 或 组件实例对象。

![alt](C:\Users\c2021\Desktop\markdown\笔记\Vue\生命周期.png)

```js
 // 生命周期，见名知意，指对生命过程的描述，Vue的生命周期讲述了Vue的实例从创建到销毁
 // 当vue对象在实例化的过程中会对外产生一些生命周期钩子函数，通过这些钩子函数，我们可以在vue实例从创建到销毁的每一个重要节点操作实例属性
        let vm = new Vue({
            data() {
                return {
                    name: '111'
                }
            },
            //所有的属性和方法创建之前的钩子函数(什么也干不了)
            beforeCreate() {
                console.log(111);
            },
            //属性和方法都创建完毕也就是实例已经准备就绪的钩子函数(通常用来发送ajax请求，以便渲染页面)
            created() {
                //因为数据还没有渲染到dom上，所以这时候可以二次改变数据
                this.name = '222'
            },
            //挂载前(渲染前) 完成了数据和方法的初始化还是没有渲染dom，可以做和created相同的工作
            beforeMount() {
                console.log(222);
            },
            //挂载后，dom已经渲染完毕(自定义事件的响应，定时器等异步)最经常用到的钩子函数
            mounted() {
                console.log(333);
            },
            //当挂载完数据更新前的钩子函数(这里的更新是值dom更新，而不是数据更新)
            beforeUpdate() {
                console.log(444);
            },
            //当挂载数据更新后的钩子函数(数据和dom都更新)
            updated() {
                console.log(555);
            },
            //当销毁Vue实例前的钩子函数
            //仍然可以使用data,methods，关闭定时器，取消订阅消息，解绑自定义事件等收尾工作，移除watchers
            beforeDestroy() {
                //记住一旦到了beforeDestroy或者destroyed钩子，即使你拿到数据想要更新它也不会走更新的路了(beforeUpdate,updated)
            },
            //当Vue实例销毁后的钩子函数(几乎不用)
            destroyed() {
                console.log('destroyed');
            }
        }).$mount('.mian')
```

### 隐藏生命周期

#### 虚拟dom修改挂载后调用

```js
this.$nextTick(() => {
这里的回调函数注意是在dom节点被更新之后才会运行的
this.$refs.inputTitle.focus();
})
```

#### 路由组件生命周期

```js
activated(){
   //路由组件被激活时触发。
}

deactivated(){
   //路由组件失活时触发。
}
```



## 生命周期总结

>*常用的生命周期钩子：*
>
>1.created: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
>
>2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。
>
>关于销毁Vue实例
>
>1.销毁后以前操作过，也就是解析过的模板仍然在页面上，只是后续不可以再继续操作
>
>2.销毁后自定义事件会失效，但原生DOM事件依然有效。(click之类的原生事件依然会被调用)
>
>3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

实例对象上的.$destroy()方法销毁实例

```js
this.$destroy()
vm.$destroy()
```