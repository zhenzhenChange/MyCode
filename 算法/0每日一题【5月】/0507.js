/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 0572.另一个树的子树（DFS暴力匹配）
 *
 * 时间复杂度：O(|s|x|t|)
 * 空间复杂度：O(max{ds,dt} d -> depth)
 *
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function (s, t) {
  function isSameTree(s, t) {
    if (!s && !t) return true;

    return s && t && s.val == t.val && isSameTree(s.left, t.left) && isSameTree(s.right, t.right);
  }

  if (!s && !t) return true;

  if (!s && t) return false;

  return isSameTree(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const s = new TreeNode(3);
const sLeft = new TreeNode(4);
sLeft.left = 1;
sLeft.right = 2;
s.left = sLeft;
s.right = 5;
console.log(s);

const t = new TreeNode(4);
t.left = 1;
t.right = 2;
console.log(t);

console.log(isSubtree(s, t));
