function arrayToTree(arr) {
  const ans = [];
  // iteration over all objects
  for (let obj of arr) {
    // get key name
    let keyName = "";
    for (let key in obj) {
      if (key !== "depth") {
        keyName = key;
        break;
      }
    }
 
    // use recursion to parse object
    let level = obj[keyName];
    // console.log(ans, obj);
    arrayToTreeHelper(ans, obj, keyName, level);
  }
 
  return ans;
}
 
function arrayToTreeHelper(ans, obj, keyName, level) {
  // base case, append to ans
  if (level.length === 1) {
    // find where to insert
    let pos = 0;
    let currentTitle = "";
    // get "title" of object already in ans
    for (let key in ans[pos]) {
      if (key !== "depth" && key !== "children") {
        currentTitle = ans[pos][key];
        break;
      }
    }
    while (pos < ans.length && obj[keyName] >= currentTitle) {
      // if encounter temporary object created before
      if (obj[keyName] === currentTitle) {
        ans[pos] = { children: ans[pos].children, ...obj };
        return;
      }
 
      // keep comparing key
      pos++;
      for (let key in ans[pos]) {
        if (key !== "depth" && key !== "children") {
          currentTitle = ans[pos][key];
          break;
        }
      }
    }
 
    // insert obj to pos
    ans.splice(pos, 0, obj);
    return;
  }
 
  // recursively find position to insert
  const currentLevel = parseInt(level.charAt(0)) - 1;
 
  // if ans[currentLevel] does not exist yet
  if (ans[currentLevel] === null || ans[currentLevel] === undefined) {
    // assign a temporary object
    ans[currentLevel] = { children: [] };
    ans[currentLevel][keyName] = obj[keyName].slice(
      0,
      obj[keyName].length - level.length + 1
    );
  }
 
  //   console.log(ans, currentLevel);
  if (ans[currentLevel].hasOwnProperty("children")) {
    arrayToTreeHelper(ans[currentLevel].children, obj, keyName, level.slice(2));
  } else {
    const children = [];
    ans[currentLevel]["children"] = children;
    arrayToTreeHelper(children, obj, keyName, level.slice(2));
  }
}