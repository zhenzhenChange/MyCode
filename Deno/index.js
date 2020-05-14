console.log(Deno.args);

const obj = {};
obj.A = 10;
obj.B = 'Hello';
console.log(Deno.inspect(obj, { colors: true }));
console.log(obj);

console.log(Deno.version);
console.log(typeof Deno);
