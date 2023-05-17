---
title: Vuex状态管理
categories: Linux
tags: Linux
icon: note
---
# Vuex状态管理

在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

## 搭建Vuex环境

创建文件：```src/store/index.js```

```js
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

export default new Vuex.Store({
  //命名空间
  //状态集合，保存具体数据
  state: {},
  //状态的计算属性(加工state的数据)
  getters: {},
  //修改数据的回调函数集
  mutations: {
    //第一个参数为state状态集合，第二个参数为传入的数据
    JIA(state, value) {
      state.sum += value;
    },
  },
  //修改数据之前的业务逻辑
  actions: {
  //第一个参数为当前环境上下文(类this)，第二个参数传入的数据
     //判断业务逻辑
    jiadd(context, value) {
      if (context.state.sum % 2) {
        context.commit("JIA", value);
      }
    },
     //延迟业务逻辑
    injia(context, value) {
      setTimeout(() => {
        context.commit("JIA", value);
      }, 1000);
    },
  },
  //模块化状态(独立命名空间，切分作用域)
  modules: {},
});
```

在```main.js```中创建vm时传入```store```配置项

```js
//引入store
import store from './store'

//创建根组件
new Vue({
	el:'#app',
	render: h => h(App),
	store
})
```

## 使用API

- 读取状态数据 

$store.state    --组件模板内不用使用this

```js
$store.state.sum
//读取名为sum的状态数据
```

- 调用  mutations  修改状态数据

$store.commit('需要调用的方法名字','传递的参数')

```js
$store.commit('add','11')
//直接调用mutations的add回调函数并传入字符串11参数
```

- 调用  actions  写入业务逻辑加工

$store.dispatch('需要调用的方法名字','传递的参数')

```js
$store.dispatch('rem','22')
//直接调用action的rem回调函数并传入字符串22参数
//dispatch一般不做修改数据的任务，书写业务逻辑再继续调用commit来修改数据
```

>  备注：若没有络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

### getters的使用

当state中的数据需要经过加工后再使用时，可以使用getters加工。

在```store.js```中追加```getters```配置

```js

const getters = {
    bigSum(state){
        return state.sum * 10
    }
}

//创建并暴露store
export default new Vuex.Store({
    getters
})
```

组件中读取数据：```$store.getters.bigSum```

## 组件内使用简化状态API

#### mapState方法：

用于帮助我们映射```state```中的数据为计算属性

```js
computed: {
    //借助mapState生成计算属性：sum、school、subject（对象写法）
    //(可以把状态解构为其他名字使用)
     ...mapState({sum:'sum',school:'school',subject:'subject'}),
         
    //借助mapState生成计算属性：sum、school、subject（数组写法）
    ...mapState(['sum','school','subject']),
},
```

####mapGetters方法：

用于帮助我们映射```getters```中的数据为计算属性

```js
computed: {
    //借助mapGetters生成计算属性：bigSum（对象写法）
    ...mapGetters({bigSum:'bigSum'}),

    //借助mapGetters生成计算属性：bigSum（数组写法）
    ...mapGetters(['bigSum'])
},
```

#### mapMutations方法：

用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

>备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

```js
//如果使用要在函数写入时就传递参数
<button @click="increment(n)">+</button>

methods:{
    //靠mapActions生成：increment、decrement（对象形式）
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),
    
    //靠mapMutations生成：JIA、JIAN（数组形式）
    //数组写法需要组件函数名和配置文件函数名一样
    ...mapMutations(['JIA','JIAN']),
}
```

## 模块化和命名空间

模块化可以使分工更明确，代码更好维护

修改```store.js```配置文件

如果不开启命名空间，模块化也可以使用，但是作用域不会被切分，跟普通写没区别

```js
const countAbout = {
  namespaced:true,//开启命名空间
  state:{x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){
       return state.sum * 10
    }
  }
}

const personAbout = {
  namespaced:true,//开启命名空间
  state:{ ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```

### 开启命名空间后如何使用vuex

- 开启命名空间后，组件中读取state数据：

```js
//方式一：自己直接读取
this.$store.state.personAbout.sum
//方式二：借助mapState读取：
//第一个参数为独立的模块名，第二个参数为需要结构的数据(可以是数组,对象等写法)
...mapState('countAbout',['sum']),
```

- 开启命名空间后，组件中读取getters数据：

```js
//方式一：自己直接读取
//personAbout为模块名
this.$store.getters['personAbout/bigSum']
//方式二：借助mapGetters读取：
//第一个参数为独立的模块名，第二个参数为需要结构的数据(可以是数组,对象等写法)
...mapGetters('countAbout',['bigSum'])
```

- 开启命名空间后，组件中调用dispatch

```js
//方式一：自己直接dispatch
//personAbout为模块名，add为回调函数
//person为传递的数据
this.$store.dispatch('personAbout/add',person)
//方式二：借助mapActions：
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
//方式三：数组写法(需要组件的函数名和配置对象的函数明相同时使用)
...mapActions('countAbout',['incrementWait', 'incrementIfOdd'])
```

- 开启命名空间后，组件中调用commit

```js
//方式一：自己直接commit
//personAbout为模块名，add为回调函数
//person为传递的数据
this.$store.commit('personAbout/add',person)
//方式二：借助mapMutations：
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
//方式三：数组写法(需要组件的函数名和配置对象的函数明相同时使用)
...mapActions('countAbout',['incrementWait', 'incrementIfOdd'])
```