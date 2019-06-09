//斐波纳契数列求和的JS饭缸及优化

var fibonacci = function(n) {
    if (n ==0 || n ==1) {
        return n;
    }
    return fibonacci(n-1) + f(n-2);
}
//该方法效率低下，会重复求值

//利用缓存进行优化
var fibonacci = function(n) {
    var memory = [];
    return function(n) {
        if (memory[n] != undefined) {
            return memory[n];
        } else {
            memory[n] = (n ==0 || n==1 ) ? n: fibonacci(n-1) + fibonacci(n-2);
        }
    }
}

//利用动态规划法进行优化
function fibonacci(n) {
    let n1 = 1,
        n2 = 1,
        sum = 1
    for(let i = 3; i <= n; i += 1) {
        sum = n1 + n2
        n1 = n2
        n2 = sum
    }
    return sum
}

//尾递归优化
//尾递归因为只调用自身，所以比必要保存外层函数的调用记录，能节省内存，参考http://www.ruanyifeng.com/blog/2015/04/tail-call.html 
'use strict'
function fibonacci(n, n1, n2) {
    if(n <= 1) {
        return n2
    }
    return fibonacci(n - 1, n2, n1 + n2)
}