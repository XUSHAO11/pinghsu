---
title: Vue脚手架
categories: Linux
tags: Linux
icon: note
---
# Vue脚手架

## 脚手架文件结构

>  ├── node_modules 下载的依赖
>
>  ├── public
>
>  │  ├── favicon.ico: 页签图标
>
>  │  └── index.html: 主页面
>
>  ├── src
>
>  │  ├── assets: 存放静态资源
>
>  │  │  └── logo.png
>
>  │  │── components: 存放零散组件
>
>  │  │  └── HelloWorld.vue
>
>  │  │── App.vue: 汇总所有组件
>
>  │  │── main.js: 入口文件
>
>  │  │── views: 存放单页面集合组件
>
>  ├── .gitignore: git版本管制忽略的配置
>
>  ├── babel.config.js: babel的配置文件
>
>  ├── package.json: 应用包配置文件 
>
>  ├── README.md: 应用描述文件
>
>  ├── package-lock.json：包版本控制文件

###  组件化编码流程：

1.拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

2.实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

​    (1).一个组件在用：放在组件自身即可。

​    (2). 一些组件在用：放在他们共同的父组件上（<span *style*="color:red">状态提升</span>）。

3.实现交互：从绑定事件开始。

## 组件化样式

#### scoped

多个组件类名可能有冲突，可以使用scoped让组件的style样式只在这个组件内生效

```js
<style scoped>    </style>
```

#### lang

在脚手架里使用lang属性指定语法，比如scss语法

```
<style lang="scss">    </style>
```

## mixin混入

功能：可以把多个组件共用的配置提取成一个混入对象

使用方式：

第一步定义混合：

```js
  {
    data(){....},
    methods:{....}
  }
```

第二步使用混入：

全局混入：```Vue.mixin(xxx)```     

全局混入需要在main文件内混入

```js
import { mixin, shareData } from "@/mixin";
Vue.mixin(mixin);
Vue.mixin(shareData);
```

局部混入：```mixins:['xxx']  ```

```js
import {  mixin, shareData } from "@/mixin";
mixins:[ mixin, shareData ]
```

>注意：
>
>如果混合中配置了与data(或者配置了相同的methods)相同的属性值，则以你的配置的属性为主(而不以mixin为主)
>
>但对于生命周期钩子是都会保存的(混合的钩子比你配置的钩子先跑)

## 插件

功能：用于增强Vue

本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

定义插件：

```js
对象.install(Vue, options) {
    // 1. 添加全局过滤器
    Vue.filter(....)

    // 2. 添加全局指令
    Vue.directive(....)

    // 3. 配置全局混入(合)
    Vue.mixin(....)

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function () {...}
    Vue.prototype.$myProperty = xxxx
}
```

使用插件：```Vue.use()```

>插件需要引入在mian文件内部，插件封装一个单独的js文件，引入以后使用Vue.use()即可使用插件内封装的东西。
>
>```js
>import plugins from './plugins';//引入插件
>Vue.use(plugins); //vue应用插件
>```



