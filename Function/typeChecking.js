const typeGather = Object.create(null);
const typeFuncs = Object.create(null);
const toString = Object.prototype.toString;

/* 原始类型 */
Reflect.set(typeGather, "isNull", "Null");
Reflect.set(typeGather, "isNumber", "Number");
Reflect.set(typeGather, "isString", "String");
Reflect.set(typeGather, "isSymbol", "Symbol");
Reflect.set(typeGather, "isBoolean", "Boolean");
Reflect.set(typeGather, "isUndefined", "Undefined");

/* 内置对象 or 引用类型 */
Reflect.set(typeGather, "isSet", "Set");
Reflect.set(typeGather, "isMap", "Map");
Reflect.set(typeGather, "isMath", "Math");
Reflect.set(typeGather, "isJSON", "JSON");
Reflect.set(typeGather, "isDate", "Date");
Reflect.set(typeGather, "isError", "Error");
Reflect.set(typeGather, "isArray", "Array");
Reflect.set(typeGather, "isRegExp", "RegExp");
Reflect.set(typeGather, "isWindow", "Window");
Reflect.set(typeGather, "isObject", "Object");
Reflect.set(typeGather, "isFunction", "Function");

Reflect.ownKeys(typeGather).forEach(key => {
  typeFuncs[key] = val => toString.call(val) === `[object ${Reflect.get(typeGather, key)}]`;
});

console.log(typeFuncs.isNull(null)); // => "[object Null]"
console.log(typeFuncs.isNumber(123)); // => "[object Number]"
console.log(typeFuncs.isNumber(NaN)); // => "[object Number]"
console.log(typeFuncs.isString("str")); // => "[object String]"
console.log(typeFuncs.isBoolean(true)); // => "[object Boolean]"
console.log(typeFuncs.isUndefined(undefined)); // => "[object Undefined]"
console.log(typeFuncs.isSymbol(Symbol("Symbol"))); // => "[object Symbol]"

console.log(typeFuncs.isDate(new Date())); // => "[object Date]"
console.log(typeFuncs.isRegExp(/^hello/)); // => "[object RegExp]"
console.log(typeFuncs.isArray(["/^hello/"])); // => "[object Array]"
console.log(typeFuncs.isFunction(Window)); // => "[object Function]"
console.log(typeFuncs.isFunction(() => {})); // => "[object Function]"
console.log(typeFuncs.isFunction(function() {})); // => "[object Function]"
console.log(typeFuncs.isObject({ name: "zhenzhen" })); // => "[object Object]"

console.log(typeFuncs.isMath(Math)); // => "[object Math]"
console.log(typeFuncs.isSet(new Set())); // => "[object Set]"
console.log(typeFuncs.isMap(new Map())); // => "[object Map]"
console.log(typeFuncs.isWindow(this)); // => "[object Window]"
console.log(typeFuncs.isWindow(window)); // => "[object Window]"
console.log(typeFuncs.isJSON(JSON)); // => "[object JSON]"
console.log(typeFuncs.isError(new Error())); // => "[object Error]"
