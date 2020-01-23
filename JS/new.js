// new操作符

//new操作符主要做了以下四件事情
// 1.创建一个空的Javascript对象（{}）;
// 2.链接该对象（即设置该对象的构造函数）到另一个对象;
// 3.将步骤1新创建的对象作为this的上下文;
// 4.如果该函数没有返回对象，则返回this;

//根据描述，我们可以实现一个new

const _new = function() {
  let constructor = Array.prototype.shift.call(arguments);
  let args = arguments;
  const obj = new Object();
  obj.__proto__ = constructor.prototype;
  constructor.call(obj, ...args);
  return obj;
};
