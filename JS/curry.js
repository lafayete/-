//函数柯里化
function add(x,y,z) {
    return x+y+z;
  };

const curry = function(fn, arr = []) {
    return (...args) => {
      if ([...arr,...args].length == fn.length) {
        return fn(...arr,...args);
      } else {
        return curry(fn,[...arr,...args]);
      }
    }
  }

const addCurry = curry(add);

console.log(addCurry(1,2)(3));