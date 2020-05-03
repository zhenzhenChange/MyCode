/**
 * Definition for singly-linked list. 定义单链表
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 0021.合并两个有序链表（迭代）
 *
 * 时间复杂度：O(m + n)
 * 空间复杂度：O(1)
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  const head = new ListNode();
  let prev = head;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      prev.next = l1;
      l1 = l1.next;
    } else {
      prev.next = l2;
      l2 = l2.next;
    }

    prev = prev.next;
  }

  prev.next = l1 ? l1 : l2;

  return head.next;
};
