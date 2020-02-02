## JS 中的 this 指向问题

this 指向是 JS 中的重要概念，有助于帮助我们理解函数的执行。

- this 基本概念

  一句话来概括，this 就是函数的执行上下文，可以把它理解成一个指针，指向调用函数的对象。根据它的使用方式，可以分为四种绑定方式。

  1.显示绑定

  2.隐式绑定

  3.默认绑定

  4.new 绑定

- 显示绑定

显示绑定就是通过 call, apply, bind 方法，显示地指定 this 的指向。

call,apply 与 bind 的第一个参数就是所要绑定的对象，call,apply 与 bind 不同的是，call 与 apply 会立即执行这个函数得到结果，而 bind 则会返回一个函数，而 call 与 apply 在传参上也有差异，call 需要显示传入所有参数，而 apply 传入一个参数数组。两者在性能上也有区别，与本主题无关，这里暂不讨论。

以下是一个显示绑定的例子

```js
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "Wushibao"
};
var name = "Jim";
sayHi.call(person); //"Hello, Wushibao"
```

- 隐式绑定

隐式绑定通常以 XXX.fun()的形式出现，即函数的指向会被绑定到它的上下文对象。来看一段代码

```js
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "Wushibao",
  sayHi: sayHi
};
var name = "Jim";
person.sayHi();
```

打印的结果是 Hello, Wushibao.

当有多层对象属性链时，只有最后一层会影响结果

```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person2 = {
  name: "James",
  sayHi: sayHi
}
var person1 = {
  name: "Paul"
  friend: person2
}
person1.friend.sayHi()
```

打印结果： Hello, James。

即无论有多少层对象，我们只关注最后一层，即此处的 friend。

但是隐式绑定有一个问题，会存在丢失的情况，如下：

```js
function sayHi() {
  console.log("Hello,", this.name);
}
var person = {
  name: "Wushibao",
  sayHi: sayHi
};
var name = "Jim";
var Hi = person.sayHi;
Hi();
```

此时输出：Hello, Jim。

除了上述这种丢失之外，隐式丢失还会发生在回调函数中，来看一个例子

```js
function sayHi() {
  console.log("Hello,", this.name);
}
var person1 = {
  name: "Wushibao",
  sayHi: function() {
    setTimeout(function() {
      console.log("Hello,", this.name);
    });
  }
};
var name = "Jim";
person1.sayHi();
```

此时，并为输出 Hello, Wushibao 而是输出 Hello,Jim。表明在回调函数中 this 也存在隐式丢失的情况

所以在判断 this 指向时要注意隐式丢失的情况

- 默认绑定

在不应用以上两种规则的情况下，采用默认绑定。

```js
function sayHi() {
  console.log("Hello,", this.name);
}
var name = "Wushibao";
sayHi();
```

在调用 sayHi()函数时，此时 this 默认指向全局对象（非严格模式下），严格模式下，this 指向 undefined，undefined 上没有 this 对象，会报错。

在浏览器环境下，输出的结果就是 Hello,Wushibao

- new 绑定

在阐述 new 绑定之前，来先看一下 new 操作符做了什么事情。

1.创建一个新的对象

2.将 this 指向这个新对象

3.执行构造函数的代码

4.将对象的 proto 属性设置为构造函数的原型对象

5.返回新对象

所以，在使用 new 调用函数的时候，会将新对象绑定到这个函数的 this 上。

```js
function sayHi(name) {
  this.name = name;
}
var Hi = new sayHi("Wushibao");
console.log("Hello,", Hi.name);
```

此时，输出 Hello: Wushibao

- 绑定优先级

new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

- 箭头函数的 this

箭头函数是 ES6 中新增特性，与普通函数不同的是，箭头函数没有自己的 this，它继承自外层的 this。来看一个例子

```js
var obj = {
  say: () => {
    console.log(this);
  }
};
obj.say();
```

此时，在浏览器的环境下输出 window。因为正如之前所说的，箭头函数 this 继承自外层的 this。

关于 this，暂且先写到这里。
