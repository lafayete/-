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