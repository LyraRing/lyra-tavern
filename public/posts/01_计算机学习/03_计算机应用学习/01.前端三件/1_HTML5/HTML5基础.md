---
title: HTML5基础
date: 2023-5-31 00:00:00
update: 2023-7-24 00:00:00
categories:
  - [前端, HTML5]
tags: [HTML5, 前端, 网页]
description: HTML5基础，包含HTML5的基本结构，标签，属性，以及一些常用的标签和属性的使用方法。
mathjax:
katex:
img_path: 前端/HTML5/HTML基础/
---

# 前言

此文章主要是介绍 HTML5 基础，包含 HTML5 的基本结构，标签，属性，以及一些常用的标签和属性的使用方法。

> 快速到达

# 第一章 HTML 基础

## 1.1 HTML 的基本概念

www（world wide web，万维网）是一种建立在 Internet 上的、全球性的、交互的、多平台的、分布式的信息资源网络。

WWW 有 3 个基本的组成部分，分别是：

- URL：统一资源定位器，也就是我们常说的网址
- HTTP：超文本传输协议
- HTML：标记语言

## 1.2 HTML 发展史与 HTML5

## 1.6 HTML 的基本结构

### 1.6.1 HTML 文件的编写方法

1. HTML 标签

   一个 HTML 文件是由一系列的元素和标签组成。元素是 HTML 文件的重要组成部分，**元素名不区分大小写**。HTML 用标签来规定元素的属性和它在文件中的位置。

   HTML 的标签分**单独出现的标签**和**成对出现的标签**两种。

   ```html
   <标签名称>要控制的元素</标签名称>
   ```

   > 在每个 HTML 标签，大写、小写和混写均可。

   在每个 HTML 标签中，还可以设置一些属性，控制 HTML 标签所建立的元素。这些属性将位于所建立元素的首标签，因此，首标签的基本语法如下：

   ```html
   <标签名称 属性1="值1" 属性2="值2" >要控制的元素</标签名称>
   ```

2. 元素的概念

   一组标签，再加上标签包含的内容，被称之为一个元素。

3. HTML 文件结构

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <title>Document</title>
     </head>

     <body></body>
   </html>
   ```

### 1.6.2 文件开始标签` <html>`

```html
<html>
  文件的全部内容
</html>
```

# 第二章 HTML 文件基本标记

## 2.1 HTML 头部标记

在 HTML 语言的头元素中，一般要包括标题、基地信息、元信息等。基本语法如下：

```Python
<head>
	.....
</head>
```

一般情况下，CSS 和 JavaScript 都定义在头元素中的，而**定义在 HTML 语言头部文件的内容往往不会在网页上直接显示**。

|     标记     |                               描述                               |
| :----------: | :--------------------------------------------------------------: |
|   `<base>`   |                 当前文档的 URL 全称（基地网址）                  |
| `<basefont>` |                  设定基准的文字字体、字号和颜色                  |
|  `<title>`   |                 设定显示在浏览器左上方的标题内容                 |
| `<isindex>`  |        表明该文档是一个可用于检索的网关脚本，由服务器建立        |
|   `<meta>`   | 有关文档本身的元信息。例如：用于查询的关键字、该文档的有效日期等 |
|  `<style>`   |                    设定 CSS 层叠样式表的内容                     |
|   `<link>`   |                        设定外部文件的连接                        |
|  `<script>`  |                      设定页面程序脚本的内容                      |

## 2.2 标题标签 `<title>`

HTML 文件的标题信息会显示在浏览器的标题栏，用以说明文件的用途。每个 HTML 文件都应该有标题，在 HTML 文档中，标题文字位于 `<title>`和 `</title>` 之间，并且 `<title>` 标签位于文档的头部。

实例代码：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>我是标题君</title>
  </head>
  <body>
    我是网页主体
  </body>
</html>
```

## 2.3 元信息标签 `<meta>`

​ meta 元素提供的信息是用户不可见的，它不显示在页面中，**一般用于定义页面信息的名称、关键字、作者等**。在 HTML 中， meta 标签不需要设置结束标签，一个尖括号就是一个 meta 内容 ，并且一个 HTML 头部可以有多个 meta 标签。

1. 页面关键字

   ​ 设置页面关键字是为了向搜索引擎说明这一网页的关键字，从而帮助搜索引擎对该网页进行查找和分类，可以提高被搜索到的概率。**一般可以设置不止一个关键字，之间用逗号隔开，但是不要设置太多**。

   ​ 语法：

   ```html
   <meta name="keyword" content="具体的关键字，用逗号隔开" />
   ```

   ​ 语法解释：

   ​ 在该语法中， name 为属性名称，这里是 keyword ，也就是说设置网页的关键字属性，而在 content 中，则定义了具体的关键字。

   ​ 实例代码：

   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
     <head>
       <meta name="keyword" content="html,元信息,关键字" />
       <title>元信息标签</title>
     </head>
     <body>
       我是内容
     </body>
   </html>
   ```

   ​

2. 页面描述

   ​ 设置页面描述也是为了便于搜索引擎的查找，它用来描述网页的主题等。

   ​ 语法：

   ```html
   <meta name="description" content="对页面的具体描述" />
   ```

   ​ 语法解释：

   ​ 在该语法中， name 为属性名称，这里是 description ，也就是说将元信息属性设置为页面描述，而在 content 中，则定义了具体的描述内容。

   ​ 实例代码：

   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
     <head>
       <meta name="keyneme" content="html,元信息,关键字" />
       <meta name="description" content="这是一个关于元信息的网页" />
       <title>元信息标签</title>
     </head>
     <body>
       我是内容
     </body>
   </html>
   ```

   ​

3. 设置编辑器

   ​ 语法：

   ```html
   <meta name="generator" content="编辑软件的名称" />
   ```

   ​ 语法解释：

   ​ 在该语法中， name 为属性名称，这里是 generator ，也就是说将元信息属性设置为编辑器信息，而在 content 中，则定义了具体的编辑器。

   ​ 实例代码：

   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
     <head>
       <meta name="keyneme" content="html,元信息,关键字" />
       <meta name="description" content="这是一个关于元信息的网页" />
       <meta name="generator" content="vscode" />
       <title>元信息标签</title>
     </head>
     <body>
       我是内容
     </body>
   </html>
   ```

   ​

4. 设置作者信息

   ​ 语法：

   ```html
   <meta name="author" content="作者" />
   ```

   ​ 语法解释：

   ​ 在该语法中， name 为属性名称，这里是 author ，也就是说将元信息属性设置为作者信息，而在 content 中，则定义了具体的作者名字。

   ​ 实例代码：

   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
     <head>
       <meta name="keyneme" content="html,元信息,关键字" />
       <meta name="description" content="这是一个关于元信息的网页" />
       <meta name="generator" content="vscode" />
       <meta name="author" content="YuiLexi" />
       <title>元信息标签</title>
     </head>
     <body>
       我是内容
     </body>
   </html>
   ```

   ​

5. 限制搜索方式

   ​ 语法：

   ```html
   <meta name="robots" content="搜索方式" />
   ```

| 搜索方式 |                描述                |
| :------: | :--------------------------------: |
|   All    |  表示能搜到当前网页及其链接的网页  |
|  Index   |         表示能搜到当前网页         |
| Nofollow |  表示不能搜到与当前网页链接的网页  |
| Noindex  |        表示不能搜到当前网页        |
|   None   | 表示不能搜到当前网页及其链接的网页 |

# 说明

## 更新日志

{% folding 更新日志 %}

{% timeline 更新日志,orange %}

<!-- timeline 2023-5-31 -->

<!-- endtimeline -->

{% endtimeline %}

{% endfolding %}
