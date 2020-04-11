function ASM(stdlib, foreign, heap) {
  'use asm';
  var arr = new stdlib.Int32Array(heap);

  function foo(x, y) {
    x = x | 0;
    y = y | 0;
    var i = 0;
    var p = 0;
    var sum = 0;
    var count = ((y | 0) - (x | 0)) | 0;

    for (i = x | 0; (i | 0) < (y | 0); p = (p + 8) | 0, i = (i + 1) | 0) {
      arr[p >> 3] = (i * (i + 1)) | 0;
    }

    for (i = 0, p = 0; (i | 0) < (count | 0); p = (p + 8) | 0, i = (i + 1) | 0) {
      sum = (sum + arr[p >> 3]) | 0;
    }

    return +(sum / count);
  }

  return { foo };
}
var heap = new ArrayBuffer(0x1000);
var foo = ASM(window, null, heap).foo;
foo(10, 20);
