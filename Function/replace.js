function myReplace(reg, callback) {
  const handler = (str, oldVal, newVal) => {
    const index = str.indexOf(oldVal);
    return str.substring(0, index) + newVal + str.substring(index + oldVal.length);
  };

  /* => 备份调用者、判断是否含有标识符g、捕获组（捕获不到则为null） */
  let [cloneStr, isGlobal, arr] = [this.slice(0), reg.global, reg.exec(this)];

  while (arr) {
    const [res, [content]] = [callback(...arr), arr];
    cloneStr = handler(cloneStr, content, res);
    arr = reg.exec(this);

    if (!isGlobal) break;
  }

  return cloneStr;
}

String.prototype.myReplace = myReplace;

const str = "{0}年{1}月{2}日";
const arr = [2020, 03, 20];
const newStr = str.myReplace(/\{(\d)\}/g, (content, group) => `#${arr[group]}`);
console.log(newStr);
