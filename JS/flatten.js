//实现数组拍平[1,2,[3,4,[5]],6] => [1,2,3,4,5,6];
//原始实现
var testArr = [1,2,[3,4,[5]],6];
var flatten = function (arr) {
    var newArr = [];
    for (var i = 0; i<arr.length;i++) {
        if (Array.isArray(arr[i])) {
            newArr = newArr.concat(flatten(arr[i]));
        } else {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

console.log(flatten(testArr));

//运用ES6展开符

var flatten = arr => {
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    },[])
};

console.log(flatten(testArr));

//运动ES6数组中的flat方法
console.log(testArr.flat());//[1,2,3,4,[5],6]
//默认只展开一层，指定参数为Infinity，可以展开任意深度的嵌套数组
console.log(testArr.flat(Infinity));//[1,2,3,4,5,6];

