/**
 * 买卖股票的最佳时机 II
 *
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  var profit = 0;
  var len = prices.length;
  for (var i = 0; i < len; i++) {
    var curr = prices[i];
    var next = prices[i + 1];
    if (curr < next) {
      profit += next - curr;
    }
  }
  return profit;
};

var arr = [7, 1, 5, 3, 6, 4];
var res = maxProfit(arr);
console.log(res);
