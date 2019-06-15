//防抖：多次触发，重新计时

var deBonce = function(fn, wait) {
    let timer;
    return function() {
        const args = [].slice.call(arguments,2);
        if (timer != undefined) {
            clearTimeout(timer);
        } else {
            timer = setTimeout(()=>{
                fn.call(this, args);
            }, wait)
        }
    }
}

//节流：多次触发，只执行一次

var throttle = function(fn, wait) {
    let start = Date.now();
    return function() {
        const args = [].slice.call(arguments,2);
        var end = Date.now();
        if (end - start > wait) {
            fn.apply(this, args);
            start = end;
        }
    }
}