---
title: jQuery
categories: Hexo
tags: Hexo
icon: note
---
# jQuery

首先带入一下插件  库  框架的区别

- 插件:实现某一个单一类的功能的   swiper   ECharts等

- 库:封装了各种的功能和需要的工具

(jquery最初就是封装了DOM操作的选择器，jquery比document.querySelector()和jquery比document.querySelectorAll()早了9年，最初的DOM操作获取元素只有 byId byName byTagName，jquery的产生大大提告了开发效率)

- 框架:有自己的完整的生态系统 vue等

## jq了解

https://jquery.cuishifeng.cn/   崔世峰文档

引入

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
```

- 前端方法库

  主要封装了各种dom操作

- 优点：

  - 选择器
  - 链式编程
  - 隐式迭代

- 特点：

  号称全兼容，但是jq 2.0以前版本是全兼容各种版本的ie浏览器，但是2.0以后逐步的不再兼容ie低版本的浏览器

- 当你引入一个jquery.js或者jquery.min.js以后会向全局暴露两个变量名:   jQuery   和 $

```js
    console.log($);  //函数
    console.log(jQuery); //函数
```

学习jquery从调用这个$函数开始。  $()

## jquery(选择器)筛选器

- - 选择器

    作用：对元素的获取

    - 基础选择器
    - 特殊选择器

  - 筛选器

    作用：对已经获取到的元素集合进行二次筛选

### 选择器

#### 基础选择器

语法：$(选择器)         css里的选择器怎么写，这里就怎么写参数

返回值：满足条件的所有元素的集合，即将所有符合条件的元素放在一个伪数组里返回，我们管这个集合叫做 jquery元素集合

（id选择器除外，使用id选择器的话只选择第一次出现的符合条件的元素）

```js
//基础选择器这里不必多说按照css写法即可
//找出li里的奇数为的li css选择器中的数值是从1开始的
console.log($('div>ul>li:nth-child(odd)'))
```

#### 特殊选择器(修饰选择器)

修饰选择器是jq的语法(非css语法)

语法：$(选择器)

作用：对已经存在的选择器进行修饰

- :first 元素集合第一个
- :last  元素集合最后一个
- :eq(索引数字)    注：这里的索引从0开始
- :even 索引为偶数
- :odd 索引为奇数
- 还有一些可以看文档(不常用)

```js
console.log($('div:first'));//拿div里的第一个 
console.log($('div:last'));//拿div里的最后一个
console.log($('div:eq(0)'));//拿div里的第一个 
```

### 筛选器(*表示重点  着重记忆)

作用：对jquery的元素集合进行二次筛选(链式编程的强大之处初体现)

注意：只有jquery的元素集合可以使用，原生的dom对象不可以使用

#### first() *

作用：元素集合第一个

#### last() *

作用：元素集合最后一个

#### eq(索引) *

作用：元素集合指定索引那一个

```js
//可以实现 对所有的li设置样式后，在对第一个单独设置样式    (链式语法)
$('li').操作css().fisrt().操作css()
```

#### next()

作用：当前索引的下一个元素

#### nextAll()

语法：

元素集合.nextAll    获取当前元素后面的所有的兄弟元素

元素集合.nextAll(选择器)   获取当前元素后面的所有兄弟元素的选择器指定的那一个

#### nextUntil()

语法：

元素集合.nextAll()    获取当前元素后面的所有兄弟元素

元素集合.nextUntil(选择器)   获取当前元素后面的所有兄弟元素，直到找到选择器元素为止(不包含选择器元素)

#### prev()

获取当前元素的上一个元素

#### prevAll()

语法：

元素集合.prevAll()       获取当前元素上面的所有的兄弟元素

元素集合.prevAll(选择器)      获取当前元素上面的所有的兄弟元素中指定选择器的那一个

#### prevUntil()

语法：

元素集合.prevUntil()    获取到当前元素上面所有的兄弟元素

元素集合.prevUntil(选择器)    获取到当前元素上面所有的兄弟元素，直到选择器元素为止（不包含选择器元素）

#### parent() *

获取到当前元素的父元素

#### parents() *

语法

元素集合.parents()     拿到结构父级的所有父元素

元素集合.parents(选择器)     拿到结构父级里面的所有父元素中符合选择器的那一个元素

#### children() *

语法：

元素集合.children()     拿到该元素的所有子元素

元素集合.children(选择器)     拿到该元素的所有子元素中符合选择器的那一个元素

#### siblings() *(实现排他很重要)

拿到该元素的所有的兄弟元素，自己除外

#### find(选择器) *

找到该元素中所有后代元素里面符合选择器条件的元素

#### index()*

获取到该元素在其父元素内的索引

## jquery操作文本

作用：操作元素内的文本和超文本

注意：属于jquery 的方法 只能jquery元素集合使用，原生的DOM不能调用

### html()

语法：

- 元素集合.html()     获取

  获取该元素的超文本内容，以字符串的形式返回

  获取的时候为了保证html结构只能获取第一个元素的超文本内容

- 元素集合.html('内容')   设置

  设置元素集合内元素的超文本内容

  完全覆盖式的写入

### text()

语法：

- 元素集合.text()

  获取该元素的文本内容，以字符串的形式返回

  因为是文本内容，不涉及html结构，所以拿到的是所有元素的文本的内容,以一个字符串的形式返回

- 元素集合.text(内容)

  设置元素集合内元素的文本内容

  完全覆盖式写入


### val()

语法：

- 元素集合.val()

  获取元素集合内元素的value值

- 元素集合.val(' 内容')

  设置元素集合内元素的value值，完全覆盖式的写入


```js
    <div>1111</div>
    用户姓名：<input type="text"> <br>
    年龄： <input type="text"><br>
    <script>
        //获取元素内容
        console.log($('div').html());

        //写入(注意这里是完全覆盖式写入，把子元素也能写没)
        $('div').html('<a href="#"> 京东</a>')

        //获取到元素集合中所有 元素中的文本（包含它后代元素中的文本）都获取出来，不能解析html
        console.log($('div').text());
        
        // 写入文本内容
        $('div').text('<a href="#"> 京东</a>')

        //表单元素的value获取设置
        console.log($('[type="text"]').val());
        $('[type="text"]').val('加油加油')
    </script>
```

## jquery操作元素类名

#### addclass()

添加元素类型

#### removeClass()

删除元素类名

#### hasClass()

判断元素有没有类名

#### toggleClass()

切换类名

如果原先有就删除，如果原先没有就添加

#### prop()     attr()

覆盖类名   (但是不止可以覆盖类名，还可以修改各种属性(原生，自定义等))

prop :可以获取按钮checked这种属性的状态布尔值(比如不设置就是false，设置就是true，可以获取到布尔值)

attr :不能设置取值属性为布尔值的属性状态

```js
//添加类名
$('div').addClass('red')
//删除类名
$('div').removeClass('red')
//判断元素有没有类名(有则返回true没有则返回false)
$('div').hasClass('blue')
//切换类名(没有则添加，有则删除)
$('div').toggleClass('blue')
//覆盖类名(直接覆盖)
$('div').prop('class', 'red')//可以获取按钮checked这种属性的状态布尔值(比如不设置就是false，设置就是true，可以获取到布尔值)
$('div').attr('class', 'blue')//不能设置取值属性为布尔值的属性状态
```

## jQuery 操作元素样式

### .css()  

​    可读写

 - 格式1：获取   

   元素集合.css('width')

   获取元素的某一个样式值，不管是行内还是非行内样式都可以获取到

 - 格式2: 元素集合.css('样式名',‘样式值’)

   作用：设置元素的行内样式

   隐式迭代：元素集合内有多少元素就设置多少元素的样式，设置的时候，如果你需要设置的单位是px 可以不写

- 格式2: 元素集合.css({样式名1:式值1,样式名2:式值2,样式名3:式值3})

  作用：批量设置元素样式

  隐式迭代：元素集合内有多少元素就设置多少元素的样式，设置的时候，如果你需要设置的单位是px 可以不写

```js
// 返回第一个第一个div的width
console.log($('div').css('width'));
// 可以设置集合内所有div的样式
console.log($('div').css('border', '1px solid red'));
console.log($('div').css({ padding: '10', margin: 20 }))
```

## jquery绑定事件

### on()

- **格式1：**

```js
元素集合.on('事件类型'，事件处理函数)
```

直接绑定事件，有隐式迭代

隐式迭代：元素集合内有多少元素，就给多少元素绑定事件

```js
// 给所有的div都绑定了事件
$('div').on('click', function () {
    console.log('你好')
})
```

   - **格式2:**  (事件委托)

```js
元素集合.on(事件类型，选择器(基本数据类型)，事件处理函数)  
```

第二个参数为基本数据类型的时候，是采用事件委托的绑定事件，把选择器元素委托给元素集合里面的元素

注意：选择器元素要是 元素集合内元素的后代元素，因为这样才能有事件传播

```js
//----DOM事件委托的实现方式
var ul = document.querySelector('ul')
// 我们DOM里的事件委托得这样，才能将想绑定在li上的事件委拖到ul上，这样才可以在点击li时，执行操作，点击ul时不执行操作
// 但是事件处理函数内的this依旧时事件源 ul
ul.onclick = function (e) {
    if (e.target.nodeName == 'LI') {
        console.log('点击li', this);
    }
}

//-----jq 事件委托的实现
// 点击li时才触发绑定在ul上的事件处理函数，点击ul不触发，并且事件处理函数内的this为li，而不再时事件源ul，这样我们就可以轻松的获取到我们点击的是哪一个li
$('ul').on('click', 'li', function () {
    console.log('--点击li时才触发，点击ul不触发--', this)
})
```

  - **格式3：** (传参)

```js
元素集合.on(事件类型，复杂数据类型，事件处理函数)  (需要把事件对象也实参传入，否则拿不到)
给元素集合内的所有元素绑定事件
```

第二个参数为复杂数据类型的时候，这个复杂数据类型是事件触发的时候，传递给事件处理函数里的参数

在事件对象里面有一个叫做data的成员，就是你传递进来的参数

```js
  $('li').on('click', { name: '这个对象是实参' }, function (e) {
    // 事件对象里有一个data属性，接受我们传递过来的参数
    console.log('---', e.data)
  })
```

   - **格式4：**  (事件委托的形式，带上传递的参数)

```
元素集合.on(事件类型，选择器, 数据 ，事件处理函数)
```

因为第二个参数是基本数据类型就决定了是事件委托，把选择器所属的事件委托给元素集合内元素，第三个参数则是传递的事件处理函数的参数

```html
$('ul').on('click', 'li', '我是参数了', function () {
    console.log('点击li才触发，this为li', this)
})
```

- **格式5：**(对象方式直接绑定多个事件)

```js
元素集合.on({
  事件类型1:事件处理函数，
  事件类型2:事件处理函数，
  。。。
})
```

一次性给元素集合绑定多种事件，但是不能传参及事件委托

```js
$('li').on({
    click: function () {
        console.log('点击事件');
    },
    mouseover: function () {
        console.log('移入事件')
    }
})
```

### one()

作用：用来绑定事件的方法，和on()方法的参数和使用形式一模一样，只不过绑定的事件只能执行一次

```js
//每一个li都只能执行一次 点击事件 和 移入事件
$('li').one({
    click: function () {
        console.log('点击事件');
    },
    mouseover: function () {
        console.log('移入事件')
    }
})
```

### off()

- 作用：用来解除事件处理函数

- 格式1: 元素集合.off(事件类型)

  解除元素身上该事件类型的所有事件处理函数

- 格式2: 元素集合.off(事件类型,事件处理函数)

  解除元素身上该事件类型的某一个事件处理函数

```js
function fn1() {
    console.log('事件fn1');
}
function fn2() {
    console.log('事件fn2');
}
// 给元素集合绑定了两个click事件
$('li').on('click', fn1).on('click', fn2)
// 将所有的click事件类型的事件函数都解绑
$('li').off('click')
// 只解绑了click事件类型绑定事件处理函数fn1
$('li').off('click', fn1)
//使用js来触发	
$('li').trigger('click')
```

### trigger()

作用：用js代码的方式来触发事件

格式：元素集合.trigger(事件类型)

```js
$('.right').trigger('click')
```

## jQuery 的事件函数

jq给我们提供了一些简介的绑定事件的方式，把一些常用事件直接封装成了函数

### click()

### mouseover()

这些方法可以直接使用，带有隐式迭代，可以快捷绑定事件

格式：

元素集合.事件类型(事件处理函数)

元素集合.事件类型(传入事件处理函数的参数，事件处理函数)

例：绑定点击事件

```js
//--- 在事件对象里的data属性可以获取参数
$('div').on('click', { name: '参数' }, function (e) {
    console.log('on()绑定点击事件', e);
})
$('div').click('给事件处理函数传的参数', function (e) {
    console.log('click()快捷绑定点击事件', e);
})
```

### hover() 

特殊事件：hover()  模仿悬停事件

格式：

元素集合.hover(移入事件的事件处理函数, 移出事件的事件处理函数)

如果传两个参数，那么在移入，移出时会分别触发移入移出事件

如果只传一个参数，那么移入和移出时会触发同一个函数

```js
$('div').hover(function () { 
    console.log('移入事件');
}, function () {
    console.log('移出事件');
})
```

## jquery 的节点操作

原生js的节点操作：创建节点，删除节点，替换节点，克隆节点

jquery的节点操作：创建节点，删除节点，替换节点，克隆节点

- 当$(选择器)  里面传递一个选择器的时候，就是获取元素
- 当$(DOM元素节点) 里面传递一个DOM元素节点的时候，就是转换成jquery元素集合
- 当$(html结构字符串)  里面传递一个html结构字符串的时候，就是创建元素节点

### 创建节点

- 当$(html结构字符串)  里面传递一个html结构字符串的时候，就是创建元素节点

```js
$('<p>我是p标签</p>')    //创建一个p标签
```

### 插入节点

#### 内部插入（父子关系的插入）

##### append()       (主语为父元素)

格式：父元素.append(子元素)

把子元素插入到父元素内部，放到末尾的位置

##### appendTo()       (主语为子元素)

格式：子元素.appendTo(父元素)

把子元素插入到父元素的内部，放到末尾位置

注意：append()和appendTo()的作用是一样的，只不过主语不同，因为我们可以进行链式编程的操作

```js
$('body').append(p).css({ backgroundColor: 'blue' })
//主语是body所以是给body添加背景颜色蓝色
p.appendTo($('body')).css({ backgroundColor: 'yellow' })
//主语是p所以是给p添加背景颜色黄色
```

##### prepend()         (主语为父元素)

格式：父元素.prepend(子元素)

把子元素插入到父元素内部，放到最前面的位置

##### prependTo()           (主语为子元素)

格式：子元素.prependTo(父元素)

把子元素插入到父元素内部，放到最前面的位置

```js
$('body').prepend(p)  //主语为body
p.prependTo($('body')) //主语为p
```

#### 外部插入(兄弟关系的插入)

- **在后面插入兄弟元素**

##### after()

格式：存在元素.affter(插入元素)

把插入元素排在存在元素的后面，以兄弟关系出现

##### insertAfter

格式：插入元素.insertAfter(存在元素)

把插入元素排在存在元素的后面，以兄弟关系出现

```js
$('div').eq(1).after(p)   //在元素后插入元素(主语为存在元素)
p.insertAfter($('div').eq(1))   //在元素后插入元素(主语为插入元素)
```

- **在前面插入兄弟元素**

##### before()

格式：存在元素.before(插入元素)

把插入元素排在存在元素的前面，以兄弟关系出现

##### insertBefore()

格式：插入元素.insertBefore(存在元素)

把插入元素排在存在元素的前面，以兄弟关系出现

```js
$('div').eq(1).before(p)   //在元素前插入元素(主语为存在元素)
p.insertBefore($('div').eq(1))   //在元素前插入元素(主语为插入元素)
```

### 删除节点

#### remove()

格式： 元素集合.remove()

把自己从自己的父元素中删除

删除只有自己删自己，没有从父元素中删除子元素，因为jq的选择器太强大了

```
$('div').remove();
```

#### empty()

格式：元素集合.empty()

把自己变成空标签，把所有的后代节点全部移除

```js
$('div').empty();
```

### 替换节点

- replaceWith()

格式：被换下来的节点.replaceWith(换上的节点)

- replaceAll()

格式：换上的节点.replaceAll(被换下来的节点)

```js
//替换节点(主语为被替换掉的节点)
$('div').replaceWith(p)
//替换节点(主语为替换上的节点)
p.replaceAll($('div')).css({ backgroundColor: 'red' })
```

### 克隆节点

##### clone()

格式：元素集合.clone()

- 必然携带所有的节点过来

- 第一参数表示是否克隆节点本身的事件 默认值是false ，选填true

- 第一个参数为默认为false，只clone元素，不clone元素上的事件，第一个参数为true则会clone事件

- 第二个参数默认是跟随第一个，表示 是否克隆元素后代节点的事件，选填

注意：当第一个参数是false 的时候，第二个参数没有意义

```js
$('div').click(function () {
    console.log('点div');
})
$('div>p').click(function () {
    console.log('点击p标签');
})
//普通克隆(会克隆整个元素)
$('div').clone()
//可以配合清空节点使用
$('div').clone().empty()
//可以有两个参数布尔值(第一个参数是克隆节点的事件是否克隆)(第二个参数是克隆节点子节点事件是否克隆)
//父元素子元素事件都克隆
$('div').clone(true).appendTo($('body'))
//父元素事件克隆，子元素不克隆
$('div').clone(true, false).appendTo($('body'))

//当父元素的事件没被克隆时，子元素的事件也不能被克隆
```

### 操作属性

DOM中操作属性的方式

原生属性  id class src。

自定义属性  getAttribute()

H5 自定义属性  dataset 

jQuery 有三种操作属性的方式

attr()和removeAttr()

- attr()

  - 获取格式：元素集合.attr(属性名)

  获取元素的该属性，主要用来获取标签的属性，包括一些自定义属性

  - 设置格式: 元素集合.attr(属性名,属性值)

   设置元素的属性不论设置的是什么类型的值，都会变成字符串得到的都是字符串

- removeAttr()

  语法：元素集合.removeAttr(属性名)

  删除元素身上的属性

```js
//获取元素的原生属性(未设置返回undefined)
console.log($('div').attr('class'));

//获取自定义属性
console.log($('div').attr('data-index'));//11

//获取属性(获取不到，因为属性没有设置所以为undefinde)
console.log($('input').attr('checked'));

//使用prop(可以获得为设置的属性的状态比如checked)
console.log($('input').prop('checked'));//false

//设置属性
$('input').attr('checked', true)
//当设置类名时只要不是变量，其他数值类型都会转为字符串设置
$('div').attr('class', {})//会把object转为字符串设置

//删除元素属性
$('div').removeAttr('class')
$('div').removeAttr('data-index')
```

## 获取元素的属性(宽高，定位)

### 获取元素的尺寸

获取元素的尺寸的方式 有三套，这三套方法不论元素是否隐藏都可以获取到

#### width()和height()

格式：元素集合.width()    元素集合.height()

获取元素 内容 区域的尺寸 

 box-sizeing：border-box的时候 也是只获取内容区域的尺寸

```js
//获取到内容区域尺寸(可以加参数加参数就是设置)
console.log($('div').width());
console.log($('div').height());
```

#### innerWidth() 和 innerHeight()

格式：元素集合.innerWidth()    元素集合.innerHeight()

获取元素 内容+padding 区域的尺寸 

```js
//获取到内容区域尺寸+padding
console.log($('div').innerWidth());
console.log($('div').innerHeight());
```

#### outerWidth() 和 outerHeight() 

格式：元素集合.outerWidth()    元素集合.outerHeight()

获取元素 内容+padding+border 区域的尺寸 

```js
//获取到内容区域尺寸+border+padding(加参数为true就在基础上+margin)
console.log($('div').outerrWidth());
console.log($('div').outerrHeight());
```

#### outerWidth(true) 和 outerHeight(true) 

格式：元素集合.outerWidth()    元素集合.outerHeight()

获取元素 内容+padding+border+margin 区域的尺寸 

```js
//获取到内容区域尺寸+padding+border+margin
console.log($('div').outerWidth(true));
console.log($('div').outerHeight(true));
```

### 获取元素的位置

#### offset()

是一个读写的方法

- 读取：元素集合.offset()

返回值为一个对象。里面是相对页面左上角的绝对坐标

注意：读取出来的是一个对象，你需要值的时候，需要点语法获取[]访问对象里的属性，不能继续链式编程了，到头了

- 设置：元素集合.offset({top:XXX,left:XXX})


注意：设置的时候如果 父元素和子元素都要动，需要考虑先后顺序，顺序不同效果不同

```js
// 获取元素相对页面左上角的绝对坐标
console.log($('div.outer').offset());
console.log($('div.inner').offset());

// 设置元素相对页面左上角的位置
// 设置的时候如果 父元素和子元素都要动，需要考虑先后顺序，顺序不同效果不同
// 先移动父元素后移动子元素
console.log($('div.outer').offset({ top: 50, left: 50 }));
console.log($('div.inner').offset({ top: 0, left: 0 }));

// 先移动子元素后移动父元素  ，先移动子元素，子元素到达指定位置后，再移动父元素，父元素会带着子元素再一起动 
console.log($('div.inner').offset({ top: 0, left: 0 }));
console.log($('div.outer').offset({ top: 50, left: 50 }));
```

#### position

是一个只读的方法

格式：元素集合.position()

返回值：一个对象，里面包含

 获取匹配元素相对父元素的偏移，就是元素的定位关系

如果设置的偏移量是right和bottom 会自动计算成left和top

## jquery动画

动画有默认值可以直接写不用传入参数

### 基础动画

- show() 显示

- Hide() 隐藏

- toggle 切换  本身显示就隐藏，本身隐藏就显示


上面三个方法操作的是 display：none或者block

格式：方法名(运动时间，运动曲线，运动结束时触发的回调函数)

```js
$('button').first().click(function () {
    $('div').show(1000, 'linear', function () {
        console.log('显示结束');
    })
})

$('button').eq(1).click(function () {
    $('div').hide(1000, 'linear', function () {
        console.log('隐藏结束');
    })
})

$('button').eq(2).click(function () {
    $('div').toggle(1000, 'linear', function () {
        console.log('切换结束');
    })
})
```

### 折叠动画

- slideDown() 下拉显示

- slideUp() 上拉隐藏

- slideToggle()  切换显示和隐藏


折叠动画操作的是元素的高，默认从下往上折叠  (因为操作的是元素的高，所以可以通过定位在下让其从上往下折叠)

格式：方法名(运动时间，运动曲线，运动结束时触发的回调函数)

```js
//原理是把div的高度变低，可以把div定到下面，那样就是从上往下隐藏了
$('button').eq(0).click(function () {
    $('div').slideDown(1000, 'linear', function () {
        console.log(11);
    })
})

$('button').eq(1).click(function () {
    $('div').slideUp(1000, 'linear', function () {
        console.log(22);
    })
})

$('button').eq(2).click(function () {
    $('div').slideToggle(1000, 'linear', function () {
        console.log(33);
    })
})
```

### 渐隐渐显动画

通过操作元素的opacity 达到效果

- fadeIn()   显示   opacity 从0～1

- fadeOut()   隐藏   opacity 从1～0

- fadeToggle()  切换

  格式：方法名(运动时间，运动曲线，动画结束时触发的回调函数)

- fadeTo() 运动到指定的透明度

  格式：fadeTo(时间，指定的透明度，运动曲线，回调函数) 

```js
$('button').eq(0).click(function () {
    $('div').fabeIn(1000, 'linear', function () {
        console.log(111);
    })
})

$('button').eq(1).click(function () {
    $('div').fadeOut(1000, 'linear', function () {
    console.log(222);     
    })
})

$('button').eq(2).click(function () {
    $('div').fadeToggle(1000, 'linear', function () {
        console.log(333);
    })
})

//可以接收四个参数，分别为动画执行时间，元素透明值，动画执行曲线，结束后执行函数
$('button').eq(3).click(function () {
    $('div').fadeTo(1000, 0.6, 'linear', function () {
        console.log(444);
    })
})
```

### 综合动画

可以按照你的设定去进行运动

- animate()

  格式：animate({书写要运动的属性},时间，运动曲线，回调函数)

  注意：颜色相关的属性，运动不了，css的2d和3d动画效果运动不了

```js
$('button').first().click(function () {
    $('div').animate({
        width: 100,
        height: 100,
        backgroundColor: 'red',//运动不了
        borderRadius: '50%'
    }, 'linear', function () {
        console.log('运动结束');
    })
})
```

###停止动画

因为给一个元素设置了动画以后，如果快速触发，会停不下来，直到你所有触发都执行完毕为止

jq提供了两个临时停下动画的方法

- stop()

  格式：元素集合.stop()

  当代码执行到这一句的时候，不管运动到什么程度，立即停下来，运动到什么位置就停止在什么位置

- finish()

  格式：元素集合.finish()

  当代码执行到这句的时候，不管运动到什么程度，直接到运动结束的位置

## jquery实现深拷贝

jq里面提供一个进行深拷贝的方法 $.extend()

- 格式：$.extend(目标对象1，对象2，对象3，......)

从第二个参数开始的每一个对象的数据拷贝到第一个对象里，默认是一个浅拷贝

- 格式：$.extend(true,目标对象1，对象2，对象3，......)

把从第三个参数开始的每一个对象的数据拷贝到第二个对象里，由第一个参数 控制是否是深拷贝

注意：如果你要进行深拷贝，不管是深拷贝还是浅拷贝，至少要传递两个参数，传递一个参数的时候，不是进行拷贝

## jq发送ajax请求

### 发送get请求

jQuery提供一个函数，叫做 $.get()

jQuery引入以后，会提供两个变量 $  jQuery，这两个都是函数数据类型

把这个函数当做一个对象，向他的身上添加了一些成员，我们管这种方法叫做jquery的全句方法，不需要依赖选择器，不需要元素集合，直接调用就行

专门用来发送get请求

格式：$.get(地址，传递给后端的数据，回调函数，期望返回的数据类型)

地址：请求地址。（你可以自主拼接参数，不推荐）

如果在地址的后面拼接了参数数据，则数据参数就不用再设置了，直接写成功的回调函数

数据：给后端的数据，可以写 ‘key=value&key=value’，也可以以对象的形式写 {key:value,key2:value}

回调：请求成功后的回调，请求成功以后会触发

期望返回的数据类型：是不是执行解析响应题的操作

'string' 不解析           ‘json’ 会执行一步 JSON.parse()

### 发送post请求

jQuery提供一个全局放法 $.post(),这个方法是专门用来发送 post请求的

发送post请求格式：$.post(地址，携带给后端的数据，回调函数，期望后端返回的数据类型)

四个参数的意义和$.get()一模一样

```
         // post请求的参数不能在地址后面拼接  
        //参数可以为字符串的形式
        $.post('地址', 'a=100&b=200', (res) => {
            console.log(res)
        }, 'string');//不解析返回值

        //参数可以为对象的形式
        $.post('地址2', { a: 100, b: 200 }, (res) => {
            console.log(res)
        }, 'json');//解析返回值
```

