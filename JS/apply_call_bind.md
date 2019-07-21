## apply,call与bind
apply, call以及bind都是用于改变函数的执行上下文。
bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用。
apply、call 二者而言，作用完全一样，只是接受参数的方式不太一样，call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里
* 实现call

* 实现apply

* 实现一个自己的bind

```js
Function.prototype.my_bind = function(context,...args) {
    var self = this;
    return function() {
        self.apply(context, ...args);
    }
};
//测试用例
let var = "Jim"
let obj = {
    name:'Shibao'
}
function sayName(){
    console.log(this);
    console.log(this.name);
}
sayName();// window, Jim
let bindSayName = sayName.my_bind(obj);
bindSayName();//obj, Shibao
```