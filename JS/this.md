## JS 中的 this 指向问题

this 指向是 JS 中的重要概念，有助于帮助我们理解函数的执行。

- this 基本概念
  一句话来概括，this 就是函数的执行上下文，可以把它理解成一个指针，指向调用函数的对象。根据它的使用方式，可以分为四种绑定方式。

  1.显示绑定

  2.隐式绑定

  3.默认绑定

  4.new 绑定

* 显示绑定

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
