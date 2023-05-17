---
title: 为什么不建议在 JavaScript中使用 innerHTML？
categories: JavaScript
tags: JavaScript
icon: note
---
# element.innerHTML

**`Element.innerHTML`** 属性设置或获取 HTML 语法表示的元素的后代。

**备注：** 如果一个 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div), [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span), 或 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/noembed) 节点有一个文本子节点，该节点包含字符 `(&)`, `(<)`, 或 `(>)`, `innerHTML` 将这些字符分别返回为 &amp;, &lt; 和 &gt;。使用[`Node.textContent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent) 可获取一个这些文本节点内容的正确副本。

如果要向一个元素中插入一段 HTML，而不是替换它的内容，那么请使用 [`insertAdjacentHTML()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML) 方法。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML#语法)

```
const content = element.innerHTML;
element.innerHTML = htmlString;
```

Copy to Clipboard

### [值](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML#值)

[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 包含元素后代的 HTML 序列。设置元素的 `innerHTML` 将会删除所有该元素的后代并以上面给出的 htmlString 替代。

### [例外](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML#例外)

**`SyntaxError`**

当 HTML 没有被正确标记时，设置 `innerHTML` 将会抛出语法错误。

**`NoModificationAllowedError`**

当父元素是 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 时，设置 `innerHTML` 将会提示不允许修改。

## [使用说明](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML#使用说明)

`innerHTML` 属性可以用来检查当前页面自最初加载到当前的 HTML 源码的变化。

### [获取元素的 HTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML#获取元素的_html)

获取 `innerHTML` 会导致用户代理序列化 由元素后代组成的 HTML 或者 XML。返回结果字符串。

```
let contents = myElement.innerHTML;
```

Copy to Clipboard

查看元素内容节点的 HTML 标记。

**备注：** 返回的 HTML 或者 XML 片段是基于当前元素的内容生成的，所以返回的标记和格式可能与原始页面的标记不匹配。

### [替换元素的内容](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML#替换元素的内容)

设置 `innerHTML` 的值可以让你轻松地将当前元素的内容替换为新的内容。

举个例子来说，你可以通过文档 [`body`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/body) 属性删除 body 的全部内容。

```
document.body.innerHTML = "";
```

Copy to Clipboard

下面这个例子，首先获取文档当前的 HTML 标记并替换 `"<"` 字符为 HTML 实体 `"<"`，从本质上来看，它是将 HTML 转换成原始文本，将其包裹在 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/pre) 元素中。然后 `innerHTML` 的值被替换成新的字符串。最后，文档的内容被替换为页面显示源码。

```
document.documentElement.innerHTML = "<pre>" +
         document.documentElement.innerHTML.replace(/</g,"&lt;") +
            "</pre>";
```

Copy to Clipboard

#### 其他：

当给 `innerHTML` 设置一个值的时候到底发生了什么？用户代理按照以下步骤：

1. 给定的值被解析为 HTML 或者 XML（取决于文档类型），结果就是 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment) 对象代表元素新设置的 DOM 节点。
2. 如果元素内容被替换成 [` 元素，`<template>` 元素的 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTemplateElement/content) 属性会被替换为步骤 1 中创建的新的 `DocumentFragment`。
3. 对于其他所有元素，元素的内容都被替换为新的 `DocumentFragment` 节点。

### [安全问题](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML#安全问题)

用 `innerHTML` 插入文本到网页中并不罕见。但这有可能成为网站攻击的媒介，从而产生潜在的安全风险问题。

```
const name = "John";
// assuming 'el' is an HTML DOM element
el.innerHTML = name; // harmless in this case

// ...

name = "<script>alert('I am John in an annoying alert!')</script>";
el.innerHTML = name; // harmless in this case
```

Copy to Clipboard

尽管这看上去像 [cross-site scripting](https://zh.wikipedia.org/wiki/cross-site_scripting) 攻击，结果并不会导致什么。HTML 5 中指定不执行由 `innerHTML` 插入的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) 标签。

然而，有很多不依赖 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) 标签去执行 JavaScript 的方式。所以当你使用`innerHTML` 去设置你无法控制的字符串时，这仍然是一个安全问题。例如：

```
const name = "<img src='x' onerror='alert(1)'>";
el.innerHTML = name; // shows the alert
```

Copy to Clipboard

基于这个原因，当插入纯文本时，建议不要使用 `innerHTML` 。取而代之的是使用 [`Node.textContent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent) ，它不会把给定的内容解析为 HTML，它仅仅是将原始文本插入给定的位置。