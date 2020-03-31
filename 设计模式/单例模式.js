function Singleton(name) {
  this.name = name;
}

Singleton.instance = null;

Singleton.prototype.getName = function() {
  console.log(this.name);
};

Singleton.createInstance = function(name) {
  !this.instance && (this.instance = new Singleton(name));
  return this.instance;
};

var instance = Singleton.createInstance("zhenzhen");
var instance2 = Singleton.createInstance("zhenzhen2");

console.log(instance);
console.log(instance2);
console.log(instance === instance2); // => true
