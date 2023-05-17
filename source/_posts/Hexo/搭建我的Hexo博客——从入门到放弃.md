---
title: 搭建我的Hexo博客——从入门到放弃
categories: Hexo
tags: Hexo
icon: note
---

这篇博客记录的是我从0开始搭建自己的博客的过程。**注意:这不是一篇搭建博客教程！！!** 它只是记录了我走过的一些弯路以及摸索和学习的过程，因此写的顺序并不符合教程的格式。内容也比较零碎。如果你也想用我的主题搭建自己的博客，那么这篇文章也许有一定的参考价值。

## 1 Hexo博客安装与部署
参考[Windows下，Hexo+GitHub搭建博客](https://blog.csdn.net/qq_27754983/article/details/76143478)这篇博客。其中一些常用命令为
```
hexo g # 完整命令为hexo generate，用于生成静态文件 
hexo s # 完整命令为hexo server，用于启动服务器，主要用来本地预览 
hexo d # 完整命令为hexo deploy，用于将本地文件发布到github上 
hexo n # 完整命令为hexo new，用于新建一篇文章
hexo clean # 清除hexo缓存
```

## 2 新建页面
`hexo new page pagename`

这个操作会在`source`中新建一个名为`pagename`的文件夹。里面的内容就是新页面的内容。

## 3 文章属性设置
以下设置置于文章顶端，用于修改页面显示属性
1. 色块 `color: blue/purple/green/yellow/red`，如果不设置则随机选择。
2. 个性化徽标 `icon: book/game/note/chat/code/image/web/link/design/lock`，如果不设置则随机选择。
3. 缩略图设置 `thumb: `，如果不设置则优先级顺序为：文章第一张图片$\rightarrow$默认缩略图。通过`thumb:`设置的缩略图可以是外链或本地文件。本地文件需要放在`/source/images/`文件夹下，支持`png`，`jpg`，`jpeg`，`webp`。
4. 代码高亮设置 [在这里修改](https://highlightjs.org/static/demo/)。将样式名称所有字母小写并用`-`隔开即可。

## 4 分页设置
1. 首页分页
```
index_generator:
  path: ''
  per_page: 12
  order_by: -date
```
2. 归档页分页
```
archive_generator:
  enabled: true
  per_page: 0
  yearly: true
  monthly: true
  daily: false
  order_by: -date
```

## 5 第一次加入自己的HTML代码
需求：在页脚处加入一个跳动的$\hearts$并设置颜色为红色。

html
```html
<link href="//cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
<link href="//cdn.bootcss.com/animate.css/3.5.1/animate.min.css" rel="stylesheet">
<i class="fa fa-heart animated infinite pulse"></i>
```
css
```css
.fa.fa-heart {
  color: red;
  font-size: 5em;
}
```
加入方法：找到`footer.ejs`文件，在对应位置插入html代码。找到`style.min.css`文件，在结尾处加上相应地css代码。

## 6 加入看板娘功能
- [基本版](https://github.com/EYHN/hexo-helper-live2d)
- [高级版](https://github.com/journey-ad/live2d_src)
- [高级版设置教程](https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02)
- [高级版教程2](https://zhangshuqiao.org/2018-07/%E5%9C%A8%E7%BD%91%E9%A1%B5%E4%B8%AD%E6%B7%BB%E5%8A%A0Live2D%E7%9C%8B%E6%9D%BF%E5%A8%98/)
- **[终极版教程(推荐使用)](https://github.com/fghrsh/live2d_demo)**

## 7 对超链接的设置
```css
.post-content p a {
  color: #313131;
  border-bottom: 1px solid #ccc;
}
```

## 8 图标素材库
[font awesome](https://fontawesome.com/v4.7.0/cheatsheet/)

## 9 源代码结构
- source
  - _posts 存放文章。每个Markdown文件就是一个页面。
  - about 存放about页面。
  - categories 存放categories页面
  - links 存放links页面。
  - plugins 存放一些插件，如live2d
  - tags 存放tags页面
- themes 
  - pinghsu
    - languages 不同语言文本显示。默认采用`zh-CN.yml`中的配置
    - layout
      - _partial
        - footer.ejs 页面底部相关设置
        - header.ejs 页面顶部相关设置
        - page-archive.ejs 标签页点击各标签进入的页面
        - page-category.ejs 首页点击分类进入的页面
        - page-custom.ejs 自定义页面
        - page-search.ejs 搜索页面
        - page-tag.ejs 首页点击标签进入的页面
        - pagination.ejs 分页设置，即每页显示多少内容
      - archive.ejs 归档页设置
      - category.ejs 分类页设置
      - index.egs 首页设置
      - layout.ejs 暂不清楚
    - scripts 一些用到的js脚本
    - source
      - images 用到的图片
      - js 一些用到的脚本  
    - style.min.css 页面css设置
    - _congfig.yml 与主题相关的配置文件
- _config.yml Hexo配置文件


## 10 修改Tags页面每行显示个数
`style.min.css`中的`.connon-page .post-list-item`的`width`项

## 11 修改页面显示的一些文字
`/languages/default.yml`

## 12 将配置中的一些文字加入代码
`__('menu.tags')`

## 13 看板娘相关设置
1. 看板娘基础设置
   看板娘基础设置包括样式设置及事件应答语句。样式设置在`waifu-tips.js`开头，事件应答语句设置在`waifu-tips.json`中。
2. mouseClick和mouseMove的响应
   为了响应mouseClick和mouseMove事件，需要指定`selector`和响应的`text`。模板已经在`waifu-tips.json`中给出。其中`selector`即为触发条件。为了快速找到触发条件，可以使用Chrome的`检查`，找到元素所属的类(class)或超链接(a href)即可。

## 14 Mouseover多次触发问题
在测试看板娘的时候，发现多次移动鼠标都会触发mouseover语句，上网查阅后发现mouseover会冒泡，也就是会触发父类。因此改成了mouseenter。仅在进入时触发。

## 15 `<a>`标签的属性
[这里](http://www.w3school.com.cn/tags/tag_a.asp)可以看到`<a>`标签的属性。有时候需要加入`title`属性以方便引用。

## 16 添加搜索功能
1. 在`page.ejs`中加入
```
else if (is_current('/search')) { %>
<%- partial('_partial/page-search') %>
<% }
```
2. `hexo new page search`
3. 新建`page-search.ejs`
4. 在`style.min.css`中 修改搜索框及搜索结果边框和样式
5. 在`search.js`中修改关键词高亮样式
6. 在测试时发现匹配时会匹配到标签中的值(如`<strong>`)等，因此在正则表达式中需要进行修改。查询结果是在`RegExp`的`keyword`后加上`"(?![^<>]*>)"`。这句话的意思是把关键词后带`>`的去掉，也就是去掉了标签里的关键词以免将标签内的关键词作替换。
7. 这个搜索的关键词是用`[\s\-]+`隔开。
8. 在测试时发现搜索结果框在没有输入关键词时仍显示，于是在`search.js`中加了一段脚本，使之在无关键词时隐藏。
```js
if (this.value.trim().length <= 0)
        {
          document.getElementById(content_id).style.display="none"
          return;
        }
        else
        {
          document.getElementById(content_id).style.display=""
        }
```
另外，在`page-search.ejs`中让搜索结果一开始默认不显示。
```html
<div id="local-search-result" class="local-search-result-cls" style="display:none"></div>
```
9. Console报错`Uncaught TypeError: Cannot read property 'addEventListener' of null`
原因：在一开始`$input`为空，所以不能添加监听函数。解决方法是加一个判断`if ($input)`。

## 17 滑动条的实现
```ejs
<% if (is_post()) { %>
var postSharer = new Headroom(document.getElementById("post-bottom-bar"), {
    tolerance: 0,
    offset : 70,
    classes: {
        initial: "animated",
        pinned: "pinned",
        unpinned: "unpinned"
    }
});
postSharer.init();
<% } %>
var header = new Headroom(document.getElementById("header"), {
    tolerance: 0,
    offset : 70,
    classes: {
      initial: "animated",
      pinned: "slideDown",
      unpinned: "slideUp"
    }
});
header.init();
```

## 18 加入音乐播放器
在`post.ejs`中找到
```ejs
<% if (theme.music.enable) { %>
		<meting-js
			id="<%= theme.music.id %>"
			fixed="true"
			server="<%= theme.music.server %>"
			type="<%= theme.music.type %>"
			auto="<%= theme.music.auto %>"
			autoplay="<%= theme.music.autoplay %>"
			order="<%= theme.music.order %>"
			lrc-type="0"
			>
		</meting-js>
		<% } %>
```
具体选项可google`meting-js`进行设置。另外注意要在配置文件中把`music.enable`项设为`true`。

## 19 为博客标题中的超链接加上下划线
用Chrome调试找到
```css
.post-content ol a {
  color: #313131;
  border-bottom: 1px solid #ccc;
}

.post-content ol a:hover {
  color: #eb5055;
  border-bottom: 1px solid #eb5055;
}
```

## 20 修改光标样式
在想修改的地方（如`body`）添加
`cursor:url('https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/normal.cur'), auto;`

## 21 打字彩花特效
