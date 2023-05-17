---
title: Vue组件传值
categories: Linux
tags: Linux
icon: note
---
# Vue组件传值

>传统的模块化依赖关系混乱，不好维护，而且代码毫无复用率，如果模块化写得好那么css和js文件还可以复用，但是html只能复制粘贴，这样非常影响写代码的效率，而且结构混乱，不直观
>
>Vue的组件化完美的解决了这个问题，把每一个组件都独立出来，便于维护，完全不用担心复用问题，且非常直观。
>
>组件就是实现应用中局部功能代码和资源的结合
>
>代码指 js html css等
>
>资源指 img 视频 字体 音频 等
>
>
>
>面试题：组件传值都可以怎么样实现，细说
>
>组件传值：props通信，自定义事件，bus总线，组件自定义属性，本地存储，消息订阅与发布，路由传参，作用域插槽，vuex，依赖注入

## 1.props通信

>1. 功能：让组件接收外部传过来的数据
>2. 传递数据：<Demo name="xxx"/>
>3. 接收数据
>4. 第一种方式（只接收）：props:['name'] 
>5. 第二种方式（限制类型）：props:{name:String}
>
>6. 第三种方式（限制类型、限制必要性、指定默认值）：
>
>```js
>props:{
>   name:{
>   type:String, //类型
>   required:true, //必要性
>   default:'老王' //默认值
>   }
>}
>```
>
>备注：
>
>props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。
>
>type类型检查原理是判断原型，所以可以用这种方法判断原型
>
>```js
>function Person (firstName, lastName) {
>  this.firstName = firstName
>  this.lastName = lastName
>}
>//上面函数为构造函数
>Vue.component('blog-post', {
>  props: {
>    author: Person
>  }
>})
>//author可以通过这种判定方式来判定author对象的原型是否是Person
>```

#### 通信实例

props一般用于父传子通信，但是如果实在想使用props进行子传父通信，那么则需要父组件给子组件传递一个函数，由子组件调用传参，父组件接收(比较麻烦)

>1.使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
>
>2.props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

```js
<div class='.main'>
   <blogpost :post='gg'> </blogpost>
<div>
<script>
      
Vue.component('blogpost', {
  props: ['post'],
  template: '<h3>{{ postTitle }}</h3>'
})

new Vue({
  el:'.mian',
  data(){
    return{
      gg:'111111'
    }
  }
})
</script>
```

## 自定义事件

通过给组件绑定自定义事件，手动触发自定义事件来实现组件之间子传父通信

相当于给组件构造函数Component加了个事件函数

```js
<div class='mian'>
    <vue-button @my-event="fn"></vue-button>
</div>
 Vue.component('vue-button',{
    template:`<button @click='fn1'></button>`,
    methods:{
       fn1(){
          this.$emit('my-event',Hello)//$emit触发事件(第一个参数为事件名，第二个参数为需要传的值)
          //解绑事件
          this.$off('personalEvent'); //这种写法只能解绑一种自定义事件
          this.$off([ 'personalEvent', 'demo' ]);// 解绑多个事件，参数为包含多个事件名的数组
          this.$off(); //比较暴力，有几个自定义事件就全给你解绑了
          this.$destroy(); //销毁当前组件实例，销毁后所有该实例的自定义事件都不奏效了
      }
    }
})
new Vue({
   el:'.mian',
   methods:{
      fn(event){
         console.log(event)//Hello
       }
    }
})
```

通过js来绑定自定义事件

```js
mounted() {
  //可以通过ref拿到组件实例对象
  //当App组件一挂载完毕经过三秒我就在Student组件上绑定事件
  setTimeout(() => {
  this.$refs.student.$on('personalEvent', this.getStudentName); 
  this.$refs.student.$once('personalEvent', this.getStudentName); //注意此时事件只执行一次就不执行了(once),一次性
  },3000)
  //传递函数时要写箭头函数，否则this指向会指向app组件而不是组件本身
  this.$refs.student.$on('personalEvent', (name) => {
     console.log(this);
     this.studentName = name;
  });
```

## 全局事件总线bus(前人总结的方法)

>**形成总线的条件**
>
>1.所有的组件都可以看到且访问到
>
>2.自身需要有$on方法等，只有vue实例才会被vue封装上这些方法(也就是需要是vue的实例)
>
>使用总线的注意事项：
>
>在实例上如果需要使用bus总线，那么则需要在组件的销毁前钩子函数把事件解绑

**形成事件总线的方法有很多**

在单文件组件里直接新new一个Vue实例即可

```js
const bus = new Vue()
```

在项目中(推荐第一种的最优写法)

第一种

```js
//在main.js文件中创建一个组件
const Demo = Vue.extend({}); //demo 为创建的一个component的构造函数
const d = new Demo(); //d为一个组件
//const d = Vue.component('d',{})   简写
Vue.prototype.x = d;
//当Vue的原型上有这个实例对象时，给这个对象绑定的所有时间大家都能拿到，这就是bus总线
```

最优写法

```js
new Vue({
    el:'#app',
    render: h => h(App),
    //创建Vue实例前时给原型对象上绑定this
    beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线
    }
});
```

第二种

```js
//在main.js文件中创建一个组件，通过数据return出去，这个时候根组件的实例上就有了一个Vue的实例
const bus = new Vue();
data() {
    return {
      $bus,
    };
 },
//在组件内使用下面的语句，this.$root寻找到根组件访问根组件的bus(也就是Vue实例)
this.$root.$bus
//当Vue的根组件上有这个实例对象时，给这个对象绑定的所有时间大家都能拿到，这也是bus总线
```

#### bus总线传值实例

```js
let bus = new Vue()
<div class='mian'>
    <vue-button></vue-button>
</div>
 Vue.component('vue-button',{
    template:`<button @click='fn1'></button>`,
    methods:{
       fn1(){
          bus.$emit('eee','Hellow')//$emit触发事件(第一个参数为事件名，第二个参数为需要传的值)
      }
    }
})
new Vue({
   el:'.mian',
   mounted(){
      bus.$on('eee',event=>{
         console.log(event)
     })
   }
})
```

## 组件属性方法

##### $parent

访问当前组件的父组件

首先，通过原理我们可知一个组件只有一个父组件，所以通过$parent方法可以找到父组件，并对里面的值加以操作

```js
methods:{
 fn1(){ 
   this.$parent
  }
}
```

##### $children

访问当前组件的子组件(以类数组的形似)

```js
methods:{
 fn1(){ 
   this.$children
  }
}
```

##### $root

直接访问根组件

```js
methods:{
 fn1(){ 
   this.$root
  }
}
```

##### $ref

ref属性和其他属性有所不同，先要绑定一个ref标签，才能使用refs获取

```js
<div ref='nnnn'></div>
<button ref='kkk'></button>

methods:{
 fn1(){ 
   this.$refs //此时获取到的是所有装载ref属性的标签
   this.$refs.kkk //此时获取到的是所有装载ref属性的标签名为kkk的标签
  }
}
```

## 消息订阅与发布

使用步骤：

   1. 安装pubsub：    ```npm i pubsub-js```

   2. 引入:      ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ......
      beforeDestroy() {
          pubsub.unsubscribe(this.pid); //取消订阅
      }
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```

      ```js
      pubsub.publish('hello', this.name);
      ```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去取消订阅。
