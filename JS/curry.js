//函数柯里化

const curry = (fn, arr=[]) => {
    return (...args) => {
        if ([...arr,...args].length = fn.length) {
            fn(...arr,...args);//拓展参数，调用fn
        } else {
            return curry(fn, [...arr,...args]); //迭代，传入现有的所有参数
        }
    }
};
