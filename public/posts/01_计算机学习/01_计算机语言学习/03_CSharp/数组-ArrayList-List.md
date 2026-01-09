---
title: C#中数组、ArrayList和List三者的区别
date: 2023-5-19 00:00:00
update: 2023-7-24 00:00:00
categories:
  - [Csharp, Csharp提升]
tags: [Csharp, Csharp提升, 数组, 动态列表, 列表, ArrayList, List]
description: 此文章主要讲解，C#中数组、ArrayList和List三者的区别
---

# 前言

此文章主要讲解，C#中数组、ArrayList 和 List 三者的区别。

>

# 数组

在这三者之中，数组最早出现的。数组在**内存中是连续存储的**，所以它的索引速度非常快，而且赋值与修改元素也很简单。

创建数组的方法如下：

```c#
//数组
string[] str = new string[10];
int[] number = {0, 1, 2, 3, 4, 5}
```

但是数组存在一些不足的地方。数组在声明的时候，必须指定数组的长度，数组创建后在增加长度是十分困难的。并且，在数组的两个数据间插入数据也是很麻烦的。

数组的长度过长，会造成内存浪费；数组的长度过短，无法添加更多的数据

如果在声明数组时我们不清楚数组的长度，就会变得很麻烦。

# ArrayList（动态列表）

动态列表的使用，请参考[C#高级语法 | 🪐 星空鸟 🪐 (yuilexi.cn)](https://blog.yuilexi.cn/2023/04/30/Programming/Csharp知识库/Csharp基础/Csharp高级语法/#动态数组（ArrayList）)

`ArrayList`是属于命名空间`System.Collections`下，在使用该类时必须进行引用，同时继承了`IList`的接口，提供了数据存储和检索。

`ArrayList`对象的大小是按照其中存储的数据来动态扩充与收缩的。所以，在声明`ArrayList`对象时并不需要指定它的长度。

例如：

```c#
//ArrayList
ArrayList list = new ArrayList();

//新增数据
list1.Add("Hello world!");
list1.Add(1314);

//修改数据
list[2] = 1000;

//移除数据
list.Remove("Hello world!");

//插入数据
list.Insert(0, "Hello");
```

在`ArrayList`中，可以插入不同类型的数据。因为`ArrayList`会把所有插入其中的数据，装箱为`Object`类型来处理，在我们使用`ArrayList`处理数据时，很可能会报类型不匹配的错误，也就是`ArrayList`不是类型安全的，因此，为了正确使用数据，我们还需要进行拆箱操作。在存储或检索值类型时通常发生装箱和取消装箱操作，带来很大的性能耗损。

# 泛型 List

因为 `ArrayList` 存在不安全类型与装箱拆箱的缺点，所以出现了泛型的概念。`List` 类是 `ArrayList` 类的**泛型等效类**，它的大部分用法都与 `ArrayList` 相似，因为 `List` 类也继承了 `IList` 接口。最关键的区别在于，在声明 `List` 集合时，我们同时需要为其声明 `List` 集合内数据的对象类型。

```c#
List<int> list = new List<int>();

//新增数据
list.Add(4);
list.Add(7);

//修改数据
list[1] = 6;

//移除数据
list.RemoveAt(0);
```

# 总结

1. 数组：

- 数组是一种含有相同类型元素的集合，长度固定且不可更改。
- 数组直接存储在内存中，可以快速访问。
- 数组的元素可以通过索引访问，索引从 0 开始。
- 数组可以是多维的，例如二维数组，三维数组等。

2. ArrayList：

- ArrayList 是 C#中的一个类，可以用来存储任意类型的元素。
- ArrayList 的长度是可变的，可以动态地添加、删除或修改元素。
- **ArrayList 不直接存储在内存中，而是存储对元素的引用，因此访问元素比数组慢**。
- ArrayList 的元素可以通过索引访问。

3. List：

- List 是 C#中的一个泛型类，与 ArrayList 类似，也可以存储任意类型的元素。
- List 的长度是可变的，可以动态地添加、删除或修改元素。
- List 与 ArrayList 不同的是，List 直接存储在内存中，可以快速访问元素。
- List 的元素可以通过索引访问。

综上所述，数组、`ArrayList` 和 `List` 都有自己的优缺点和适用场景，具体使用时需要根据实际情况来选择。

# 说明

## 更新日志

{% folding 更新日志 %}

{% timeline 更新日志,orange %}

<!-- timeline 2023-5-30 -->

1. 更新文档中的 List 部分

<!-- endtimeline -->

<!-- timeline 2023-5-19 -->

1. 创建文档

<!-- endtimeline -->

{% endtimeline %}

{% endfolding %}
