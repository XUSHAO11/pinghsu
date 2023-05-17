---
title: promiss
categories: Other
tags: Other
icon: note
---
# promiss

## 同步与异步

异步模式，可以一起执行**多个任务**，
最常见的异步模式就数定时器了，我们来看看以下的例子。

**异步任务会在当前脚本的所有同步任务执行完才会执行**。

### js同步异常捕获

```js
 try{
 	// 代码测试
 }catch{
	 // 异常捕获 
 }finally{
 	// finally 使用较少
 	// 无论代码是否出错，此处的代码始终执行 
 }
```

#### 手动抛出异常

throw 关键字可以手动抛出一个异常

### nodejs中的异步api

fs.readFile('a.text',(err,data)=>{})

var server=http.creatServer((req,res)=>{})

## Promise简介

说完了以上基本概念，我们就可以继续学习`Promise`了。
上面提到，`Promise`对象是用于异步操作的。目的是解决js中异步编程中回调地狱的问题

我们先看一个需求：

你向对象求婚，首先女孩要考虑一秒钟再答复你，同意后，女孩的父亲再考虑一秒钟答复你，父亲如果同意，女孩的母亲也要同意，母亲同意后，哥哥也要同意，哥哥同意后，姐姐也要同意。姐姐同意后，家里的小黄也要同意。

回调地狱：在异步js里，回调函数写的太多了，回调套回调，这就形成了回调地狱。

```js
//------依次读取文件a,b,c文件      回调地狱

const fs=require('fs');

fs.readFile('a.text','utf8',(err,data)=>{
  
	console.log('a文件读取完毕后读取b文件')
  
	fs.readFile('b.text','utf8',(err,data)=>{
    
		console.log('b文件读取完毕后读取c文件')
    
		fs.readFile('a.text','utf8',(err,data)=>{
      
			console.log('c文件读取完毕，a，b，c文件全都读取完毕')
      
		})
	})
})
```

promise出现的目的是解决node.js异步编程中回调地狱的问题，可以将异步api的执行和结果处理进行分离

#### Promise()的执行机制

Promise本身是一个构造函数，用来生成Promise实例对象

`Promise`实例对象代表一个未完成、但预计将来会完成的操作。

Promise构造函数接收一份函数作为参数，该参数函数有两个参数，分别是resolve和reject；他们是两个函数，由js引擎提供的，不用自己实现

- Promise实例具有三种状态：

  - `pending`：初始值，异步操作未完成，不是fulfilled，也不是rejected

  - `fulfilled`：代表操作成功

  - `rejected`：代表操作失败


这三种状态的变化途径只有两种，即 从‘未完成’到‘成功’   或者 从‘未完成’到‘失败’

一但状态发生变化，就凝固了，不会再有新的状态变化了，Promise实例的状态变化只能发生一次。这就是Promise名字的由来‘承诺’；

- Promise构造函数接收一份函数作为参数，该参数函数有两个参数，分别是resolve和reject；他们是两个函数，由js引擎提供的，不用自己实现

resolve函数的作用是：将Promise实例对象的状态从‘未完成’变成‘成功’（即从pending变成resoved），在异步操作成功时调用，并将异步操作的结果作为参数传递出去

reject 函数的作用是：将Promise实例的状态从‘未完成’变成‘失败’（即从pending变成rejeced），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

```js
var promise=new Promise((resolve,reject)=>{
    if(true){
        resolve(value);
    }else{
        reject(error)
    }
});
```

- Promise实例的then方法

作用：用来为Promise实例添加状态改变时的回调函数，即Promise实例生成以后，可以使用then方法分别指定resolved状态和rejected状态的回调函数

>then方法可以接收两个回调函数作为参数：
>
>第一个参数回调函数 是 Promise对象的状态变为resolved时调用
>
>第二个参数回调函数 是 Promise对象的状态变为rejected时调用

这两个函数都是可选择的，不一定要提供，他们都会接受Promise对象传出的值作为参数

```js
promise.then((value)=>{
  
  //成功时的回调
  //参数为resolve()传来的参数
  
},(err)=>{
  
  //失败时的回调
  //参数为r()传来reject的参数
  
})
```

```js
 function fn(ms){
   return new Promise((resolve,reject)=>{
         // setTimeout((value)=>{
         //   resolve(value)
         // },1000,88)
         setTimeout(resolve,ms,88)
     })
  }
  fn(1000).then((res)=>{
     console.log(res)
  })

//----fn方法返回一个Promise实例，表示一段时间以后才会发生的结果，过了指定时间（ms）以后，Promise实例的状态变为resolved，就会触发then方法绑定的回调函数
```

- Promise的then方法返回一个新的Promise实例，因此可以采用链式写法,即在then方法的后面再调用另一个then方法

  采用链式的then，可以指定一组按照次序调用的回调函数。这时前一个回调函数有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待Promise对象的状态发生变化，才会被调用

- Promise实例的catch方法是.then(null, rejection)或.then(undefined,rejection)的别名，用于指定发生错误时的回调函数

  Promise对象的错误具有‘冒泡’性质，会一直向后传递，直到被捕获为止，也就是说错误总是会被下一个catch语句捕获

  建议：捕获错误使用catch()方法，而不使用then()方法的第二个参数

  建议：Promise对象后面要跟catch()方法。这样可以处理Promise内部发生的错误，catch()方法返回的还是一个Promise对象，因此后面还可以接着调用then方法或者catch方法

  如果没有捕获Promise的错误，Promise内部的错误不会影响到Promise外部的代码，浏览器会报错但是不会退出进程终止脚本执行，通俗的说法就是’Promise会吃掉错误‘ 

```js
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (true) {
            resolve({name: '张三'})
        }else {
            reject('失败了')   //reject()方法的作用，等同于抛出错误
          	throw new Error('test');//Promise的状态已经变成了resolved,再抛出错误是无效的
          							//因为promise的状态一旦改变，就永久保持该状态，不会再变了
        } 
    }, 2000);
});
promise.then(result =>{
  console.log('!!!!!1111',result)
  return '勇敢牛牛不怕困难'
} ).then(res => {
  console.log('!!!!222',res)
}).catch((err)=>{
  console.log('err',err)   //--上面代码一共有三个Promise对象，一个有new Promeise产生，两个由
})						   //then()产生，他们之中任何一个抛出的错误，都会被最后一个catch()捕获

//-----
!!!!!1111 {name: "张三"}
!!!!222 勇敢牛牛不怕困难

// 上面代码使用then方法依次指定了两个回调函数，第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数

如果Promise()执行成功，则会调用执行 resolve()； resolve()中的参数就是执行成功的结果，通过then() 进行接受， then() 参数是一个函数，函数的参数就是 resolve传递传递出来的数据

如果Promise()执行失败， 则会调用执行 reject(); reject()中的参数就是执行失败的错误信息， 通过 catch()进行接受， catch的参数一个函数。 函数的参数 err 就是reject 传递出来的错误信息
```

```js
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (true) {
            resolve({name: '张三'})
        }else {
            reject('失败了') 
        } 
    }, 2000);
});

promise.then(result =>{
  console.log('!!!!!1111',result)
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
        if (true) {
            resolve({name: '莉丝'})
        }else {
            reject('失败了222') 
        } 
    }, 1000);
  })
} ).then(res => {
  console.log('!!!!222',res)
}).catch((err)=>{
  console.log('err',err)
})


//!!!!!1111 {name: "张三"}
//!!!!222 {name: "莉丝"}

// 第一个then方法指定的回调函数，返回的是一个Promise对象，这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化
```

案例：图片加载 

下面是使用 Promise 完成图片的加载。

```js
var preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

上面代码中，`image`是一个图片对象的实例。它有两个事件监听属性，`onload`属性在图片加载成功后调用，`onerror`属性在加载失败调用。

上面的`preloadImage()`函数用法如下。

```js
preloadImage('https://example.com/my.jpg')
  .then(function (e) { document.body.append(e.target) })
  .then(function () { console.log('加载成功') })
```

上面代码中，图片加载成功以后，`onload`属性会返回一个事件对象，因此第一个`then()`方法的回调函数，会接收到这个事件对象。该对象的`target`属性就是图片加载后生成的 DOM 节点。



小结：Promise的优点在于，让回调函数变成了规范的链式写法，程序流程可以看的很清楚，它有一整套的接口，可以实现许多强大的功能,比如同时执行多个异步操作，等他们的状态都改变以后，在执行一个回调函数，或者为多个回调函数中抛出的错误，统一指定处理函数等

而且，Promise的状态一旦改变，无论何时查询，都能得到这个状态，这意味着，无论何时为Promise实例添加回调函数，这函数都能正确执行，所以不用担心是否错过了某个时间或者信号，如果传统的写法，通过监听事件来执行回调函数，一旦错过了事件，再添加回调函数是不会执行的



### 微任务

Promise的回调函数属于异步任务，会在同步任务之后执行

```js
  new Promise(function (resolve, reject) {
        console.log(3)
        resolve(1);
  }).then(console.log);

console.log(2);
//3
// 2
// 1
```

Promise新建立后就会立即执行，所以首先输出的是3，然后会先输出2，再输出1。因为`console.log(2)`是同步任务，而`then`的回调函数属于异步任务，一定晚于同步任务执行。

但是，Promise的回调函数不是正常的异步任务，而是微任务，他们的区别在于，正常的异步任务追加到下一轮的循环，微任务追加到本轮的事件循环，这就意味着，微任务的执行时间一定早于正常的异步任务

```js
setTimeout(function() {
  console.log(1);
}, 0);

new Promise(function (resolve, reject) {
  console.log(4)
  resolve(2);
}).then(console.log);

console.log(3);
// 4 3 2 1
```



案例：在node.js中依次读取三个文件

```js
//------ 使用promise解决回调地狱
//f1 f2 f3 分别为读取三个文件的函数，返回promise对象
const fs=require('fs'); //引入内置文件模块
const promise=new Promise((resolve,reject)=>{
    fs.readFile('./文件.text','utf8',(err,data)=>{
        if(err) reject(err);
        resolve(data)
    })
})

promise.then(res=>{
    console.log('文件1读取成功---',res)
    return  new Promise((resolve,reject)=>{
        fs.readFile('./加油2.text','utf8',(err,data)=>{
            if(err) reject(err);
            
            resolve(data)
        })
    })
}).then(res=>{
    console.log('文件222读取成功----',res)
    return  new Promise((resolve,reject)=>{
        fs.readFile('./文件3.text','utf8',(err,data)=>{
            if(err) reject(err);
            
            resolve(data)
        })
    })
}).then(res=>{
    console.log('文件333读取成功----',res)
}).catch(err=>{
    console.log('出错了')
})

//文件1读取成功--- 你好啊布布妈妈，你要加油哦～我是文件1
//文件222读取成功---- 22这是同步创建的文件，不需要回调函数---文件2
//文件333读取成功---- 中国加油，希望布布平安健康～～～～文件3

```

```js
//----- 使用promise解决回调地狱，代码优化
//f1 f2 f3 分别为读取三个文件的函数，返回promise对象
const fs=require('fs');
function f1(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./文件.text','utf8',(err,data)=>{
            if(err) reject(err);
            
            resolve(data)
        })
    })
}
function f2(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./加油2.text','utf8',(err,data)=>{
            if(err) reject(err);
            resolve(data)
        })
    })
}
function f3(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./文件3.text','utf8',(err,data)=>{
            if(err) reject(err);
            
            resolve(data)
        })
    })
}


f1().then(res=>{
    console.log('文件1读取成功---',res)
   return f2()
}).then(res=>{
    console.log('文件222读取成功----',res)
   return f3()
}).then(res=>{
    console.log('文件333读取成功----',res)
}).catch(err=>{
    console.log('出错了')
})

//文件1读取成功--- 你好啊布布妈妈，你要加油哦～我是文件1
//文件222读取成功---- 22这是同步创建的文件，不需要回调函数---文件2
//文件333读取成功---- 中国加油，希望布布平安健康～～～～文件3
```



- ## Promise.prototype.finally()

`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
//上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。
```

`finally`方法里面的操作,与状态无关的，不依赖于 Promise 的执行结果

- ## Promise.all()

  `Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例

  ```javascript
  const p = Promise.all([p1, p2, p3]);
  ```

  上面代码中，`Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`要都是 Promise 实例

  `p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

  （1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

  （2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

```js
//读取文件1
function fn1() {
    return new Promise((resolve,reject)=>{
        fs.readFile('./demo1.txt','utf8',(err,data)=>{
             if(err){
                 //将promise实例对象的状态从‘未完成’变为‘失败'
                 reject('文件1111读取错误9-16')
              
             }
             //将promise实例对象的状态从‘未完成’变为‘成功'
             setTimeout(resolve,5000,data)
            //  resolve(data)
        })
     })
    
}
//读取文件2的函数
function fn2(){
  return  new Promise((resolve,reject)=>{
        fs.readFile('./demo.txt','utf8',(err,data)=>{
            if(err){ reject('读取文件2发生错误')};
            //读取成功
            resolve(data)
          
        })
    
    })
}
let pro1=fn1()
let pro2=fn2()
Promise.all([pro1,pro2]).then((data)=>{
    console.log('两个文件都读取完了',data)
}).catch((err)=>{
    console.log(err)
})
```



- ## Promise.race()

`Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

```js
//读取文件1
function fn1() {
    return new Promise((resolve,reject)=>{
        fs.readFile('./demo1.txt','utf8',(err,data)=>{
             if(err){
                 //将promise实例对象的状态从‘未完成’变为‘失败'
                 reject('文件1111读取错误9-16')
              
             }
             //将promise实例对象的状态从‘未完成’变为‘成功'
             setTimeout(resolve,5000,data)
            //  resolve(data)
        })
     })
    
}
//读取文件2的函数
function fn2(){
  return  new Promise((resolve,reject)=>{
        fs.readFile('./demo.txt','utf8',(err,data)=>{
            if(err){ reject('读取文件2发生错误')};
            //读取成功
            //resolve(data)
            setTimeout(resolve,1000,data)
          
        })
    
    })
}

Promise.race([pro1,pro2]).then((data)=>{
    console.log('race-成功',data)
}).catch((err)=>{
    console.log('race-失败',err);
})
```









```js
//----使用async异步函数依次读取3个文件，解决回调地狱
const fs=require('fs');
function f1(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./文件.text','utf8',(err,data)=>{
            if(err) reject(err);
            
            resolve(data)
        })
    })
}
function f2(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./加油2.text','utf8',(err,data)=>{
            if(err) reject(err);
            resolve(data)
        })
    })
}
function f3(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./文件3.text','utf8',(err,data)=>{
            if(err) reject(err);
            
            resolve(data)
        })
    })
}

async function allFn(){
 const t1=await f1();
 const t2=await f2();
 const t3=await f3();
 console.log('文件读取到内容1111',t1);
 console.log('文件读取到的内容2222',t2);
 console.log('文件读取到的内容3333',t3);
 return '三个文件读取完毕'
}

allFn().then((res)=>{
    console.log(res)
}).catch(err=>{
    console.log(err);//捕获错误
});


//文件1读取成功--- 你好啊布布妈妈，你要加油哦～我是文件1
//文件222读取成功---- 22这是同步创建的文件，不需要回调函数---文件2
//文件333读取成功---- 中国加油，希望布布平安健康～～～～文件3
//三个文件读取完毕
```

```js
//----使用async异步函数依次读取3个文件，解决回调地狱 ---代码优化

//fs.readFile可以读取文件，这个方法是通过返回值的方式来获取文件的读取结果，它不返回promise对象，所以前面不能直接使用关键字
//node.js提供了一个promisify方法，这个promisify方法可以对现有的异步api进行包装改造，返回一个改造后的新的方法，这个新的方法可以返回promide对象以支持异步函数的语法，这个promisify方法存储在util模块中，我们可以先引入util模块，在util模块下找到这个promisify方法


const fs=require('fs');
const promisify=require('util').promisify; //获取util模块中的promisify方法
const readFile=promisify(fs.readFile); //使用promisify对现有的node.js的异步API进行包装，让它返回promise对象。然后才能支持异步函数的语法。pomisify的参数是要进行包装处理的方法，返回值是一个新的方法，这个新方法就会返回promise对象


async function allFn(){
 let t1=await readFile('./文件.text','utf8');
 let t2=await readFile('./加油2.text','utf8');
 let t3=await readFile('./文件3.text','utf8');
 console.log('文件读取到内容1111',t1);
 console.log('文件读取到的内容2222',t2);
 console.log('文件读取到的内容3333',t3);
 return '三个文件读取完毕'
}
allFn().then((res)=>{
    console.log(res)
}).catch(err=>{s
    console.log(err);//捕获错误
});

//文件1读取成功--- 你好啊布布妈妈，你要加油哦～我是文件1
//文件222读取成功---- 22这是同步创建的文件，不需要回调函数---文件2
//文件333读取成功---- 中国加油，希望布布平安健康～～～～文件3
//三个文件读取完毕
```

#### 解决回调地狱

## async异步函数

异步函数是异步编程的终极解决方案，他可以让我们将异步代码写成同步的形式，让代码不再有回调函数的嵌套，使代码变得更加清晰

async 是 ES7 才有的与异步操作有关的关键字。在普通函数定义前加上async关键字，就是一个async异步函数。

***async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果***

### 使用方法

#### 异步函数的默认返回值是Promise对象

这样我们就不用在函数内部手动的返回一个promise对象了 ( return new Promise(..) )



```js
//一个普通函数
function getData(){
    return "syy";
}
console.log(getData())  //syy
 
//加上async后
async function getData(){
    return "syy";
}
console.log(getData());  //Promise {<resolved>: "syy"}
```

#### 2、async函数内部return语句返回的值，会成为then方法回调函数的参数

在异步函数中使用return关键字进行结果的返回 结果会被包裹在promise对象中

实际：在异步函数内使用return 关键字替代了resolve()方法return语句返回的值，会成为then方法回调函数的参数

```js
async function getData(){
    return "syy";
}
getData().then(data=>{
    console.log(data)  //syy
});
```

#### 3、async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态，抛出的错误对象会被catch方法回调函数接收到

即在异步函数内部使用throw关键字进行错误的抛出，替代了reject()方法

```js
async function getData(){
    throw new Error('出错了');  //-- 或者 直接使用 throw '出错了';   throw 关键字的在js中的是抛出异常，后面是错误信息  
  	console.log('8888'); // throw或return 执行以后后面的代码就不会执行了，这里不会输出
  
}
getData()
.then(v=>{
    console.log(v)
})
.catch(e=>{
    console.log(e)  //Error: 出错了
});
```



调用异步函数再链式调用then方法获取异步函数的执行结果

调用异步函数再链式调用catch方法获取异步函数的执行的错误信息



```js
//注意
async function p1() {
    console.log('console---1')
     setTimeout(() => {
        console.log("console--4");
        return '2222async函数的回调不是我（异步的返回值）'
    }, 3000)
    return '11111我才是async函数的成功回调'
}

p1().then(data=>{
  console.log('console---2',data)
})
console.log('console---3')

//-------
'console---1
'console---3
'console---2 返回值：11111我才是async函数的成功回调  （注意：async函数的返回值，不是异步的返回值）
'console---4
```





## await关键字

在异步函数内有一个await关键字

注意：

- await关键字只能在异步函数内部使用，不能在全局使用，否则会报错

- await关键字后面只能跟Promise对象，它可以暂停异步函数的执行，直到Promise对象返回结果后，再向下执行函数（ 这样我们就可以将异步代码变成同步的形式了 ）

  

  async用于申明function异步，await用于等待一个异步方法执行完成

**1、正常情况下，await命令后面必须是一个Promise对象。**

```js
async function getData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            var name = "syy";
            resolve(name)
        },1000)
    })
}
async function test(){
    var p = await getData(); //可以通过返回值的方式拿到异步函数的结果了，也就是异步函数getData里resolve函数的参数，不再需要在then()方法里获取resolve的返回值
    console.log(p);
};
test(); //syy
```

**2、await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到**

```js
async function f() {
  await Promise.reject('出错了');
}
f()
.then(v => 
    console.log(v)
)
.catch(e => 
    console.log(e)
)  //出错了



//上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。
```

**3、任何一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行**

如果`await`后面的异步操作出错，那么等同于`async`函数返回的 Promise 对象被`reject`

```js
async function f() {
    await Promise.reject('出错了');
    await Promise.resolve('hello world');  //不会执行，因为第一个await语句状态变成了reject
}   //Promise {<rejected>: "出错了"}
```

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个`await`放在`try...catch`结构里面，这样不管这个异步操作是否成功，第二个`await`都会执行。

```javascript
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f().then(v => console.log(v))
// hello world
```

另一种方法是`await`后面的 Promise 对象再跟一个`catch`方法，处理前面可能出现的错误。

```javascript
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```







```js
//----检测执行顺序的小案例
function time(a,ms){
  return new Promise((resolve,reject)=>{
    setTimeout((value)=>{
      console.log(value)
      resolve('**');
    },ms,a)
  })

}
async function fn(){
  var haha=await time('6666',1000);
  console.log('a')
  return 99;
}
fn().then(res=>{
  console.log('~~~~~~~',res)
});
console.log(77777)

//77777
//6666
//a
//~~~~~~~ 99
```

ajax发送请求并发，继发

```js
//----封装的请求first接口的函数
        function sendAjax(str){
            return new Promise((resolve,reject)=>{
                //1 创建ajax对象
                let xhr=new XMLHttpRequest();
                // 2 给请求做配置
                xhr.open('get','http://localhost:3000/first?item='+str)
                // 3 发送请求
                xhr.send()
                console.log('发送了请求-----')
                //4 获取服务器的响应 
                xhr.onload=function(){
                    // console.log('拿到了服务的响应哈哈哈~~~',xhr.responseText,xhr.status)
                    if(xhr.status!=200){
                        reject(xhr.responseText)
                    }else{
                        resolve(xhr.responseText)
                    }
                }
            })
        
        }

//点击按钮后向服务器发送请求

btn.onclick=async function(){
    //----------------------情况1 发送单个请求
    sendAjax().then(data=>{
        //------
        console.log('成功了，参数是：',data)
    }).catch(err=>{
        console.log('失败',data)
    })
    
    //----------------情况2 有一个数组依据数组发送多个请求
    var arr=[1,2,3,4,5,6];
    //----------------继发的发送多次请求 
    //----传统的for循环，for of循环是继发的发送请求

    for(var i of arr){
        let res=await sendAjax(i);
        console.log('我已经获取到的请求的返回结果',res)
    }

    for(var i=0;i<=arr.length-1;i++){
        let res=await sendAjax(arr[i])
        console.log('我已经获取到的请求的返回结果',res)
    }

    //----并发发送多次请求
    
    //-----------注意：foreach是并发发送多个请求，但是 执行结果可能错误 不要用
    //----不要用 foreach
    arr.forEach(async (item)=>{
        let res=await sendAjax(item)
        // resArr.push(res)
        console.log('我已经获取到的请求的返回结果',res)
        newArr.push(res)
    })
    
       //--------推荐 并发的写法1 
        var resArr=arr.map((item)=>{
            return sendAjax(item)
        });
        let results=await Promise.all(resArr);
        console.log('结果----',results)
        console.log('>>>>>>>>',resArr)

            //--------推荐 并发的写法2
    var resArr=arr.map((item)=>{
        return sendAjax(item)
    });
    let results=[]
    for(let i of resArr){
      //....
  	  results.push(await i);
    }
  console.log(results)
```

