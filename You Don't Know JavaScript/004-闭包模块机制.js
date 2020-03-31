/* => 模块机制 */
function foo() {
  var a = 2;
  var b = [1, 2, 3];

  function bar() {
    console.log(a);
  }

  function baz() {
    console.log(b.join("-"));
  }

  return { bar, baz };
}

var result = foo();

result.bar();
result.baz();

/* => 单例模式 */
var single = (function foo() {
  var a = 2;
  var b = [1, 2, 3];

  function bar() {
    console.log(a);
  }

  function baz() {
    console.log(b.join("-"));
  }

  return { bar, baz };
})();

single.bar();
single.baz();

/* => 现代模块机制 */
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0, len = deps.length; i < len; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return { define, get };
})();

MyModules.define("bar", [], function() {
  function hello(who) {
    return `我是${who}！`;
  }

  return { hello };
});

MyModules.define("foo", ["bar"], function(bar) {
  var msg = "zhenzhen";

  function awesome() {
    console.log(bar.hello(msg).toUpperCase());
  }

  return { awesome };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(bar.hello("js"));
foo.awesome();
