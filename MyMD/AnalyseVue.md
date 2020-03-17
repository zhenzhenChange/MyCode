# 剖析Vue

## Vue 2.x 实现

```javascript
		 name：<span id="spanname"></span><br />
    	<input type="text" id="inputname" />
    	
      /*
       * 1.需要对数据深拷贝
       * 2.需要对每一个属性进行监听
       * 3.如果对象上没有的属性，使用了其他方法添加，如：this.obj.age = 22，则不会被监听到，需要使用 this.$set 方法手动添加监听
       * data() {
       *	return {
       *		obj: {}
       *	}
       * }
       */
		var obj = {
        name: "xiaozhenzhen",
      };

      var cloneObj = JSON.parse(JSON.stringify(obj));
      var cloneObj = {
        ...obj,
      };

      Object.defineProperty(obj, "name", {
        get() {
          return cloneObj.name;
        },
        set(val) {
          if (cloneObj.name === val) return;
          cloneObj.name = val;
          observe();
        },
      });

      function observe() {
        spanname.innerText = obj.name;
        inputname.value = obj.name;
      }

      setTimeout(() => {
        obj.name = "oucaiying";
      }, 1000);

      inputname.oninput = function() {
        obj.name = inputname.value;
      };
```





## Vue 3.x 实现

```javascript
		 var obj = {};
      
		 /* 
		  * 1.不需要对数据进行拷贝
		  * 2.监听整体对象
		  */
      obj = new Proxy(obj, {
        get(target, prop) {
          return target[prop];
        },
        set(target, prop, value) {
          target[prop] = value;
          observe();
        },
      });

      function observe() {
        spanname.innerText = obj.name;
        inputname.value = obj.name;
      }

      setTimeout(() => {
        obj.name = "oucaiying";
      }, 1000);

      inputname.oninput = function() {
        obj.name = inputname.value;
      };
```

