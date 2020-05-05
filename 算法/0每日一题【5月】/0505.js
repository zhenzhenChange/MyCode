/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 0098.验证二叉搜索树（中序遍历）
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const stack = [];
  let prev = -Infinity;

  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();

    if (root.val <= prev) return false;

    prev = root.val;

    root = root.right;
  }

  return true;
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const root = new TreeNode(2);
root.left = 1;
root.right = 3;
console.log(root);

console.log(isValidBST(root));
