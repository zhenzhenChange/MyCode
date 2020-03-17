/* 数组排序 */
let arr = [12, 23, 12, 15, 1, 25, 23, 25, 14, 16];

/* --------------------------------------------- */

/* 冒泡排序 */
function bubbleSort(array) {
  let temp;
  const len = array.length;

  // len - 1 排序的最大轮数
  for (let i = 0; i < len - 1; i++) {
    // len - 1 - i 减去已排序的轮数
    for (let j = 0; j < len - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

/* --------------------------------------------- */

/* 插入排序 */
function insertionSort(array) {
  // 新建容器
  const newArr = [];

  // 先取第一项
  newArr.push(array[0]);

  // 从第二项开始取
  for (let i = 1; i < array.length; i++) {
    // 从新容器的末尾开始比较
    for (let j = newArr.length - 1; j >= 0; j--) {
      // 如果原数组中取出的项大于新容器中取出的项
      if (array[i] > newArr[j]) {
        // 在新容器的当前项的下一个位置插入原数组中取出的当前项
        newArr.splice(j + 1, 0, array[i]);

        // 结束本层循环，并跳到外层循环进行下一轮循环
        break;
      }

      // 如果以上规则不符合，则匹配到了第一项，在第一个位置插入
      if (j === 0) {
        newArr.unshift(array[i]);
      }
    }
  }

  return newArr;
}

/* --------------------------------------------- */

/* 快速排序 */
function quickSort(array) {
  // 如果数组长度小于等于1，结束递归
  if (array.length <= 1) return array;

  // 取出数组中间项
  const midIndex = Math.floor(array.length / 2);
  const midValue = array.splice(midIndex, 1)[0];

  // 创建左右两个数组
  const leftArr = [];
  const rightArr = [];

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    // 如果当前项小于数组中间项，则放在左数组，否则放在右数组
    item < midValue ? leftArr.push(item) : rightArr.push(item);
  }

  // 递归处理左右数组，并且按照左中右的方式连接返回的数组
  return quickSort(leftArr).concat(midValue, quickSort(rightArr));
}

/* --------------------------------------------- */
