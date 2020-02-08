## JS 中的继承

JS 并不是一门面向对象语言，其继承方式主要通过原型链来实现。

- 原型链继承

```js
function Father() {
  this.name = "wushibao";
}

function Son() {}
Son.prototype = new Father();
const son = new Son();
console.log(son.name); // wushibao
```

通过原型链模式可以非常容易地实现继承，但是这种方式有两个缺点：
一. 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;

```js
function Father() {
  this.colors = ["white", "red", "blue"];
}

function Son() {}
Son.prototype = new Father();
const son1 = new Son();
son1.colors.push("green");
const son2 = new Son();
console.log(son2.colors); // [ 'white', 'red', 'blue', 'green' ]
```

二. 在创建子类型(例如创建 Son 的实例)时,不能向超类型(例如 Father)的构造函数中传递参数.

- 借用构造函数继承

在子类中调用父类的构造函数

```js
function Father() {
  this.colors = ["white", "red", "blue"];
}

function Son() {
  Father.call(this); //继承了Father,且向父类型传递参数
}

const son1 = new Son();
son1.colors.push("green");
console.log(son1.colors); // [ 'white', 'red', 'blue', 'green' ]
const son2 = new Son();
console.log(son2.colors); // [ 'white', 'red', 'blue']
```

使用构造函数来完成，虽然能避免原型链继承的缺点，但是由于所有的方法必须在构造函数中定义，所以函数复用也就不可能了。

- 组合继承

将原型链继承和借用构造函数继承组合到一起，发挥二者之长。基本做法：使用原型链实现对原型属性和方法的继承,通过借用构造函数来实现对实例属性的继承.

```js
function Father(name) {
  this.name = name;
  this.colors = ["white", "red", "blue"];
}
Father.prototype.sayName = function() {
  console.log(this.name);
};
function Son(name) {
  Father.call(this, name);
}
Son.prototype = new Father();

const son1 = new Son("Jim");

son1.colors.push("green");
console.log(son1.colors);
son1.sayName(); // 'Jim'

const son2 = new Son("Tom");
console.log(son2.colors);
son2.sayName(); // 'Tom'
```

组合继承避免了原型链和借用构造函数的缺陷,融合了它们的优点,成为 JavaScript 中最常用的继承模式。唯一的缺点在于，调用了两次父类构造函数，造成了不必要的浪费。

- 原型继承

其主要思想是在 object 函数内部，先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时对象的一个实例。

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

从本质上讲, object() 对传入其中的对象执行了一次浅复制. 下面我们来看看为什么是浅复制。

```js
const person = {
  friends: ["Jim", "Tom"]
};
const another1 = object(person);
another1.friends.push("James");
const another2 = object(person);
console.log(another2.friends);
```

- 寄生式继承

寄生式继承的思路与(寄生)构造函数和工厂模式类似, 即创建一个仅用于封装继承过程的函数,该函数在内部以某种方式来增强对象,最后再像真的是它做了所有工作一样返回对象。

```js
function another(o) {
  const clone = object(o);
  clone.sayHi = function() {
    alert("Hi");
  };
  return clone;
}
```

新生成的对象不仅具有原对象的所有属性和方法，而且还具备自己的方法，相当于被增强了。

- 寄生组合式继承

前面说过，组合继承的问题在于开销太大，会调用两次父类的构造函数。而寄生组合的方式能有效改进这一点。其主要做法就是子类的原型指向父类副本的实例从而实现原型共享。

```js
const superClass = function() {};
function inherit(subClass, superClass) {
  var prototype = object(superClass.prototype); //创建对象
  prototype.constructor = subClass; //增强对象
  subClass.prototype = prototype; //指定对象
}
```

以上就是 JS 实现继承的方式。
