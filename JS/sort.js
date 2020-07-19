// 交换位置
const swap = (arr, i,j)=> {
  let temp = arr[j];
  arr[j] = arr [i];
  arr[i] = temp;
  return arr;
}
// 选择排序
const selectSort = function(array) {
  let minIndex;
  for (i = 0; i < array.length; i++) {
    minIndex = i;
    for (let j= i + 1; j<array.length;j++) {
      if (array[j] < array[minIndex]) {
          minIndex = j;
      }
    }
    swap(array, i, minIndex);
  }
  return array;
}

const testArray0 = [1, 6, 3, 7, 7, 2, 9];
console.log(selectSort(testArray0));

//冒泡
const bubbleSort = function(array) {
  if (array.length <= 1) {
    return array;
  }
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
};
const testArray1 = [1, 6, 3, 7, 7, 2, 9];
console.log(bubbleSort(testArray1));
//快排
const quickSort = function(array) {
  if (array.length <= 1) {
    return array;
  }
  let leftArr = [];
  let rightArr = [];
  let baseIndex = Math.floor(array.length / 2);
  let base = array.splice(baseIndex, 1)[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > base) {
      rightArr.push(array[i]);
    } else {
      leftArr.push(array[i]);
    }
  }
  return quickSort(leftArr).concat(base, quickSort(rightArr));
};
const testArray2 = [1, 6, 3, 7, 7, 2, 9];
console.log(quickSort(testArray2));
