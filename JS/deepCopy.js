//实现深拷贝
//方法一：常规实现
var testObj = {
    a: {
        b: 1
    }
};
var deepCopy = function(obj) {
    var newObj = Array.isArray(obj) ? []: {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] == "object") {
                newObj[key] = deepCopy(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}

var copyTestObj = deepCopy(testObj);
testObj.a.b = 2;
console.log(copyTestObj); //{ a: { b: 1 } }

//方法二：利用JSON方法实现
var deepCopy2 = function(obj) {
    var _obj = JSON.stringify(obj);
    var objClone = JSON.parse(_obj);
    return objClone;
}
var copyTestObj2 = deepCopy(testObj);
testObj.a.b = 3;
console.log(copyTestObj2); //{ a: { b: 2 } }

//值得一提的是，利用Object.assign完成的是浅拷贝;
//因为Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用
var copyTestObj3 = Object.assign({}, testObj);
console.log(copyTestObj3); //{ a: { b: 2 } }
