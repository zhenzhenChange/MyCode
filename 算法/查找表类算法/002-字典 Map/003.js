/**
 * 同构字符串
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const mapS = new Map();
  const mapT = new Map();

  let i = 0;

  while (i < s.length) {
    const charS = s.charAt(i);
    const charT = t.charAt(i);

    if (mapS.get(charS) == mapT.get(charT)) {
      mapS.set(charS, i);
      mapT.set(charT, i);
    } else {
      return false;
    }

    i++;
  }

  return true;
};

var s = 'foo';
var t = 'bar';
console.log(isIsomorphic(s, t));
