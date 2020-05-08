/**
 * 0983.最低票价（动态规划）
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 *
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
  const set = new Set(days);
  const end = days[days.length - 1];
  const dp = new Array(end + 1).fill(0);

  for (let i = 1; i < dp.length; i++) {
    if (!set.has(i)) {
      dp[i] = dp[i - 1];
      continue;
    }

    dp[i] = dp[i - 1] + costs[0];

    const j = i >= 7 ? i - 7 : 0;
    const k = i >= 30 ? i - 30 : 0;

    dp[i] = Math.min(dp[i], dp[j] + costs[1], dp[k] + costs[2]);
  }

  return dp[end];
};

var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31];
var costs = [2, 7, 15];

console.log(mincostTickets(days, costs));
