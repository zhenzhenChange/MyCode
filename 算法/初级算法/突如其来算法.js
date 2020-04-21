// 实现如下算法：对一组数字首先按数字按重量排序 重量相同的 按字典（ASCII）排序
// 重量排序：每一个数的 个十百千万。。位相加后，进行从小到大排序

// var arr = [56, 65, 560, 650, 100, 47, 74];
// 11,11,11,11,1,11,11

var arr = [42321, 45213, 674313, 2, 6613, 6423, 123, 456];
// 12、15、24、2、16、15、6、15

function sort(arr) {
  const newArr = [];

  // 1.遍历前先排序，不传参数默认就是按 ASCII 码排序
  arr.sort();

  // 2.遍历每一项
  arr.forEach((v, i) => {
    var result = 0;

    // 3.转化成字符串数组，再遍历每一项，转化成数字相加
    [...String(v)].map((s) => {
      result += Number(s);
    });

    // 4.将索引和结果一一对应存入临时数组
    newArr.push({ i, result });
  });

  // 5.按 result 排序，返回排序后的属性 i
  var sortResult = Object.keys(newArr).sort((a, b) => newArr[a].result - newArr[b].result);

  newArr.length = 0;

  // 6.遍历排序后的索引结果，依次存入临时数组
  sortResult.forEach((v) => newArr.push(arr[Number(v)]));

  return newArr;
}

var result = sort(arr);
console.log(result);
