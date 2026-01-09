---
title: C#高级语法
date: 2023-4-30 00:00:00
description: C#高级语法，包括：特性、反射、属性、索引器、委托、事件、集合、泛型、匿名方法、不安全代码、多线程等。
categories:
  - ["C#", "C#基础"]
  - ["Unity3D", "Unity3D基础"]
  - ["Godot"]
tags: [计算机学习, C#, 程序设计, .NET, Unity, 游戏开发]
collection: "C#"
order: 2
---

# 前言

> 本文章主要包含特性、反射、属性、索引器、委托、事件、集合、泛型、匿名方法、不安全代码、多线程等 C#的高级用法。
>
> C#系列教程：
>
> 1. [C#基础语法 | 🪐星空鸟🪐 (yuilexi.cn)](https://blog.yuilexi.cn/2023/04/26/编程/Csharp知识库/Csharp基础/Csharp基础语法/)
> 2. [C#高级语法 | 🪐星空鸟🪐 (yuilexi.cn)](https://blog.yuilexi.cn/2023/04/30/编程/Csharp知识库/Csharp基础/Csharp高级语法/)⬅️ 当前的位置 °꒰๑'ꀾ'๑꒱°
> 3. [C#代码规范 | 🪐星空鸟🪐 (yuilexi.cn)](https://blog.yuilexi.cn/2023/05/19/编程/Csharp知识库/Csharp基础/Csharp规范/)
>
> 

# 特性（Attribute）

# 属性（Property）

**属性（Property）** 是类、结构和接口的命名（named）成员。类或结构中的成员变量或方法称为 **域（Field）**。属性（Property）是域（Field）的扩展，且可使用相同的语法来访问。它们使用 **访问器（accessors）** 让私有域的值可被读写或操作。

属性（Property）不会确定存储位置。相反，它们具有可读写或计算它们值的 **访问器（accessors）**。

## 访问器（Accessors）

<font color='red'>属性</font>的**访问器**包含有助于获取（读取或计算）或设置（写入）属性的可执行语句。访问器声明可包含一个 `get` 访问器、一个 `set` 访问器，或者同时包含二者。例如：

```c#
/ 声明类型为 string 的 Code 属性
private string code;
private string name;
private int age;
public string Code
{
   get
   {
      return code;
   }
}

// 声明类型为 string 的 Name 属性
public string Name
{
   set
   {
     name = value;
   }
}

// 声明类型为 int 的 Age 属性
public int Age
{
   get
   {
      return age;
   }
   set
   {
      age = value;
   }
}
```

`get` 访问器和`set` 访问器尽管写法奇怪，但它们实际上是两个方法。在访问属性的值时，执行的是`get` 方法；在给属性赋值时，执行的是`set` 方法。因此，我们不仅能够对属性进行访问和修改，还可以在`get` 和`set` 内部书写逻辑，以便于规范访问和修改。

## 抽象属性（Abstract Properties）

抽象类可拥有抽象属性，这些属性应在派生类中被实现。下面的程序说明了这点：

```c#
public abstract class Person
{
    public abstract string Name
    {
        get;
        set;
    }
    public abstract int Age
    {
        get;
        set;
    }
}
```

上述抽象类中的抽象属性，必须在继承的子类中使用`override`进行重写：

```c#
public class Student : Person
{
    private string _name;
    private int _age;

    public override string Name
    {
        get
        {
            return _name;
        }
        set
        {
            _name = value;
        }
    }
    public override int Age
    {
        get
        {
            return _age;
        }
        set
        {
            _age = value;
        }
    }
}
```

# 索引器（Indexer）

**索引器（Indexer）** 允许一个对象可以像数组一样使用下标的方式来访问。当您为类定义一个索引器时，该类的行为就会像一个 **虚拟数组（virtual array）** 一样。您可以使用数组访问运算符 **[ ]** 来访问该类的的成员。

## 语法

一维索引器的语法如下：

```c#
element-type this[int index]
{
   // get 访问器
   get
   {
      // 返回 index 指定的值
   }

   // set 访问器
   set
   {
      // 设置 index 指定的值
   }
}
```

## 索引器的用途

**索引器**的行为的声明在某种程度上类似于**属性**。就像属性一样，您可使用 **get** 和 **set** 访问器来定义索引器。但是，属性返回或设置一个特定的数据成员，而索引器返回或设置对象实例的一个特定值。换句话说，它把实例数据分为更小的部分，并索引每个部分，获取或设置每个部分。

例如下面代码：

```c#
using System;

namespace 索引器
{
    public class Person
    {
        public static int _size = 5;
        private string[] _name = new string[_size];

        //构造函数，进行初始化
        public Person()
        {
            for (int i = 0; i < _size; i++)
            {
                _name[i] = "a";
            }
        }

        //索引器
        public string this[int index]
        {
            get
            {
                if (index < 0 || index >= _size)
                {
                    throw new IndexOutOfRangeException("索引超出范围");
                }
                return _name[index];
            }
            set
            {
                if (index < 0 || index >= _size)
                {
                    throw new IndexOutOfRangeException("索引超出范围");
                }
                _name[index] = value;
            }
        }
    }

    //主程序入口
    internal class Program
    {
        private static void Main(string[] args)
        {
            Person persons = new Person();
            persons[0] = "张三";
            persons[1] = "李四";
            persons[2] = "王五";
            persons[3] = "赵六";
            for (int i = 0; i < Person._size; i++)
            {
                Console.WriteLine(persons[i]);
            }
            Console.ReadKey();
        }
    }
}
```

结果为：

```powershell
张三
李四
王五
赵六
a
```

## 重载索引器

**索引器**可被重载。索引器声明的时候也可带有多个参数，且每个参数可以是不同的类型。C# 允许索引器可以是其他类型。例如下面的语法：

```c#
public string this[int index]
{
    get
    { }
    set
    { }
}
public int this[string name]
{
    get
    { }
    set
    { }
}
```

# 委托（Delegate）

C# 中的**委托**类似于 C 或 C++ 中函数的指针。**委托（Delegate）** 是存有对某个方法的引用的一种引用类型变量。引用可在运行时被改变。

委托（Delegate）特别用于实现事件和回调方法。所有的委托（Delegate）都派生自 **System.Delegate** 类。

## 声明委托（Delegate）

委托声明决定了可由该委托引用的方法。委托可指向一个与其具有相同标签的方法。

```c#
public delegate string MyDelegate (string s);
```

上面的委托可被用于引用任何一个带有一个单一的 `string` 参数的方法，并返回一个 `string` 类型变量。声明委托的语法如下：

```c#
[修饰符] delegate 返回类型 委托名([参数列表])
```

## 实例化委托（Delegate）

一旦声明了委托类型，委托对象必须使用 **new** 关键字来创建，且与一个特定的方法有关。当创建委托时，传递到 **new** 语句的参数就像方法调用一样书写，但是不带有参数。

```c#
using System;

//声明委托
public delegate string MyDelegate(string str);
namespace 委托
{
    internal class Program
    {
        public static string First(string str)
        {
            return "你输入的是" + str + "\n";
        }

        public static string Second(string str)
        {
            return str + str;
        }

        public static string Third(string str)
        {
            return str + str + str;
        }

        private static void Main(string[] args)
        {
            MyDelegate myDelegate1 = new MyDelegate(First);
            MyDelegate myDelegate2 = new MyDelegate(Second);
            myDelegate2 += Third;
            Console.WriteLine(myDelegate1("Hello World!"));
            Console.WriteLine(myDelegate2("Hello,C#\n"));
            Console.ReadKey();
        }
    }
}
```

添加到委托变量内的方法，**必须和委托有相同的返回值和参数列表**，同时在`new`时，必须向委托变量中传入一个方法作为参数，而且只能传入一个方法，这是因为委托这种特殊的类不含无参的构造方法。

```c#
//这是错误的语法，会报错
MyDelegate myDelegate1 = new MyDelegate();
//这是正确的写法
MyDelegate myDelegate2 = new MyDelegate(Second);
```

## 委托的多播（Multicasting of a Delegate）

委托对象可使用 "+" 运算符进行合并。一个合并委托调用它所合并的两个委托。只有相同类型的委托可被合并。"-" 运算符可用于从合并的委托中移除组件委托。

使用委托的这个有用的特点，您可以创建一个委托被调用时要调用的方法的调用列表。这被称为委托的 **多播（multicasting）**，也叫组播。

例如上面的代码中：

```c#
myDelegate2 += Third;
```

# 事件（Event）

**事件（Event）** 基本上说是一个用户操作，如按键、点击、鼠标移动等等，或者是一些提示信息，如系统生成的通知。应用程序需要在事件发生时响应事件。例如，中断。

C# 中使用事件机制实现线程间的通信。

## 通过事件使用委托

**事件在类中声明且生成**，且通过使用同一个类或其他类中的委托与事件处理程序关联。包含事件的类用于发布事件。这被称为 **发布器（publisher）** 类。其他接受该事件的类被称为 **订阅器（subscriber）** 类。事件使用 **发布-订阅（publisher-subscriber）** 模型。

**发布器（publisher）** 是一个包含事件和委托定义的对象。事件和委托之间的联系也定义在这个对象中。发布器（publisher）类的对象调用这个事件，并通知其他的对象。

**订阅器（subscriber）** 是一个接受事件并提供事件处理程序的对象。在发布器（publisher）类中的委托调用订阅器（subscriber）类中的方法（事件处理程序）。

## 声明事件（Event）

在类的内部声明事件，首先必须声明该事件的委托类型。例如：

```c#
public delegate void MyDelegate(string status);
```

然后，声明事件本身，使用 **event** 关键字：

```
// 基于上面的委托定义事件
public event MyDelegate MyEvent;
```

例如下面实例：

```c#
using System;
using System.ComponentModel.Design;

namespace 事件
{
    //发布器类
    public class EventTest
    {
        //声明一个整型变量，模拟当前数据
        public int value = 1;

        //声明委托
        public delegate void MyDelegate(string str);

        //声明事件
        public event MyDelegate MyEvent;

        //触发事件的函数
        public void OnMyEvent(string str)
        {
            if (MyEvent != null)
            {
                MyEvent(str);
            }
            else
            {
                Console.WriteLine("没有订阅者\n");
            }
        }

        //如果值改变，就调用“触发事件的函数”
        public void SetValue(int value)
        {
            if (value != this.value)
            {
                this.value = value;
                OnMyEvent("已经修改了value的值");
            }
        }
    }

    //订阅器
    internal class Program
    {
        public static void Show1(string str)
        {
            Console.WriteLine("小明收到了：“{0}”的消息", str);
        }

        public static void Show2(string str)
        {
            Console.WriteLine("小红收到了：“{0}”的消息", str);
        }

        public static void Show3(string str)
        {
            Console.WriteLine("小刚收到了：“{0}”的消息", str);
        }

        private static void Main(string[] args)
        {
            //实例化一个发布器类的对象
            EventTest eventTest = new EventTest();

            //订阅事件
            Console.WriteLine("第一次尝试");
            eventTest.MyEvent += Show1;
            eventTest.MyEvent += Show2;
            eventTest.SetValue(10);
            Console.WriteLine("第二次尝试");
            eventTest.SetValue(10);
            Console.WriteLine("第三次尝试");
            eventTest.MyEvent += Show3;
            eventTest.SetValue(20);
            Console.WriteLine("第四次尝试");
            eventTest.MyEvent -= Show1;
            eventTest.SetValue(30);
            Console.ReadKey();
        }
    }
}
```

结果为：

```powershell
第一次尝试
小明收到了：“已经修改了value的值”的消息
小红收到了：“已经修改了value的值”的消息
第二次尝试
第三次尝试
小明收到了：“已经修改了value的值”的消息
小红收到了：“已经修改了value的值”的消息
小刚收到了：“已经修改了value的值”的消息
第四次尝试
小红收到了：“已经修改了value的值”的消息
小刚收到了：“已经修改了value的值”的消息
```

# 集合（Collection）

**集合类**是专门用于数据存储和检索的类。这些类提供了**对栈**、**队列**、**列表**和**哈希表**的支持。大多数集合类实现了相同的接口。

**集合类**服务于不同的目的，如为元素动态分配内存，基于索引访问列表项等等。这些类创建 `Object` 类的对象的集合。在 C# 中，Object 类是所有数据类型的基类。

## 动态数组（ArrayList）

**动态数组**代表了可被单独索引的对象的有序集合。它基本上可以替代一个数组。但是，与数组不同的是，您可以使用**索引**在指定的位置添加和移除项目，动态数组会自动重新调整它的大小。它也允许在列表中进行动态内存分配、增加、搜索、排序各项。

### ArrayList 类的属性

下表列出了 **ArrayList** 类的一些常用的 **属性**：

| 属性           | 描述                                                  |
| :------------- | :---------------------------------------------------- |
| Capacity       | 获取或设置 ArrayList 可以包含的元素个数。             |
| Count          | 获取 ArrayList 中实际包含的元素个数。                 |
| IsFixedSize    | 获取一个值，表示 ArrayList 是否具有固定大小。         |
| IsReadOnly     | 获取一个值，表示 ArrayList 是否只读。                 |
| IsSynchronized | 获取一个值，表示访问 ArrayList 是否同步（线程安全）。 |
| Item[Int32]    | 获取或设置指定索引处的元素。                          |
| SyncRoot       | 获取一个对象用于同步访问 ArrayList。                  |

### ArrayList 类的方法

**ArrayList** 类的一些常用的 **方法**：详情请看[C# 动态数组（ArrayList） | 菜鸟教程 (runoob.com)](https://www.runoob.com/csharp/csharp-arraylist.html)

| 序号  | 方法名                                                      | 描述                                                    |
| :---: | :---------------------------------------------------------- | ------------------------------------------------------- |
| **1** | **public virtual int Add( object value )**                  | **在 ArrayList 的末尾添加一个对象**                     |
|   2   | public virtual void AddRange( ICollection c )               | 在 ArrayList 的末尾添加 ICollection 的元素。            |
| **3** | **public virtual void Clear()**                             | **从 ArrayList 中移除所有的元素**                       |
| **4** | **public virtual bool Contains( object item )**             | **判断某个元素是否在 ArrayList 中**                     |
|   5   | public virtual ArrayList GetRange( int index, int count )   | 返回一个 ArrayList，表示源 ArrayList 中元素的子集       |
|   6   | public virtual int IndexOf(object)                          | 返回某个值在 ArrayList 中第一次出现的索引，索引从零开始 |
|   7   | public virtual void Insert( int index, object value )       | 在 ArrayList 的指定索引处，插入一个元素                 |
|   8   | public virtual void InsertRange( int index, ICollection c ) | 在 ArrayList 的指定索引处，插入某个集合的元素。         |
| **9** | **public virtual void Remove( object obj )**                | **从 ArrayList 中移除第一次出现的指定对象**             |
|  10   | public virtual void RemoveAt( int index )                   | 移除 ArrayList 的指定索引处的元素。                     |
|  11   | public virtual void RemoveRange( int index, int count )     | 从 ArrayList 中移除某个范围的元素                       |
|  12   | public virtual void Reverse()                               | 逆转 ArrayList 中元素的顺序                             |
|  13   | public virtual void SetRange( int index, ICollection c )    | 复制某个集合的元素到 ArrayList 中某个范围的元素上       |
|  14   | public virtual void Sort()                                  | 对 ArrayList 中的元素进行排序                           |
|  15   | public virtual void TrimToSize()                            | 设置容量为 ArrayList 中元素的实际个数                   |

## 哈希表（Hashtable）

`Hashtable` 类代表了一系列基于键的哈希代码组织起来的**键/值**对。它使用**键**来访问集合中的元素。

当您使用**键**访问元素时，则使用哈希表，而且您可以识别一个有用的键值。哈希表中的每一项都有一个**键/值**对。键用于访问集合中的项目。

### Hashtable 类的属性

下表列出了 **Hashtable** 类的一些常用的 **属性**：

| 属性        | 描述                                          |
| :---------- | :-------------------------------------------- |
| Count       | 获取 Hashtable 中包含的键值对个数。           |
| IsFixedSize | 获取一个值，表示 Hashtable 是否具有固定大小。 |
| IsReadOnly  | 获取一个值，表示 Hashtable 是否只读。         |
| Item        | 获取或设置与指定的键相关的值。                |
| Keys        | 获取一个 ICollection，包含 Hashtable 中的键。 |
| Values      | 获取一个 ICollection，包含 Hashtable 中的值。 |

### Hashtable 类的方法

下表列出了 **Hashtable** 类的一些常用的 **方法**：

| 序号  | 方法名                                                  | 描述                                            |
| :---- | :------------------------------------------------------ | ----------------------------------------------- |
| **1** | **public virtual void Add( object key, object value )** | **向 Hashtable 添加一个带有指定的键和值的元素** |
| **2** | **public virtual void Clear()**                         | **从 Hashtable 中移除所有的元素**               |
| **3** | **public virtual bool ContainsKey( object key )**       | **判断 Hashtable 是否包含指定的键**             |
| 4     | **public virtual bool ContainsValue( object value )**   | **判断 Hashtable 是否包含指定的值**             |
| 5     | **public virtual void Remove( object key )**            | **从 Hashtable 中移除带有指定的键的元素**       |

## 排序列表（SortedList）

SortedList 类代表了一系列按照键来排序的**键/值**对，这些键值对可以通过键和索引来访问。

排序列表是数组和哈希表的组合。它包含一个可使用键或索引访问各项的列表。如果您使用索引访问各项，则它是一个动态数组（ArrayList），如果您使用键访问各项，则它是一个哈希表（Hashtable）。集合中的各项总是按键值排序。

### SortedList 类的属性

下表列出了 **SortedList** 类的一些常用的 **属性**：

| 属性        | 描述                                           |
| :---------- | :--------------------------------------------- |
| Capacity    | 获取或设置 SortedList 的容量。                 |
| Count       | 获取 SortedList 中的元素个数。                 |
| IsFixedSize | 获取一个值，表示 SortedList 是否具有固定大小。 |
| IsReadOnly  | 获取一个值，表示 SortedList 是否只读。         |
| Item        | 获取或设置与 SortedList 中指定的键相关的值。   |
| Keys        | 获取 SortedList 中的键。                       |
| Values      | 获取 SortedList 中的值。                       |

### SortedList 类的方法

下表列出了 **SortedList** 类的一些常用的 **方法**：

| 序号 | 方法名                                                  | 描述                                                     |
| :--- | :------------------------------------------------------ | -------------------------------------------------------- |
| 1    | **public virtual void Add( object key, object value )** | **向 SortedList 添加一个带有指定的键和值的元素**         |
| 2    | **public virtual void Clear()**                         | **从 SortedList 中移除所有的元素**                       |
| 3    | **public virtual bool ContainsKey( object key )**       | **判断 SortedList 是否包含指定的键**                     |
| 4    | **public virtual bool ContainsValue( object value )**   | **判断 SortedList 是否包含指定的值**                     |
| 5    | public virtual object GetByIndex( int index )           | 获取 SortedList 的指定索引处的值                         |
| 6    | public virtual object GetKey( int index )               | 获取 SortedList 的指定索引处的键                         |
| 7    | public virtual IList GetKeyList()                       | 获取 SortedList 中的键                                   |
| 8    | public virtual IList GetValueList()                     | 获取 SortedList 中的值                                   |
| 9    | public virtual int IndexOfKey( object key )             | 返回 SortedList 中的指定键的索引，索引从零开始           |
| 10   | public virtual int IndexOfValue( object value )         | 返回 SortedList 中的指定值第一次出现的索引，索引从零开始 |
| 11   | **public virtual void Remove( object key )**            | **从 SortedList 中移除带有指定的键的元素**               |
| 12   | **public virtual void RemoveAt( int index )**           | **移除 SortedList 的指定索引处的元素**                   |
| 13   | public virtual void TrimToSize()                        | 设置容量为 SortedList 中元素的实际个数                   |

## 堆栈（Stack）

堆栈（Stack）代表了一个**后进先出**的对象集合。当您需要对各项进行后进先出的访问时，则使用堆栈。当您在列表中添加一项，称为**推入**元素，当您从列表中移除一项时，称为**弹出**元素。

### Stack 类的属性

下表列出了 **Stack** 类的一些常用的 **属性**：

| 属性  | 描述                          |
| :---- | :---------------------------- |
| Count | 获取 Stack 中包含的元素个数。 |

### Stack 类的方法

下表列出了 **Stack** 类的一些常用的 **方法**：

| 序号 | 方法名                                         | 描述                                      |
| :--- | :--------------------------------------------- | ----------------------------------------- |
| 1    | **public virtual void Clear()**                | ** 从 Stack 中移除所有的元素**            |
| 2    | **public virtual bool Contains( object obj )** | **判断某个元素是否在 Stack 中**           |
| 3    | **public virtual object Peek()**               | **返回在 Stack 的顶部的对象，但不移除它** |
| 4    | **public virtual object Pop()**                | **返回并移除在 Stack 的顶部的对象**       |
| 5    | **public virtual void Push( object obj )**     | **向 Stack 的顶部添加一个对象**           |
| 6    | public virtual object[] ToArray()              | 复制 Stack 到一个新的数组中               |

## 队列（Queue）

队列（Queue）代表了一个**先进先出**的对象集合。当您需要对各项进行先进先出的访问时，则使用队列。当您在列表中添加一项，称为**入队**，当您从列表中移除一项时，称为**出队**。

### Queue 类的属性

下表列出了 **Queue** 类的一些常用的 **属性**：

| 属性  | 描述                          |
| :---- | :---------------------------- |
| Count | 获取 Queue 中包含的元素个数。 |

### Queue 类的方法

下表列出了 **Queue** 类的一些常用的 **方法**：

| 序号 | 方法名                                         | 描述                                |
| :--- | :--------------------------------------------- | ----------------------------------- |
| 1    | **public virtual void Clear()**                | **从 Queue 中移除所有的元素**       |
| 2    | **public virtual bool Contains( object obj )** | **判断某个元素是否在 Queue 中**     |
| 3    | **public virtual object Dequeue()**            | **移除并返回在 Queue 的开头的对象** |
| 4    | **public virtual void Enqueue( object obj )**  | **向 Queue 的末尾添加一个对象**     |
| 5    | public virtual object[] ToArray()              | 复制 Queue 到一个新的数组中         |
| 6    | public virtual void TrimToSize()               | 设置容量为 Queue 中元素的实际个数   |

## 点阵列（BitArray）

BitArray 类管理一个紧凑型的位值数组，它使用布尔值来表示，其中 true 表示位是开启的（1），false 表示位是关闭的（0）。

当您需要存储位，但是事先不知道位数时，则使用点阵列。您可以使用**整型索引**从点阵列集合中访问各项，索引从零开始。

### BitArray 类的属性

下表列出了 **BitArray** 类的一些常用的 **属性**：

| 属性       | 描述                                     |
| :--------- | :--------------------------------------- |
| Count      | 获取 BitArray 中包含的元素个数。         |
| IsReadOnly | 获取一个值，表示 BitArray 是否只读。     |
| Item       | 获取或设置 BitArray 中指定位置的位的值。 |
| Length     | 获取或设置 BitArray 中的元素个数。       |

### BitArray 类的方法

下表列出了 **BitArray** 类的一些常用的 **方法**：

| 序号 | 方法名                                   | 描述                                                                                           |
| :--: | :--------------------------------------- | ---------------------------------------------------------------------------------------------- |
|  1   | public BitArray And( BitArray value )    | 对当前的 BitArray 中的元素和指定的 BitArray 中的相对应的元素执行按位与操作                     |
|  2   | public bool Get( int index )             | 获取 BitArray 中指定位置的位的值                                                               |
|  3   | public BitArray Not()                    | 把当前的 BitArray 中的位值反转，以便设置为 true 的元素变为 false，设置为 false 的元素变为 true |
|  4   | public BitArray Or( BitArray value )     | 对当前的 BitArray 中的元素和指定的 BitArray 中的相对应的元素执行按位或操作                     |
|  5   | public void Set( int index, bool value ) | 把 BitArray 中指定位置的位设置为指定的值                                                       |
|  6   | public void SetAll( bool value )         | 把 BitArray 中的所有位设置为指定的值                                                           |
|  7   | public BitArray Xor( BitArray value )    | 对当前的 BitArray 中的元素和指定的 BitArray 中的相对应的元素执行按位异或操作                   |

# 泛型（Generic）

**泛型（Generic）** 允许您延迟编写类或方法中的编程元素的数据类型的规范，直到实际在程序中使用它的时候。换句话说，泛型允许您编写一个可以与任何数据类型一起工作的类或方法。

例如下面例子，来说明泛型：

```c#
using System;

namespace 泛型
{
    public class Number<T>
    {
        public T _number1;
        public T _number2;
    }

    internal class Program
    {
        private static void Main(string[] args)
        {
            Number<int> number = new Number<int>();
            number._number1 = 1;
            number._number2 = 2;
            Console.WriteLine(number._number1 + number._number2);
            Console.ReadKey();
        }
    }
}
```

## 泛型（Generic）的特性

使用泛型是一种增强程序功能的技术，具体表现在以下几个方面：

- 它有助于您最大限度地重用代码、保护类型的安全以及提高性能。
- 您可以创建泛型集合类。
- 您可以创建自己的泛型接口、泛型类、泛型方法、泛型事件和泛型委托。
- 您可以对泛型类进行约束以访问特定数据类型的方法。
- 关于泛型数据类型中使用的类型的信息可在运行时通过使用反射获取。

在声明泛型方法/泛型类的时候，可以给泛型加上一定的约束来满足我们特定的一些条件。泛型限定条件：

- T：结构（类型参数必须是值类型。可以指定除 Nullable 以外的任何值类型）
- T：类 （类型参数必须是引用类型，包括任何类、接口、委托或数组类型）
- T：new() （类型参数必须具有无参数的公共构造函数。当与其他约束一起使用时 new() 约束必须最后指定）
- T：<基类名> 类型参数必须是指定的基类或派生自指定的基类
- T：<接口名称> 类型参数必须是指定的接口或实现指定的接口。可以指定多个接口约束。约束接口也可以是泛型的。

# 匿名方法

我们已经提到过，委托是用于引用与其具有相同标签的方法。换句话说，您可以使用委托对象调用可由委托引用的方法。

**匿名方法（Anonymous methods）** 提供了一种传递代码块作为委托参数的技术。匿名方法是没有名称只有主体的方法。

在匿名方法中您不需要指定返回类型，它是从方法主体内的 return 语句推断的。

## 编写匿名方法的语法

匿名方法是通过使用 **delegate** 关键字创建委托实例来声明的。例如：

```
delegate void NumberChanger(int n);
...
NumberChanger nc = delegate(int x)
{
    Console.WriteLine("Anonymous Method: {0}", x);
};
```

代码块 **Console.WriteLine("Anonymous Method: {0}", x);** 是匿名方法的主体。

委托可以通过匿名方法调用，也可以通过命名方法调用，即，通过向委托对象传递方法参数。

> **注意:** 匿名方法的主体后面需要一个 **`;`**

# 不安全代码

当一个代码块使用 **unsafe** 修饰符标记时，C# 允许在函数中使用指针变量。**不安全代码**或非托管代码是指使用了**指针**变量的代码块。

## 指针变量

**指针** 是值为另一个变量的地址的变量，即内存位置的直接地址。就像其他变量或常量，您必须在使用指针存储其他变量地址之前声明指针。

指针变量声明的一般形式为：

```
type* var-name;
```

下面是指针类型声明的实例：

| 实例        | 描述                             |
| :---------- | :------------------------------- |
| `int* p`    | `p` 是指向整数的指针。           |
| `double* p` | `p` 是指向双精度数的指针。       |
| `float* p`  | `p` 是指向浮点数的指针。         |
| `int** p`   | `p` 是指向整数的指针的指针。     |
| `int*[] p`  | `p` 是指向整数的指针的一维数组。 |
| `char* p`   | `p` 是指向字符的指针。           |
| `void* p`   | `p` 是指向未知类型的指针。       |

## 编译不安全代码

为了编译不安全代码，您必须切换到命令行编译器指定 **/unsafe** 命令行。

例如，为了编译包含不安全代码的名为 prog1.cs 的程序，需在命令行中输入命令：

```
csc /unsafe prog1.cs
```

## fixed 关键字

由于 C#中声明的变量在内存中的存储受垃圾回收器管理；因此一个变量（例如一个大数组）有可能在运行过程中被移动到内存中的其他位置。如果一个变量的内存地址会变化，那么指针也就没有意义了。

解决方法就是使用 fixed 关键字来固定变量位置不移动。

```
static unsafe void Main(string[] args)
{
  fixed(int *ptr = int[5])  {//...}
}
```

### stackalloc

在 unsafe 不安全环境中，我们可以通过 stackalloc 在堆栈上分配内存，因为在堆栈上分配的内存不受内存管理器管理，因此其相应的指针不需要固定。

```
static unsafe void Main(string[] args)
{
  int *ptr = stackalloc int[1] ;
}
```

# 多线程

**线程** 被定义为程序的执行路径。每个线程都定义了一个独特的控制流。如果您的应用程序涉及到复杂的和耗时的操作，那么设置不同的线程执行路径往往是有益的，每个线程执行特定的工作。

线程是**轻量级进程**。一个使用线程的常见实例是现代操作系统中并行编程的实现。使用线程节省了 CPU 周期的浪费，同时提高了应用程序的效率。

## 线程生命周期

线程生命周期开始于 System.Threading.Thread 类的对象被创建时，结束于线程被终止或完成执行时。

下面列出了线程生命周期中的各种状态：

- **未启动状态**：当线程实例被创建但 Start 方法未被调用时的状况。
- **就绪状态**：当线程准备好运行并等待 CPU 周期时的状况。
- 不可运行状态
  - 已经调用 Sleep 方法
  - 已经调用 Wait 方法
  - 通过 I/O 操作阻塞
- **死亡状态**：当线程已完成执行或已中止时的状况。

## 主线程

在 C# 中，**System.Threading.Thread** 类用于线程的工作。它允许创建并访问多线程应用程序中的单个线程。进程中第一个被执行的线程称为**主线程**。

当 C# 程序开始执行时，主线程自动创建。使用 **Thread** 类创建的线程被主线程的子线程调用。您可以使用 Thread 类的 **CurrentThread** 属性访问线程。

# README

## 更新日志

{% folding 更新日志 %}

{% timeline 更新日志,orange %}

<!-- timeline 2023-5-23 -->

1. 在 “前言” 部分，新增了对代码规范的链接

<!-- endtimeline -->

<!-- timeline 2023-5-10 -->

1. 更新了 **线程** 更详细的用法
2. 在文章前面添加 **前言** 部分

<!-- endtimeline -->

{% endtimeline %}

{% endfolding %}
