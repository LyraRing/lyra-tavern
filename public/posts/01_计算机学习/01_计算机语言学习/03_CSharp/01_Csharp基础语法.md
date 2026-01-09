---
title: C#基础语法
date: 2023-4-26 00:00:00
description: C#基础语法，涵盖了注释、变量类型、基础数据类型、运算符、流程控制语句、复杂数据类型、方法、面向对象程序设计

categories:
  - ["C#", "C#基础"]
  - ["Unity3D", "Unity3D基础"]
  - ["Godot"]
tags: [计算机学习, C#, 程序设计, .NET, Unity, 游戏开发]
collection: "C#"
order: 1
---

# 前言

> 此文章是 C#基础语法部分，涵盖了注释、变量类型、基础数据类型、运算符、流程控制语句、复杂数据类型、方法、面向对象程序设计等内容。
>
> C#系列教程：
>

# 一、认识 C#

## 1.1 什么是 .NET？

.NET 是由 Microsoft 创建的开源开发人员平台，用于生成许多不同类型的应用程序。使用 .NET，可以使用多种语言、编辑器和库来构建 Web、移动、桌面、游戏和 IoT 等。[.NET 文档 | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/)。

- 编程语言

  可以使用 C#、F# 或 Visual Basic 编写 .NET 应用。[了解.NET 编程语言](https://dotnet.microsoft.com/zh-cn/languages)。

  - C# 是一种简单、现代、面向对象和类型安全的编程语言。
  - F# 是一种编程语言，利用它可轻松编写简洁、可靠且性能出色的代码。

  - Visual Basic 是一种易于使用的语言，简单语法便于生成类型安全、面向对象的应用。

- 跨平台

  无论是使用 C#、F# 还是 Visual Basic，代码都会在任何兼容的操作系统上本机运行。可以使用 .NET 生成多种类型的应用。有些是跨平台的，有些则针对特定的一组操作系统和设备。

- 一致的 API

  .NET 提供一组标准的基类库和 API，这些库和 API 对所有 .NET 应用程序都是通用的。每个应用模型还可以公开特定于其运行的操作系统或它提供的功能的其他 API。例如，ASP.NET 是跨平台 Web 框架，它提供用于生成在 Linux 或 Windows 上运行的 Web 应用的其他 API。

- 库

  为了扩展功能，Microsoft 和其他公司维护着一个正常的 .NET 软件包生态系统。[NuGet](https://nuget.org/)是专为包含了 100,000 多个包的 .NET 构建的包管理器。

- 应用程序模型

  可以使用 .NET 生成多种类型的应用。为了帮助你更快地生成应用，应用模型基于基础库构建。

|   Web    | 为 Windows、Linux、macOS、Docker 构建 Web 应用和服务。                          |
| :------: | ------------------------------------------------------------------------------- |
|   手机   | 使用单一代码库生成适用于 iOS、Android 和 Windows 等的本机移动应用。             |
|   桌面   | 创建适用于 Windows 和 macOS 的本机应用，或使用 Web 技术生成随时随地运行的应用。 |
|  微服务  | 创建可在 Docker 容器上运行的可独立部署的微服务。                                |
|    云    | 使用现有云服务，或创建和部署自己的云服务。                                      |
| 机器学习 | 为应用添加视觉算法、语音处理、预测模型等。                                      |
| 游戏开发 | 为最热门的台式机、手机和控制台开发 2D 和 3D 游戏。                              |
|  物联网  | 使用 Raspberry Pi 和其他单板计算机的本机支持创建 IoT 应用。                     |

## 1.2 什么是 C#？

一种编程语言，可以开发基于.NET 平台的应用。

## 1.3 .NET 两种交互模式

- C/S：客户端（Client）/服务器（Server） 模式（需安装客户端软件）
- B/S：浏览器（Browser）/服务器 模式（只需要浏览器）

## 1.4 开发工具

- [Visual Studio](https://visualstudio.microsoft.com/)

# 二、C#语法基础

## 2.1 C#程序一般结构

```C#
using System; //调用命名空间

//项目开始的地方
Console.WriteLine("Hello world!");
//构造命名空间，作用：区别相同名称但是作用不同的类
namespace YourNamespace
{
    //构造类
    class YourClass
    {
        //字段
        //属性
        //构造方法
        //方法或函数
        //析构函数
    }
    //定义结构体变量
    struct YourStruct
    {
    }
    //定义接口
    interface IYourInterface
    {
    }
    //定义委托类型
    delegate int YourDelegate();
    //枚举类型变量
    enum YourEnum
    {
    }
    //子命名空间
    namespace YourNestedNamespace
    {
        struct YourStruct
        {
        }
    }
}
```

1. 代码中出现的所有标点都是英文半角；
2. 在 C# 代码中，每行代码的结束，都以**分号**结束。

## 2.2 注释

1.  单行注释

    一般放在**代码语句**的后面，或者放在**代码块**的前面。基本语法如下：

    ```C#
    int a;//定义变量a

    //定义变量 b，c
    int b;
    int c;
    ```

2.  多行注释

    基本语法如下：

    ```C#
    /*
    Console.WriteLine();
    Console.ReadKey();
    */
    ```

3.  文本注释

    多用来解释类或方法的功能及参数。基本语法如下：

    ```C#
    ///text
    ```

## 2.3 基本数据类型

在 C# 中，变量分为以下几种类型：

- 值类型
- 引用类型
- 指针类型

### 2.3.1 值类型

它们是从类 `System.ValueType` 中派生的。值类型变量可以直接分配给一个值，即当前变量所在地址里的数据就是当前变量的值。值类型直接包含数据。

| 关键字  | 描述                                 | 范围                                                    | 默认值 |
| :-----: | ------------------------------------ | ------------------------------------------------------- | :----: |
|  sbyte  | 8 位有符号整数类型                   | -128 到 127                                             |   0    |
|  short  | 16 位有符号整数类型                  | -32,768 到 32,767                                       |   0    |
| **int** | 32 位有符号整数类型                  | -2,147,483,648 到 2,147,483,647                         |   0    |
|  long   | 64 位有符号整数类型                  | -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807 |   0L   |
|  byte   | 8 位无符号整数                       | 0 到 255                                                |   0    |
| ushort  | 16 位无符号整数类型                  | 0 到 65,535                                             |   0    |
|  uint   | 32 位无符号整数类型                  | 0 到 4,294,967,295                                      |   0    |
|  ulong  | 64 位无符号整数类型                  | 0 到 18,446,744,073,709,551,615                         |   0    |
|  float  | 32 位单精度浮点型                    | -3.4 x 1038 到 + 3.4 x 1038                             |  0.0F  |
| double  | 64 位双精度浮点型                    | (+/-)5.0 x 10-324 到 (+/-)1.7 x 10308                   |  0.0D  |
| decimal | 128 位精确的十进制值，28-29 有效位数 | (-7.9 x 1028 到 7.9 x 1028) / 100 到 28                 |  0.0M  |
|  char   | 16 位 Unicode 字符                   | U +0000 到 U +ffff                                      |  '\0'  |
|  bool   | 布尔值                               | true 或 false                                           | False  |

> 字符不可为空，字符只能存一个字符。

如需得到一个类型或一个变量在特定平台上的准确字节大小，可以使用 `sizeof()` 方法。下面举例获取任何机器上 `int` 类型的字节大小：

```C#
using System;
namespace DataTypeApplication
{
   class Program
   {
      static void Main(string[] args)
      {
         Console.WriteLine(sizeof(int));//
         Console.ReadLine();
      }
   }
}
```

值类型还包括[枚举](#4-3-枚举)和结构体。

### 2.3.1 引用类型

引用类型变量不包含存储在变量中的实际数据，但它们包含对变量的引用（地址）。换句话说，**它们实际存储的是一个地址（栈区）**，并指向变量的实际值所在的内存空间（堆区）。内置的引用类型有：`object`、`dynamic`和`string`。

- 对象（Object）类型

  **对象**：是所有数据类型的终极基类。Object 是 System.Object 类的别名。所以对象（Object）类型可以被分配任何其他类型（值类型、引用类型、预定义类型或用户自定义类型）的值。但是，在分配值之前，需要先进行类型转换。

  - 当一个值类型转换为对象类型时，则被称为**装箱**；
  - 当一个对象类型转换为值类型时，则被称为**拆箱**。

- 动态（Dynamic）类型

  任何类型的值可以存储在动态数据类型变量中。这些变量的类型检查是在运行时发生的。声明动态类型的语法：

  ```C#
  //dynamic <variable_name> = value;

  dynamic d = 20;
  ```

- 字符串（String）类型

  **字符串（String）类型**：允许您给变量分配任何字符串值。字符串（String）类型是 System.String 类的别名。它是从对象（Object）类型派生的。

### 2.3.3 指针类型

指针类型变量存储另一种类型的内存地址。C# 中的指针与 C 或 C++ 中的指针有相同的功能。声明指针类型的语法：

```C#
type* name;
//例如：
char* cp;
int* ip;
```

> 指针具体的使用，请参照[不安全代码]()

### 2.3.4 数据类型的转换

数据类型的转换有两种：**隐式类型转换**和**显式类型转换**。前者是自动进行，而后者是强制进行。

- 隐式类型转换

  需要满足的条件是：两种兼容类型；目标类型等级高于源类型。例如：int 和 double 兼容（都是数字类型），而 double > int 。

- 显式类型转换

  - 兼容类型

    高阶转换成低阶，可能会造成数据丢失。例如：

    ```C#
    double num = 521.1314;
    int num_1;
    num_1 = (int)num;	//此时 num_1 的值为 521
    ```

    > 注意：浮点型向整型转换时，会直接**舍弃**小数部分

  - 不兼容类型/Convert 类型转换

    ```C#
    string str = "1234";
    double num;
    num = Convert.ToDouble(str);
    ```

    > 转换的内容必须合理，比如 `14A` 中的 `A`不能转换成数字。

- `Convert`类型转换对应的所有方法如下：

|   方法名   | 描述                                                            |
| :--------: | :-------------------------------------------------------------- |
| ToBoolean  | 如果可能的话，把类型转换为布尔型。                              |
|   ToByte   | 如果可能的话，把类型转换为字节类型。                            |
|   ToChar   | 如果可能的话，把类型转换为单个 Unicode 字符类型。               |
| ToDateTime | 如果可能的话，把类型（整数或字符串类型）转换为 日期-时间 结构。 |
| ToDecimal  | 如果可能的话，把浮点型或整数类型转换为十进制类型。              |
|  ToDouble  | 如果可能的话，把类型转换为双精度浮点型。                        |
|  ToInt16   | 如果可能的话，把类型转换为 16 位整数类型。                      |
|  ToInt32   | 如果可能的话，把类型转换为 32 位整数类型。                      |
|  ToInt64   | 如果可能的话，把类型转换为 64 位整数类型。                      |
|  ToSbyte   | 如果可能的话，把类型转换为有符号字节类型。                      |
|  ToSingle  | 如果可能的话，把类型转换为小浮点数类型。                        |
|  ToString  | 如果可能的话，把类型转换为字符串类型。                          |
|   ToType   | 如果可能的话，把类型转换为指定类型。                            |
|  ToUInt16  | 如果可能的话，把类型转换为 16 位无符号整数类型。                |
|  ToUInt32  | 如果可能的话，把类型转换为 32 位无符号整数类型。                |
|  ToUInt64  | 如果可能的话，把类型转换为 64 位无符号整数类型。                |

## 2.4 运算符

运算符是一种告诉编译器执行特定的数学或逻辑操作的符号。分类如下：

- 算术运算符
- 关系运算符
- 逻辑运算符
- 位运算符
- 赋值运算符
- 其他运算符

### 2.4.1 算数运算符

| 加  | 减  | 乘  | 除  | 取余 | 自增 | 自减 |
| :-: | :-: | :-: | :-: | :--: | :--: | :--: |
|  +  |  -  | \*  |  /  |  %   |  ++  |  --  |

自增和自减有两种，前置和后置。分别对应如下：

```C#
int i;
i++;
++i;
```

二者的区别是：

- `++i`：表示取`i`的地址，增加它的内容，然后把值放在寄存器中（**先加后用**）
- `i++`：表示取`i`的地址，把它的值装入寄存器，然后增加内存中的 a 的值（**先用后加**）

**而前置自增 (`++i`) 通常要比后置自增 (`i++`) 效率更高**。理由如下：

```C#
//前置++
Age& operator++()
{
    ++i
    return *this;
}

//后置++
const Age operator++(int)
{
    Age tmp = *this;
    ++(*this);  //利用前置++
    return tmp;
}
```

- 前置直接对源数据进行加 1 操作；而后置需要先创建一个临时变量，源数据保存一个副本后，再加 1
- 时间上来看：后置的语句更多，占用的时间更多
- 空间上来看：后置需要创建临时变量（用完释放），因此占用的内存更多

### 2.4.2 关系运算符

下表显示了 C# 支持的所有关系运算符。假设变量 **A** 的值为 10，变量 **B** 的值为 20，则：

| 运算符 | 描述                                                           |       实例        |
| :----: | :------------------------------------------------------------- | :---------------: |
|   ==   | 检查两个操作数的值是否相等，如果相等则条件为真。               | (A == B) 不为真。 |
|   !=   | 检查两个操作数的值是否相等，如果不相等则条件为真。             |  (A != B) 为真。  |
|   >    | 检查左操作数的值是否大于右操作数的值，如果是则条件为真。       | (A > B) 不为真。  |
|   <    | 检查左操作数的值是否小于右操作数的值，如果是则条件为真。       |  (A < B) 为真。   |
|   >=   | 检查左操作数的值是否大于或等于右操作数的值，如果是则条件为真。 | (A >= B) 不为真。 |
|   <=   | 检查左操作数的值是否小于或等于右操作数的值，如果是则条件为真。 |  (A <= B) 为真。  |

### 2.4.3 逻辑运算符

下表显示了 C# 支持的所有逻辑运算符。假设变量 A 为布尔值 true，变量 B 为布尔值 false，则：

|    运算符    | 描述                                                                               |           实例           |
| :----------: | :--------------------------------------------------------------------------------- | :----------------------: |
|      &&      | 称为逻辑与运算符。如果两个操作数都非零，则条件为真。                               |     (A && B) 为假。      |
| &#124;&#124; | 称为逻辑或运算符。如果两个操作数中有任意一个非零，则条件为真。                     | (A&#124;&#124; B) 为真。 |
|      !       | 称为逻辑非运算符。用来逆转操作数的逻辑状态。如果条件为真则逻辑非运算符将使其为假。 |     !(A && B) 为真。     |

### 2.4.4 位运算符

位逻辑运算符作用于位，并逐位执行操作。&、 | 和 ^ 的真值表如下所示：

|  p  |  q  | p & q | p&#124; q | p ^ q |
| :-: | :-: | :---: | :-------: | :---: |
|  0  |  0  |   0   |     0     |   0   |
|  0  |  1  |   0   |     1     |   1   |
|  1  |  1  |   1   |     1     |   0   |
|  1  |  0  |   0   |     1     |   1   |

以及位操作符：

| 运算符 | 描述                                                                                     | 实例                                                               |
| :----: | :--------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
|   &    | 如果同时存在于两个操作数中，二进制 AND 运算符复制一位到结果中。                          | (A & B) 将得到 12，即为 0000 1100                                  |
| &#124; | 如果存在于任一操作数中，二进制 OR 运算符复制一位到结果中。                               | (A &#124;B) 将得到 61，即为 0011 1101                              |
|   ^    | 如果存在于其中一个操作数中但不同时存在于两个操作数中，二进制异或运算符复制一位到结果中。 | (A ^ B) 将得到 49，即为 0011 0001                                  |
|   ~    | 二进制补码运算符是一元运算符，具有"翻转"位效果。                                         | (~A ) 将得到 -61，即为 1100 0011，2 的补码形式，带符号的二进制数。 |
|   <<   | 二进制左移运算符。左操作数的值向左移动右操作数指定的位数。                               | A << 2 将得到 240，即为 1111 0000                                  |
|   >>   | 二进制右移运算符。左操作数的值向右移动右操作数指定的位数。                               | A >> 2 将得到 15，即为 0000 1111                                   |

### 2.4.5 赋值运算符

下表列出了 C# 支持的赋值运算符：

| 运算符  | 描述                                                             |              实例               |
| :-----: | :--------------------------------------------------------------- | :-----------------------------: |
|    =    | 简单的赋值运算符，把右边操作数的值赋给左边操作数                 | C = A + B 将把 A + B 的值赋给 C |
|   +=    | 加且赋值运算符，把右边操作数加上左边操作数的结果赋值给左边操作数 |     C += A 相当于 C = C + A     |
|   -=    | 减且赋值运算符，把左边操作数减去右边操作数的结果赋值给左边操作数 |     C -= A 相当于 C = C - A     |
|   \*=   | 乘且赋值运算符，把右边操作数乘以左边操作数的结果赋值给左边操作数 |     C _= A 相当于 C = C _ A     |
|   /=    | 除且赋值运算符，把左边操作数除以右边操作数的结果赋值给左边操作数 |     C /= A 相当于 C = C / A     |
|   %=    | 求模且赋值运算符，求两个操作数的模赋值给左边操作数               |     C %= A 相当于 C = C % A     |
|   <<=   | 左移且赋值运算符                                                 |    C <<= 2 等同于 C = C << 2    |
|   >>=   | 右移且赋值运算符                                                 |    C >>= 2 等同于 C = C >> 2    |
|   &=    | 按位与且赋值运算符                                               |     C &= 2 等同于 C = C & 2     |
|   ^=    | 按位异或且赋值运算符                                             |     C ^= 2 等同于 C = C ^ 2     |
| &#124;= | 按位或且赋值运算符                                               |  C&#124;= 2 等同于 C = C \| 2   |

### 2.4.6 其他运算符

下表列出了 C# 支持的其他一些重要的运算符：

|  运算符  | 描述                                   | 实例                                        |
| :------: | :------------------------------------- | :------------------------------------------ |
| sizeof() | 返回数据类型的大小。                   | sizeof(int)，将返回 4.                      |
| typeof() | 返回变量的类型。                       | typeof(StreamReader);                       |
|    &     | 返回变量的地址。                       | &a; 将得到变量的实际地址。                  |
|    \*    | 变量的指针。                           | \*a; 将指向一个变量。                       |
|   ? :    | 条件表达式                             | 如果条件为真 ? 则为 X : 否则为 Y            |
|    is    | 判断当前对象是否为 XXX 类型            | 返回 ture 或 false                          |
|    as    | 强制转换，即使转换失败也不会抛出异常。 | 转换成功，返回转换后的对象；反之，返回 NULL |

### 2.4.7 lambda 运算符

在 [lambda 表达式](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/lambda-expressions)中，lambda 运算符 `=>` 将左侧的输入参数与右侧的 lambda 主体分开。

使用 Lambda 表达式来创建匿名函数。 使用 [lambda 声明运算符`=>`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/lambda-operator) 从其主体中分离 lambda 参数列表。 Lambda 表达式可采用以下任意一种形式：

```c#
(input-parameters) => expression;
(input-parameters) => { <sequence-of-statements> };
```

若要创建 Lambda 表达式，需要在 Lambda 运算符左侧指定输入参数（如果有），然后在另一侧输入表达式或语句块。

```c#
Action<string> greet = (name) =>
{
    string greeting = $"Hello {name}!";
    Console.WriteLine(greeting);
};
greet("World");
// Output:
// Hello World!
```

## 2.5 特殊字符

### 2.5.1 转义字符

`\\` + `特殊字符` = `具有特殊意义的字符`。例如下表所示：

| 转义符 |  字符名  |
| :----: | :------: |
|  \\'   |  单引号  |
|  \\"   |  双引号  |
|  \\\   |  反斜杠  |
|  \\0   |  空字符  |
|  \\a   |  感叹号  |
|  \\b   |   退格   |
|  \\f   |   换页   |
|  \\n   |   新行   |
|  \\r   |   回车   |
|  \\t   | 水平 tab |
|  \\v   | 垂直 tab |

### 2.5.2 @ 符

1. 取消字符串中转义字符的转义作用。用在字符串前时，字符串里面的转义字符不转义。将字符串按照原格式输出。

### 2.5.3 + 符

- 当`+`两边至少有一边为字符串时，作用为拼接字符串的作用

  具体语法如下：

  ```C#
  string name = "AAAAA";
  int age = 18;
  string email = "XXXXX@xx.com";
  string address = "SSSSS";
  int salary = 10000;
  Console.WriteLine("我叫" + name + "，今年" + age + "岁了，邮箱是：" + email + ",住在" + address + ",每月的收入是" + salary + "日元");
  Console.ReadKey();
  ```

- 数字相加

  具体语法如下：

  ```C#
  int num_1 = 1;
  int num_2 = 4;
  int num_3 = num_1 + num_2;
  Console.WriteLine(num_3);
  ```

### 2.5.4 占位符

用在字符串内，增强代码的可读性。具体语法如下：

```C#
int a = 1;
int b = 2;
int c = 3;
Console.WriteLine("第一个数字是：" + a + "，第二个数字是：" + b + "，第三个数字是：" + c);
Console.WriteLine("第一个数字是：{0}，第二个数字是：{1}，第三个数字是：{2}",a,b,c);
```

使用注意：

- 挖几个坑，就要填几个坑。如果多填，不报错但没效果；如果少填，就会异常（语法没错误，只不过在程序运行期间，由于某些原因出现问题，使程序不在正常的运行）
- 输出顺序{0}，{1}，{2}... 对应 a, b, c, ....

还可以使用 `$` 修饰字符串，然后使用占位符。例如下面的语法：

```c#
int a = 1;
int b = 2;
int c = 3;
Console.WriteLine($"第一个数字是：{a}，第二个数字是：{b}，第三个数字是：{c}");
```

> 推荐在项目中使用 `$` 作为占位符修饰字。

## 2.6 可空类型 💖💖💖

在 C# 中，值类型例如 int 的默认值是 0 ，同时也不能进 `a = null` 的赋值操作。一般情况下所有 `if( a != null)` 永远为真。

C# 提供了一个特殊的数据类型，`nullable` 类型（**可空类型**），可空类型可以表示其基础值类型正常范围内的值，再加上一个 null 值。

`?` 单问号用于对 `int、double、bool `等无法直接赋值为 `null` 的数据类型进行 `null` 的赋值

### 2.6.1 定义可空类型

语法如下：声明一个 `nullable` 类型（可空类型）的语法如下：

```C#
<data_type>? <variable_name> = null;

int? i = null;
```

### 2.6.2 null 合并运算符（ ?? ）

`null`合并运算符用于定义**可空类型**和**引用类型**的默认值。**null 合并运算符为类型转换定义了一个预设值，以防可空类型的值为 null**。下面的实例演示：

```C#
using System;
namespace CalculatorApplication
{
   class NullablesAtShow
   {
      static void Main(string[] args)
      {
          //定义可空类型
          double? num1 = null;
          double? num2 = 3.14157;
          double num3;
          //如果第一个操作数的值为 null，则运算符返回第二个操作数的值，否则返回第一个操作数的值
          num3 = num1 ?? 5.34;
          Console.WriteLine("num3 的值： {0}", num3);
          num3 = num2 ?? 5.34;
          Console.WriteLine("num3 的值： {0}", num3);
          Console.ReadLine();
      }
   }
}
```

如果左操作数的值不为 `null`，则 null 合并运算符 `??` 返回该值；否则，它会计算右操作数并返回其结果。 如果左操作数的计算结果为非 null，则 `??` 运算符不会计算其右操作数。

仅当左操作数的计算结果为 `null` 时，Null 合并赋值运算符 `??=` 才会将其右操作数的值赋值给其左操作数。 如果左操作数的计算结果为非 null，则 `??=` 运算符不会计算其右操作数。

### 2.6.3 `?.` 操作符

```c#
A?.print();
```

如果 `A` 不为 `null` ，则执行 `print()` 方法。

# 三、流程控制语句

## 3.1 选择结构

### 3.1.1 单 if 语句

具体语法如下：

```C#
if(逻辑表达式)
{
   /* 如果逻辑表达式为真将执行的语句 */
}
```

### 3.1.2 if/else 语句

具体语法如下：

```C#
if(boolean_expression)
{
   /* 如果布尔表达式为真将执行的语句 */
}
else
{
  /* 如果布尔表达式为假将执行的语句 */
}
```

### 3.1.3 switch 语句

具体语法如下：

```C#
switch(expression)
{
    case constant-expression:
       statement(s);
       break;
    case constant-expression:
       statement(s);
       break;

    /* 您可以有任意数量的 case 语句 */
    default : /* 默认执行（除了上面情况之外） */
       statement(s);
       break;
}
```

`switch`语句必须遵循下面的规则：

- `case` 的`constant-expression`必须与`switch`中的变量具有相同的数据类型，且必须是一个常量。
- 当遇到`break`语句时，`switch`终止，控制流将跳转到 `switch` 语句后的下一行。
- C# 不允许从一个开关部分继续执行到下一个开关部分。如果 `case` 语句中有处理语句，则必须包含`break`或其他跳转语句。

### 3.1.4 三目运算符

具体语法如下：

```C#
逻辑表达式 ? Exp2 : Exp3
```

请注意，冒号的使用和位置。 `?` 表达式的值是由**逻辑表达式**决定的。

- 如果逻辑表达式为真，则计算 Exp2 的值，结果即为整个 ? 表达式的值
- 如果逻辑表达式为假，则计算 Exp3 的值，结果即为整个 ? 表达式的值

## 3.2 循环结构

### 3.2.1 while 语句

具体语法如下：

```C#
while(逻辑表达式/循环条件)
{
    循环体;
}
```

先进行判断，满足判断条件后再循环。

### 3.2.2 do-while 语句

具体语法如下：

```C#
do
{
    循环体;
}while(逻辑表达式/循环条件);
```

先进行循环，然后判断是否继续循环。

### 3.2.3 for 语句

具体语法如下：

```C#
for(表达式1;表达式2;表达式3)
{
    循环体;
}
//表达式1一般为声明循环变量
//循环条件
//改变循环条件
```

### 3.2.4 循环控制语句

1. `break`：跳出当前循环，如果有循环的嵌套，那么只会跳出**一层**循环
2. `continue`：立即结束**本次**循环，然后判断循环条件，如果成立，则进入下一次循环，否则退出循环

# 四、复杂数据类型

## 4.1 字符串

字符串是引用类型。在 C# 中，您可以使用**字符数组**来表示字符串。但是，更常见的做法是使用 `string` 关键字来声明一个字符串变量。

### 4.1.1 创建 String 对象

您可以使用以下方法之一来创建 string 对象：

- 通过给 `String` 变量指定一个字符串
- 通过使用 `String` 类构造函数
- 通过使用字符串串联运算符（ + ）
- 通过检索属性或调用一个返回字符串的方法
- 通过**格式化方法**来转换一个值或对象为它的字符串表示形式

具体代码如下：

```C#
using System;
namespace StringApplication
{
    class Program
    {
        static void Main(string[] args)
        {
           //字符串，字符串连接
            string fname, lname;
            fname = "Rowan";
            lname = "Atkinson";
            string fullname = fname + lname;
            Console.WriteLine("Full Name: {0}", fullname);

            //通过使用 string 构造函数
            string greetings = new string("Hello world!");
            Console.WriteLine("Greetings: {0}", greetings);

            //方法返回字符串
            string[] sarray = { "Hello", "From", "Tutorials", "Point" };
            string message = String.Join(" ", sarray);
            Console.WriteLine("Message: {0}", message);

            //用于转化值的格式化方法
            DateTime waiting = new DateTime(2012, 10, 10, 17, 58, 1);
            string chat = String.Format("Message sent at {0:t} on {0:D}",
            waiting);
            Console.WriteLine("Message: {0}", chat);
            Console.ReadKey() ;
        }
    }
}
```

### 4.1.2 String 类的属性

`String` 类有以下两个常用属性：

| 属性名称 | 描述                                               |
| :------: | :------------------------------------------------- |
|  Chars   | 在当前 _String_ 对象中获取 _Char_ 对象的指定位置。 |
|  Length  | 在当前的 _String_ 对象中获取字符数。               |

### 4.1.3 String 类的方法

具体可以参考：[C# 字符串（String） | 菜鸟教程 (runoob.com)](https://www.runoob.com/csharp/csharp-string.html)。

## 4.2 数组

数组是一个引用类型。数组是一个存储相同类型元素的固定大小的顺序集合。数组是用来存储数据的集合，通常认为数组是一个同一类型变量的集合。

### 4.2.1 声明数组

在 C# 中声明一个数组，您可以使用下面的语法：

```C#
datatype[] arrayName;
//例如：
int[] id;
```

其中：

- `datatype`用于指定被存储在数组中的元素的类型
- `[ ]`指定数组的秩（维度）。秩指定数组的大小
- `arrayName` 指定数组的名称

### 4.2.2 初始化数组

声明一个数组不会在内存中初始化数组。当初始化数组变量时，您可以赋值给数组。数组是一个引用类型，所以您需要使用 **new** 关键字来创建数组的实例。

例如：

```C#
double[] balance = new double[10];
```

### 4.2.3 赋值给数组

您可以通过使用索引号赋值给一个单独的数组元素，比如：

```C#
double[] balance = new double[10];
balance[0] = 4500.0;
```

您可以在声明数组的同时给数组赋值，比如：

```C#
double[] balance = { 2340.0, 4523.69, 3421.0};
```

您也可以创建并初始化一个数组，比如：

```C#
int [] marks = new int[5]  { 99,  98, 92, 97, 95};
```

在上述情况下，你也可以省略数组的大小，比如：

```C#
int [] marks = new int[]  { 99,  98, 92, 97, 95};
```

您也可以赋值一个数组变量到另一个目标数组变量中。在这种情况下，目标和源会指向相同的内存位置：

```C#
int [] marks = new int[]  { 99,  98, 92, 97, 95};
int[] score = marks;
```

当您创建一个数组时，C# 编译器会根据数组类型隐式初始化每个数组元素为一个默认值。例如，int 数组的所有元素都会被初始化为 0。

### 4.2.4 访问数组元素

元素是通过带索引的数组名称来访问的。这是通过把元素的索引放置在数组名称后的方括号中来实现的。例如：

```C#
double salary = balance[9];
```

## 4.3 枚举

枚举是值类型。enum：枚举的关键字，声明枚举的关键字。具体语法如下：

```C#
//声明
[public] enum 枚举名
{
    值1,
    值2,
    值3,
    ...
}
enum Gender
{
    男,
    女
}
//调用
Gender gender = Gender.男;
```

## 4.4 结构体

在 C# 中，结构体是**值类型**数据结构。它使得一个单一变量可以存储各种数据类型的相关数据。`struct`关键字用于创建结构体。结构体是用来代表一个记录。

### 4.4.1 构造结构体

具体语法如下：

```C#
[public] struct 结构名
{
    public 成员;
}
```

### 4.4.2 C# 结构的特点

在 C# 中的结构与传统的 C 或 C++ 中的结构不同。C# 中的结构有以下特点：

- 结构可带有方法、字段、索引、属性、运算符方法和事件。
- 结构可定义构造函数，但不能定义析构函数。但是，您不能为结构定义无参构造函数。无参构造函数(默认)是自动定义的，且不能被改变。
- 与类不同，结构不能继承其他的结构或类。
- 结构不能作为其他结构或类的基础结构。
- 结构可实现一个或多个接口。
- 结构成员不能指定为 abstract、virtual 或 protected。
- 当您使用 **New** 操作符创建一个结构对象时，会调用适当的构造函数来创建结构。与类不同，结构可以不使用 New 操作符即可被实例化。
- 如果不使用 New 操作符，只有在所有的字段都被初始化之后，字段才被赋值，对象才被使用。

# 五、函数/方法

一个方法是把一些相关的语句组织在一起，用来执行一个任务的语句块。每一个 C# 程序至少有一个带有 Main 方法的类。

## 5.1 定义方法

基本语法如下：

```C#
[访问修饰符] [static] 返回值类型 方法名([形式参数列表])
{
    方法体;
}
```

## 5.2 调用方法

基本语法如下：

```C#
类名.方法名([实际参数列表]);//当方法和主函数在同一类下，则不用添加类名
对象.方法名([实际参数列表]);
```

## 5.3 函数的递归

一个方法可以自我调用。这就是所谓的 **递归**。

> 应当在工程中，避免使用递归方法。因为递归方法

## 5.4 参数传递与 💗`高级参数`💗

|   方式   | 描述                                                                                                                                                             |
| :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  值参数  | 这种方式复制参数的实际值给函数的形式参数，实参和形参使用的是两个不同内存中的值。在这种情况下，当形参的值发生改变时，不会影响实参的值，从而保证了实参数据的安全。 |
| 引用参数 | 这种方式复制参数的内存位置的引用给形式参数。这意味着，当形参的值发生改变时，同时也改变实参的值。                                                                 |
| 输出参数 | 这种方式可以返回多个值。                                                                                                                                         |

### 5.4.1 按值传递参数

这是参数传递的默认方式。在这种方式下，当调用一个方法时，会为每个值参数创建一个新的存储位置。

实际参数的值会复制给形参，实参和形参使用的是两个不同内存中的值。所以，当形参的值发生改变时，不会影响实参的值，从而保证了实参数据的安全。

例如下面代码：

```C#
int Add10(int a)
{
    a = a+10;
    return a;
}
void main()
{
    int a,b,c;
    a = 10;
    b = Add10(a);
}
```

我们把实际参数 a 传入到函数 Add10(a) 中去，在该函数中，对形式参数 a 进行赋值计算，但是形参 a 改变没有影响实参 a ，它们两个使用不同的内存空间。

### 5.4.2 按引用传递参数——ref

引用参数是一个对变量的**内存位置的引用**。当按引用传递参数时，与值参数不同的是，它不会为这些参数创建一个新的存储位置。引用参数表示与提供给方法的实际参数具有相同的内存位置。在 C# 中，使用 `ref` 关键字声明引用参数。

在以下示例中，`p `和`x`指的是相同的存储器位置：

```C#
class Test {
    static void myMethod (ref int p) {
       p = p + 1;             // Increment p by 1
       Console.WriteLine (p); // Write p to screen
    }

    static void Main(){
        int x = 8;
        myMethod (ref x);      // Ask myMethod to deal directly with x
        Console.WriteLine (x); // x is now 9
     }
}
```

### 5.4.3 按输出传递参数——out

return 语句可用于只从函数中返回一个值。但是，可以使用 **输出参数** 来从函数中返回两个或多个值。输出参数会把方法输出的数据赋给自己，其他方面与引用参数相似。

out 参数就像一个`ref`参数，但是它:

- 在进入函数之前不需要赋值
- **必须在它出来的函数之前赋值**
- out 修饰符用于从方法获取多个返回值。

例如下面代码：

```C#
class Test
{
   static void ToWords (string name, out string firstNames, out string lastName)
   {
       //out参数要求在方法的内部必须为其赋值
       int i = name.LastIndexOf (" ");
       firstNames = name.Substring (0, i);
       lastName = name.Substring (i + 1);
   }
    static void Main()
    {
        string a, b;
        ToWords("this is a test", out a, out b);
        Console.WriteLine (a);
        Console.WriteLine (b);
    }
}
```

### 5.4.4 params 修饰符

将实参列表中跟可变参数数组类型一致的元素都当作数组的元素去处理。`params `参数修饰符用于方法的**最后一个参数**，以便该方法接受任意数量的特定类型的参数。

参数类型必须声明为数组。

例如下面代码：

```C#
class Test
{
    static int Sum (params int[] ints)
    {
       int sum = 0;
       for (int i = 0; i < ints.Length; i++)
       {
          sum += ints[i]; // Increase sum by ints[i]
       }
       return sum;
    }
    static void Main()
    {
        int total = Sum (1, 2, 3, 4);
        Console.WriteLine (total); // 10
        int total = Sum (1, 2, 3, 4，5);
        Console.WriteLine (total); // 15
    }
}
```

### 5.4.5 命名参数

我们可以通过名称识别参数，参考 Python 的位置参数。例如：

```C#
void myMethod (int x, int y)
{
   Console.WriteLine (x + ", " + y);
}

void Test()
{
   myMethod (x:1, y:2); // 1, 2
}
```

## 5.5 匿名方法

在 C#中，匿名方法是一种没有名称且可以在运行时定义的方法，通常用于在需要时定义委托或事件的处理程序。下面是一个示例，演示如何使用匿名方法定义一个简单的委托：

```c#
delegate void PrintDelegate(string message);

class Program
{
    static void Main(string[] args)
    {
        PrintDelegate print = delegate (string message) { Console.WriteLine(message); };

        print("Hello, world!");
    }
}
```

需要注意的是，匿名方法在定义时可以访问包含它的方法中的变量，这些变量称为“捕获变量”。例如，下面是一个示例，演示如何使用匿名方法访问捕获变量：

```c#
class Program
{
    static void Main(string[] args)
    {
        int x = 10;
        Action print = delegate () { Console.WriteLine(x); };
        x = 20;
        print();  // 输出20
    }
}
```

在这个示例中，我们定义了一个名为 print 的委托，它没有参数，返回类型为 void。在匿名方法中，我们输出了变量 x 的值，然后修改了变量 x 的值，最后调用了 print 方法。**由于匿名方法访问的是变量的引用，因此输出的值为 20，而不是最 初的值 10**。

Lambda 表达式主要用于实现匿名方法：

```c#
//无参
() => {  }
//一个参数
(x) => { }
x => { }
//多参数
(x,y,z) => { }

// 单语句，可以不加 { }
() => a = 5; //执行 a = 5 ，但是没有任何返回值
() => a; // 单语句如果是一个值/引用，返回对应的的值/引用，可以省略return。例如：前面代码返回a的值
(message) => Console.WriteLine(message); // 单语句可以是一个函数，并且能接受对应的参数

// 多语句，必须加 { }
(x,y) =>
{
    if(x<y)
    {
        return x;
    }
    else
    {
        return y;
    }
}
```

# 六、面向对象——类

## 6.1 类的成员

C#中，类有三个成员：

- 字段
  - 静态
  - 非静态
- 属性
  - 静态
  - 非静态
- 方法/函数
  - 构造方法
  - 自定义方法
  - 析构函数

一般格式如下：

```C#
[public] [static] class ClassName[<泛型>] [:Father]
{
    [字段];
    [属性];
    [方法];
}
```

注意：

1. 类名命名规则符合 Pascal 规范。每个单词的首字母都要大写，其余字母小写。比如：MyFirstClass
2. 静态类和动态类有区别，成员也有就静态和动态的区别，默认为私有、动态类。（这里在随后进行详细说明）
3. 如果要访问类的成员，你要使用点（.）运算符。
4. 点运算符链接了对象（或类）的名称和成员的名称。

### 6.1.1 字段

字段是在类或结构中直接声明的任意类型的变量。 字段是其包含类型的成员。

字段(field) 用来存储数值或对象的真正实体

注意：

- 命名规则：

  - Camel。骆驼命名规范。变量名中首单词的首字母要小写，其余单词的首字母要大写。
  - 类的字段一般以**下划线**开头。

### 6.1.2 属性

属性从外部看起来像字段，但在内部它们包含逻辑。一个属性被声明为一个字段，但是添加了一个 get / set 块。

以下是如何实现 CurrentPrice 作为属性：

```C#
public class Product
{
    decimal _currentPrice;       // The private "backing" field、
    public decimal CurrentPrice // The public property
    {
        get {
           		return _currentPrice;
        	}
        set {
          		_currentPrice = value;
        	}
    }
}
```

属性的作用：保护字段，对字段的赋值、取值进行限定

- 当给属性赋值时，会执行 set 方法
- 当给属性输出时，会执行 get 方法

注意：

- 命名规则符合 Pascal 规范。

### 6.1.3 构造方法

作用：帮助我们给初始化对象（给每个属性依次赋值）

构造函数是一种特殊的方法；当在实例化类的时候，自动执行函数里面的内容（参考 python 的\_**\_init\_\_**构造方法）

1. 构造方法没有返回值，连 void 也不能写
2. 构造方法的名称必须跟类名一致
3. 构造方法可以重载
4. 每写好一个类，就会自带一个无参数的构造方法，**当写了一个构造函数后，默认的无参构造方法就会消失**。

基本语法如下：

```C#
class Student
{
    public Stuident()//必须是public
    {
        xxxxx;
    }
}
```

### 6.1.4 💎this💎 关键字

this 是 C#中的保留字，

1. 作用 1 ：

   - 它允许一个对象指向它自己，即 this 表示当前正在被操作的对象本身。
   - 在方法内部，this 引用可以用于指向任何当前执行的对象。
   - 经常地，this 引用用于区分构造函数的参数和它们相对应的同名的实例变量。

   例如，当一个类有三个字段，实例化后的对象有`number、name、owner`三个属性。我们在初始化时，可以使用以下方法：

   ```C#
   public class Money
   {
       int _number;
       string _name;
       string _owner;
       Public Money(int a, string b, string c)
       {
           _number = a;
           _name = b;
           _owner = c;
       }
   }

   Money instance = new Money(1,"w","d");
   ```

   但是上述方法存在一些问题：为了让类的字段和初始化时传入类的参数做区别，特别的将变量的名称写成不一样的，这样降低了程序代码的可读性。因此可以使用 this 关键字对当前对象进行引用。

   ```C#
   public class Money
   {
       int _number;
       string _name;
       string _owner;
       Public Money(int number, string name, string owner)
       {
           this._number = number;
           this._name = name;
           this._owner = owner;
       }
   }
   ```

   等号前面指的是当前操作对象的某一个类成员，后者是传入到类的参数。因此将二者进行了区分。

2. 作用 2 ：

   构造函数重载时，将重载的构造函数的参数传递给其他构造函数，并且使其初始化类。 例如，下面的 Person 类有三个构造方法：

   ```C#
   using System;
   using System.Collections.Generic;
   using System.Linq;
   using System.Text;
   using System.Threading.Tasks;
   
   namespace this关键字测试
   {
       public class Person
       {
           public int _id;
           public string _name;
           public int _gender;
           public int _age;
   
           public Person(int id, string name, int gender, int age)：
           {
               _id = id;
               _name = name;
               _gender = gender;
               _age = age;
           }
   
           public Person(int id, int gender) : this(id, "www", gender, 20)
           {
               //_id = id;
               //_gender = gender;
           }
   
           public Person()
           { }
       }
   
       internal class Program
       {
           private static void Main(string[] args)
           {
               Person person = new Person(1, "张三", 1, 20);
               Person person1 = new Person(2, 0);
               Console.ReadKey();
           }
       }
   }
   ```

   首先，当我们 new 创建类的实例化对象时，会调用类的构造函数对类进行初始化。当有多个构造函数时，**会根据传入的参数列表自动选择对应的构造函数**。但是，我们不希望在每个构造函数中，都写一遍初始化语句。因此，我们可以使用 this 关键字，将当前选择的构造函数中已经接收到的参数列表，传给另一个构造函数，<u>多余的参数不用写，缺省的参数要补上</u>。然后**先执行接收 this 传递的参数列表的构造函数，再执行 new 时自动选择的构造函数**。

### 6.1.5 析构函数

- 当程序结束的时候或者类不在被调用的时候，析构函数才运行
- 该函数可以帮助我们释放资源
- GC Garbage Collection 垃圾回收，因此，在实际开发中，析构函数并不常用

```C#
~Student()
{
    Console.WriteLine("我是析构函数");
}
```

## 6.2 类的构造和实例化

### 6.2.1 类的构造

基本语法如下：

```C#
[public] [static] class ClassName[<泛型>] [:Father]
{
    [字段];
    [属性];
    [方法];
}
```

### 6.2.2 类的实例化

基本语法如下：

```C#
//假如有个类：Student

//类的实例化
Student zhangsan = new Student([参数列表]);
```

实例化的对象是：zhangsan，该对象的类型为：Student。括号里面是传入到类中的可选参数。

`new`针对类实例化的作用：

1. 在内存中开辟一块**新的空间**（堆区）
2. 调用类的构造方法
3. **所有的构造方法执行完毕，对象才会被创建**

> `new`还有其他的一些用法，比如创建变量等，具体功能根据实际代码而定。

## 6.3 封装

### 6.3.1 访问修饰符

**封装** 被定义为"把一个或多个项目封闭在一个物理的或者逻辑的包中"。在面向对象程序设计方法论中，封装是为了防止对实现细节的访问。

抽象和封装是面向对象程序设计的相关特性。抽象允许相关信息可视化，封装则使开发者实现所需级别的抽象。

C# 封装根据具体的需要，设置使用者的访问权限，并通过 **访问修饰符** 来实现。

一个 **访问修饰符** 定义了一个类成员的范围和可见性。C# 支持的访问修饰符如下所示：

|       关键字       | 作用                                   |
| :----------------: | :------------------------------------- |
|       public       | 所有对象都可以访问                     |
| protected internal | 访问限于当前程序集或派生自包含类的类型 |
|      internal      | 同一个程序集的对象可以访问             |
|     protected      | 只有该类对象及其子类对象可以访问       |
|  private（默认）   | 对象本身在对象内部可以访问             |

- Public 访问修饰符：允许一个类将其成员变量和成员函数暴露给其他的函数和对象。任何公有成员可以被外部的类访问。
- Protected Internal 访问修饰符：允许在本类,派生类或者包含该类的程序集中访问。这也被用于实现继承。
- Internal 访问修饰符：允许一个类将其成员变量和成员函数暴露给当前程序中的其他函数和对象。换句话说，带有 internal 访问修饰符的任何成员，可以被定义在该成员所定义的**应用程序内**的任何类或方法访问。
- Protected 访问修饰符：允许子类访问它的基类的成员变量和成员函数。这样有助于实现继承。
- Private 访问修饰符：允许一个类将其成员变量和成员函数对其他的函数和对象进行隐藏。只有同一个类中的函数可以访问它的私有成员。即使是类的实例也不能访问它的私有成员。

类比理解：

```markdown
比如说：一个人 A 为父类，他的儿子 B，妻子 C，私生子 D（注：D 不在他家里）

如果我们给 A 的事情增加修饰符：

public 事件，地球人都知道，全公开
protected internal 事件，A，B，C，D 都知道,其它人不知道
internal 事件，A，B，C 知道（A 家里人都知道，私生子 D 不知道）
protected 事件，A，B，D 知道（A 和他的所有儿子知道，妻子 C 不知道）
private 事件，只有 A 知道（隐私？心事？）
```

---

在 C# 中，不同类型的成员具有不同的默认访问修饰符。以下是各种类型的成员及其默认访问修饰符的列表：

1. **类（Class）**：如果没有指定访问修饰符，默认为 `internal`。这意味着这个类只能在定义它的程序集内部访问。
2. **结构体（Struct）**：与类相同，如果没有指定访问修饰符，默认为 `internal`。结构体和它们的成员只能在定义它们的程序集内部访问。
3. **接口（Interface）**：与类和结构体相同，如果没有指定访问修饰符，默认为 `internal`。接口和它们的成员只能在定义它们的程序集内部访问。
4. **枚举（Enum）**：与类、结构体和接口相同，如果没有指定访问修饰符，默认为 `internal`。枚举类型和它们的成员只能在定义它们的程序集内部访问。
5. **委托（Delegate）**：与类、结构体、接口和枚举相同，如果没有指定访问修饰符，默认为 `internal`。委托类型只能在定义它们的程序集内部访问。
6. **类和结构体的成员**：类和结构体的成员具有不同的默认访问修饰符，具体如下：
   - **字段（Field）**：如果没有指定访问修饰符，默认为 `private`。这意味着字段只能在声明它的类或结构体内部访问。
   - **方法（Method）**：如果没有指定访问修饰符，默认为 `private`。这意味着方法只能在声明它的类或结构体内部访问。
   - **属性（Property）**：如果没有指定访问修饰符，默认为 `private`。这意味着属性只能在声明它的类或结构体内部访问。
   - **事件（Event）**：如果没有指定访问修饰符，默认为 `private`。这意味着事件只能在声明它的类或结构体内部访问。
   - **构造函数（Constructor）**：如果没有指定访问修饰符，默认为 `private`。这意味着构造函数只能在声明它的类或结构体内部访问。
   - **嵌套类型（Nested Type）**：例如嵌套类、嵌套结构体、嵌套接口和嵌套枚举，默认访问修饰符为 `private`。这意味着嵌套类型只能在声明它的外部类型内部访问。

请注意，这些默认访问修饰符可以通过显式指定访问修饰符（例如 `public`、`protected`、`internal` 或 `private`）来修改。

## 6.4 继承

继承是面向对象程序设计中最重要的概念之一。继承允许我们根据一个类来定义另一个类，这使得创建和维护应用程序变得更容易。同时也有利于重用代码和节省开发时间。

当创建一个类时，程序员不需要完全重新编写新的数据成员和成员函数，只需要设计一个新的类，继承了已有的类的成员即可。这个已有的类被称为的 **基类**，这个新的类被称为**派生类**。

我们可能会在一些类中写重复的成员，我们可以将这些重复的成员，单独的封装到一个类中，作为这些类的**父类**（基类），那么，这些类就叫做**父类**的**子类**（派生类）。

类可以从另一个类继承以扩展或定制原始类。继承一个类会重用该类中的功能。类只能从一个类继承。

### 6.4.1 继承的语法

继承的格式如下：

```C#
//父类
public class Person
{
    xxxxx
}
//子类1
public class Student : Person
{
    xxxx
}
//子类2
public class Teacher : Person
{
    xxxxx
}
```

1. 子类可以从父类中继承：字段、属性、方法

2. 子类不能继承父类的**私有**的字段、属性、方法

3. 父类不能从子类中调用成员

4. **子类没有继承父类的构造函数，子类会默认的调用父类的无参构造方法**

   1. 子类用 new 实例化时，首先会默认的调用父类的无参构造方法，这一过程是为了创建父类的实例化对象，让子类能使用父类中的成员

   2. 然后父类的无参构造函数执行完，才会执行自己的构造方法。

   3. 父类会默认地自带一个无参构造方法，但是**父类中存在有参的构造函数时，默认的无参构造函数就会消失**，这时候创建子类时，会报错。

   4. 因此，在定义含有**有参构造函数**的父类时，一般需手动定义一个无参的构造函数，以便于让子类调用。

5. 在子类中显示调用父类的构造函数，使用关键字：base

   使用此方法一般不用手动构造无参的构造函数，因为子类这时会直接调用父类对应的构造方法（如果父类有有参构造方法，而子类 base 的是父类的无参构造方法，那么还是需要手动在父类中创建无参构造方法），而子类中，一旦含有不使用 base 的构造方法，那么父类就必须存在无参构造方法。

```C#
class Person
{
    public Person (string name , int age , char gender)
    {
        this.Name = name;
        ........
    }
}
class Student
{
    public Student(string name ,int age , char gender) : base (name , age , gender)
    {

    }
}
```

注意：

1. 继承的单根性：一个子类只能有一个父类
2. 继承的传递性：子类能继续被继承

### 6.4.2 里氏转换

1. 子类可以赋值给父类：如果有一个地方需要父类作为参数，我们可以给一个子类代替父类
2. 如果父类对象参数中装的是子类对象，那么可以将这个父类对象强转为子类对象

```C#
//父类
public class Person
{
    public void PersonSay()
    {
        Console.WriteLine("我是父类");
    }
}
//子类
public class Student : Person
{
    public void StudentSay()
    {
        Console.WriteLine("我是学生");
    }
}
//子类
public class Teacher : Person
{
    public void TeacherSay()
    {
        Console.WriteLine("我是老师");
    }
}
public class Program
{
    public void Main(string[] args)
    {
        //里氏转换
        //子类赋值给父类
        Person p = new Student();
        /*或者*/
        Student s = new Student();
        Person p = s;

        //现在父类p中装的是子类对象s，那么可以将这个父类对象强转为子类对象
        Student ss = (Student)p;
    }
}
```

### 6.4.3 is 与 as 关键字

- **`is`**：表示类型转换，如果能够转换成功，则返回一个 ture，如果转换失败，则返回一个 false

  例如下面代码：

  ```C#
  //省略上述 6.4.2 的代码
  if（p is teacher）
  {
      Teacher ss = (Teacher)p;
      ss.TeacherSay();
      Console.WriteLine("转换成功");
  }
  else
  {
      Console.WriteLine("转换失败");
  }

  //结果是:转换失败
  ```

- **`as`**：表示类型转换，如果能够转换成功，则返回**对应的对象**，否则返回一个 null

  例如下面代码：

  ```C#
  //省略上述 6.4.2 的代码
  if（p is teacher）
  {
      Teacher ss = (Teacher)p;
      ss.TeacherSay();
      Console.WriteLine("转换成功");
  }
  else
  {
      Console.WriteLine("转换失败");
  }
  //结果是:转换失败
  ```

### 6.4.4 装箱与拆箱

**对象（Object）类型** 是 C# 通用类型系统中所有数据类型的终极基类。Object 是 System.Object 类的别名。所以对象（Object）类型可以被分配任何其他类型（值类型、引用类型、预定义类型或用户自定义类型）的值。但是，在分配值之前，需要先进行类型转换。

当一个值类型转换为对象类型（引用类型）时，则被称为 **装箱**；另一方面，当一个对象类型（引用类型）转换为值类型时，则被称为 **拆箱**。能否装箱或拆箱，要看两种类型之间有无继承关系，有继承关系，就能发生装箱和拆箱。

> 注意：装箱过程存在类型的转换，因此在程序运行时，需要更多的时间。

## 6.5 多态

这里先通过一个例子，来展示父类对象变量装载的是子类对象时，父类、子类同名方法的调用问题。例如下面代码：

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 多态之虚方法
{
    //父类对象
    internal class Person
    {
        public string _name;//字段
        public Person()
        {; }
        public Person(string name)
        {
            Name = name;
        }//构造方法
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }//属性
        //父类的方法
        public void SayHello()
        {
            Console.WriteLine("我是人类");
        }
    }
    //子类
    internal class China : Person
    {
        //调用父类的构造方法进行实例化
        public China(string name) : base(name)
        {; }
        //子类的方法
        public void SayHello()
        {
            Console.WriteLine("我是{0}人", this.Name);
        }
    }

    internal class Japanese : Person
    {
        public Japanese(string name) : base(name)
        {; }

        public void SayHello()
        {
            Console.WriteLine("我是{0}人", this.Name);
        }
    }

    internal class Korea : Person
    {
        public Korea(string name) : base(name)
        {; }

        public void SayHello()
        {
            Console.WriteLine("我是{0}人", this.Name);
        }
    }

    internal class American : Person
    {
        public American(string name) : base(name)
        {; }

        public void SayHello()
        {
            Console.WriteLine("我是{0}人", this.Name);
        }
    }

    internal class Program
    {
        private static void Main(string[] args)
        {
            //创建子类对象
            China ch1 = new China("中国");
            Japanese j1 = new Japanese("日本");
            Korea k = new Korea("韩国");
            American a = new American("美国人");
            //创建父类对象数组，并把子类对象装载进去
            Person[] person = { ch1, j1, k, a };
            for (int i = 0; i < 4; i++)
            {
                person[i].SayHello();
            }
            Console.ReadKey();
        }
    }
}
```

结果是：

```powershell
我是人类
我是人类
我是人类
我是人类
```

表明：如果父类和子类中有相同的方法时，那么根据当前操作的对象的类型，执行相应的方法。子类变量会执行子类的方法，父类变量执行父类的方法。

首先我们理解，`Person[] person = { ch1, j1, k, a }` 变量类型是`Person`，但是父类变量中装载的子类对象。

我们将 for 循环中，添加下面代码：

```C#
if (person[i] is China)
{
    ((China)person[i]).SayHello();
}
else if (person[i] is Japanese)
{
    ((Japanese)person[i]).SayHello();
}
else if (person[i] is Korea)
{
    ((Korea)person[i]).SayHello();
}
else if (person[i] is American)
{
    ((American)person[i]).SayHello();
}
```

结果：

```pow
我是中国人
我是人类
我是日本人
我是人类
我是韩国人
我是人类
我是美国人人
我是人类
```

表明：如果父类和子类中有相同的方法时，那么根据当前操作的对象的类型，执行相应的方法。子类变量会执行子类的方法，父类变量执行父类的方法。

---

多态的直接定义：让一个类能够表现出多种类型的状态（类型）。实现多态的 3 种手段：

1. 虚方法
2. 抽象类
3. 接口

**静态多态性**：在编译时，函数和对象的连接机制被称为早期绑定，也被称为静态绑定。C# 提供了两种技术来实现静态多态性。分别为：

- 函数重载
- 运算符重载

**动态多态性**：使用关键字 **`abstract`** 创建**抽象类**，用于提供接口的部分类的实现。当一个派生类继承自该抽象类时，实现即完成。**抽象类**包含抽象方法，抽象方法可被派生类实现。派生类具有更专业的功能。

下面是有关抽象类的一些规则：

- 您不能创建一个抽象类的实例，因此抽象类必须被继承才能实例化
- 您不能在一个抽象类外部声明一个抽象方法，即抽象方法只能写在抽象类中
- 通过在类定义前面放置关键字 **`sealed`**，可以将类声明为**密封类**。当一个类被声明为 **`sealed`** 时，它不能被继承。抽象类不能被声明为 `sealed`。

### 6.5.1 虚方法

抽象方法是需要子类去实现的。**虚方法是已经实现了的，可以被子类覆盖，也可以不覆盖，取决于需求**。

虚方法可以有实现体，若一个实例方法的声明中含有 `virtual` 修饰符，则称该方法为虚方法。使用了 `virtual` 修饰符后，不允许再有 `static`、`abstract` 或者 `override` 修饰符。

**父类的虚方法，可以在子类中重写**（`override`），此时，再在父类对象中执行该方法，就会只执行对应子类对象的重写的方法。

例如，将上面的 Person 父类的 `SayHello()` 方法写为：添加修饰符 `virtual`

```C#
public virtual void SayHello()
{
    Console.WriteLine("我是人类");
}
```

然后把每个子类里面的 `SayHello()` 方法写为：添加修饰符 `override` ：

```C#
public override void SayHello()
{
    Console.WriteLine("我是{0}人", this.Name);
}
```

再次运行多态的代码，就会得到以下结果：

```pow
我是中国人
我是日本人
我是韩国人
我是美国人
```

表明：父类变量里装载的是子类对象，在把父类方法定义为虚方法，并且子类进行重写后，再调用父类对象的方法时，只会执行相应的子类对象的方法。

如果想不仅能执行子类中重写的方法，还能同时执行父类中的虚方法，我么可以在**子类中重写的方法中调用父类的虚方法**。基本语法如下：

```
public override void FunctionName()
{
    base.FunctionName();
    [方法体;]
}
```

---

总结：当父类变量里装载的是子类对象。在父类中定义虚方法，并在子类中重写这个方法，那么调用父类变量的方法时，就会只执行子类中重写的方法；如果子类没有重写，那么还是会调用自身的方法。

### 6.5.2 抽象类

例如，狗狗会叫，猫猫也会叫，但是狗狗不能作为猫猫的父类，猫猫也不能作为狗狗的父类，因此需要抽象出一个类：动物（`animal`）。与狗狗类和猫猫类不同的是，动物类不能直接实例化出一个对象，因为范围太大，不确定是狗狗还是猫猫还是其他等，而狗狗类就能实例化出对象（具体的某个狗狗）。

当父类中的方法不知道怎么去实现的时候，可以把父类定义为抽象类，将方法写成抽象方法。使用 `abstract` 修饰。

我们可以写下面代码：

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 抽象类
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Animal animal = new Dog();
            animal.Bark();
            Console.ReadKey();
        }
    }
    internal abstract class Animal
    {
        public abstract void Bark();

        public void Test()
        {
            //空实现的函数
        }
    }
    internal class Dog : Animal
    {
        public override void Bark()
        {
            Console.WriteLine("狗狗会汪汪汪");
        }
    }
    internal class Cat : Animal
    {
        public override void Bark()
        {
            Console.WriteLine("猫猫会喵喵喵");
        }
    }
}
```

结果是：

```powershell
狗狗会汪汪汪
```

因此，我们知道，当一个抽象父类变量装载子类对象时，调用的方法均是子类的方法。

抽象类有以下性质：

1. 抽象类不允许创建该类实例对象，但可以创建该类的子类对象
2. 抽象方法只能存在于抽象类中，并且没有方法体，即没有大括号，但是结尾要加分号 `;`
3. 抽象类包含
   1. 字段
   2. 属性
   3. 抽象属性
   4. 方法
   5. 抽象方法
   6. 虚方法

抽象方法和虚方法的区别：

1. 抽象方法是没有实现的方法，需要由子类去实现，而虚方法是有默认实现的方法，子类可以选择覆盖或者不覆盖。

2. 抽象方法用 abstract 关键字来定义，而虚方法用 virtual 关键字来定义。

3. 抽象方法必须放在抽象类或者接口中，而虚方法可以放在普通的类中。

4. **抽象方法没有方法体，而虚方法有默认的方法体**。

5. **子类继承抽象类或者实现接口时，必须实现抽象方法，否则子类也要声明为抽象类**；而子类继承类中的虚方法时，可以选择性地覆盖或者不覆盖。

总之，抽象方法和虚方法都是为了实现多态性而存在的，它们的主要区别在于抽象方法是强制性的，需要子类去实现，而虚方法是可选的，子类可以选择覆盖或者不覆盖。

### 6.5.3 接口

接口定义了所有类继承接口时应遵循的语法合同。接口定义了语法合同 **"是什么"** 部分，派生类定义了语法合同 **"怎么做"** 部分。

接口定义了属性、方法和事件，这些都是接口的成员。**接口只包含了成员的声明**。成员的定义是派生类的责任。接口提供了派生类应遵循的标准结构。接口使得实现接口的类或结构在形式上保持一致。

抽象类在某种程度上与接口类似，但是，它们大多只是用在当只有少数方法由基类声明由派生类实现时。抽象类不能直接实例化，但允许派生出具体的，具有实际功能的类。

**接口本身并不实现任何功能，它只是和声明实现该接口的对象订立一个必须实现哪些行为的契约**。

接口的特点：

- 接口命名一般在开头加上大写字母 “I”
- 接口中的方法，不允许写方法体，并且继**承该接口的类中，必须有实现该方法的方法体**
- 接口成员不允许使用访问修饰符
- 接口没有字段，但是可以有常量

```c#
public interface IPerson
{
    String GetName();
}
```

### 6.6 部分类和密封类

### 6.6.1 部分类

在同一个命名空间下，不允许创建两个名字相同的类，但是可以创建部分类。部分类使用 `partial` 关键字修饰，同一类的部分类的名字是相同的，基本语法如下：

```C#
public partial class Person
{

}
public partial class Person
{

}
```

部分类其实本质上是一个类，只不过将一个类里面的内容分开描述，部分类之间互通的。

### 6.6.2 密封类

当我们创建一个类，但是不想让这个类被继承，可以使用 `sealed` 关键字修饰，表示不能被继承的密封类。基本语法如下：

```C#
public sealed class Person
{

}
```

## 6.6 base 与 this 关键字

### 6.6.1 base 关键字

在 C# 中，当我们使用 new 关键字，创建一个子类对象的时候，会自动调用父类的无参构造方法。但是，如果父类中有多个构造方法，我们如何去调用其他类型的构造方法呢？

`base` 关键字，能够使我们显式的调用父类中对应的构造方法，具体调用哪一个，是要根据传入的参数确定的。并且当我们使用 `base` 指定对应的构造方法后， 子类便不在自动调用父类的无参构造方法。

例如下面代码：

```c#
using System;
public class Person
{
    protected string _name;
    protected int _age;
    protected bool _isBoy;
    public Person(string name, int age, bool isBoy)
    {
        this._name = name;
        this._age = age;
        this._isBoy = isBoy;
        Console.WriteLine("父类构造函数(有参)");
    }
    public Person()
    {
        Console.WriteLine("父类构造函数(无参)");
    }
}
public class Student : Person
{
    protected string _school;

    //子类构造函数，使用base关键字调用父类对应的有参的构造函数
    public Student(string name, int age, bool isBoy, string school) : base(name, age, isBoy)
    {
        this._school = school;
        Console.WriteLine("子类构造函数(有参)");
    }
    public Student()
    {
        Console.WriteLine("子类构造函数(无参)");
    }
}
internal class Program
{
    static void Main(string[] args)
    {
        Student s1 = new Student("小明", 18, true, "清华大学"); //调用父类的有参构造函数
        Student s2 = new Student(); //调用父类的无参构造函数
        Console.ReadKey();
    }
}
```

结果是：

```powershell
父类构造函数(有参)
子类构造函数(有参)
父类构造函数(无参)
子类构造函数(无参)
```

### 6.6.2 this 关键字

`this` 关键字与 `base` 类似，不同的是，它是调用**当前类**中对应参数的构造方法，并且如果在子类中使用，那么 new 一个对象的时候，是 `父类构造方法 -> 子类中被this的构造方法 -> 子类中this构造方法` 。

例如下面代码：

```c#

public class Person
{
    protected string _name;
    protected int _age;
    protected bool _isBoy;
    public Person(string name, int age, bool isBoy)
    {
        this._name = name;
        this._age = age;
        this._isBoy = isBoy;
        Console.WriteLine("父类构造函数(有参)");
    }
    public Person()
    {
        Console.WriteLine("父类构造函数(无参)");
    }
}
public class Student : Person
{
    protected string _school;

    //子类构造函数，使用base关键字调用父类对应的有参的构造函数
    public Student(string name, int age, bool isBoy, string school) : base(name, age, isBoy)
    {
        this._school = school;
        Console.WriteLine("子类构造函数(有参1)");
    }
    public Student(String name) : this(name, 0, true, "清华大学")
    {
        Console.WriteLine("子类构造函数(有参2)");
    }
}
internal class Program
{
    static void Main(string[] args)
    {
        Student s1 = new Student("小明", 18, true, "清华大学"); //调用父类的有参构造函数
        Student s2 = new Student("小行"); //调用父类的无参构造函数
        Console.ReadKey();
    }
}
```

结果为：

```powershell
父类构造函数(有参)
子类构造函数(有参1)
父类构造函数(有参)
子类构造函数(有参1)
子类构造函数(有参2)
```

# 说明

## 环境配置

- 开发工具：[Visual Studio 2022 专业版](https://visualstudio.microsoft.com/zh-hans/)
- .NET Framework ：4.7.2

## 更新日志

{% folding 更新日志 %}

{% timeline 更新日志,orange %}

<!-- timeline 2023-6-14 -->

1. 在 [6.6 base 与 this 关键字](#6-6-base与this关键字) 部分，添加了与构造方法有关的两个关键字：base 与 this

<!-- endtimeline -->

<!-- timeline 2023-5-31 -->

1. 在 [6.3.1 访问修饰符](#6-3-1-访问修饰符) 部分，添加了各种类型的默认访问级别。

<!-- endtimeline -->

<!-- timeline 2023-5-30 -->

1. 完善了抽象类的组成
2. 增加了匿名方法的定义以及使用

<!-- endtimeline -->

<!-- timeline 2023-5-23 -->

1. 在 “前言” 部分，新增了对代码规范的链接

<!-- endtimeline -->

<!-- timeline 2023-5-19 -->

1. 在[2.6 可空类型 💖💖💖](#2-6-可空类型-💖💖💖)中，添加了 `?.` 的使用方法

<!-- endtimeline -->

<!-- timeline 2023-5-12 -->

1. 在[2.6 可空类型 💖💖💖](#2-6-可空类型-💖💖💖)中，添加了 `??=` 的用法
2. 添加[2.4.7 lambda 运算符](#2-4-7-lambda-运算符) 目录，并向其添加了`=>` 运算符的用法
3. 在[2.5.4 占位符](#2-5-4-占位符)中，添加了 `$符` 的用法

<!-- endtimeline -->

<!-- timeline 2023-5-10 -->

1. 添加了文章 **前言** 部分

<!-- endtimeline -->

{% endtimeline %}

{% endfolding %}
