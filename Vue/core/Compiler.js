class Compiler {
  constructor(el, vm) {
    // 获取元素
    this.$el = this.isElement(el) ? el : document.querySelector(el);

    // 缓存实例
    this.$vm = vm;

    if (this.$el) {
      // 将节点转换成文档碎片，进一步编译模板
      this.$frg = this.nodeTransformFrg(this.$el);

      // 编译函数
      this.compile(this.$frg);

      // 再追加回原来的位置
      this.$el.appendChild(this.$frg);
    }
  }

  /* 文档节点转换为文档碎片 */
  nodeTransformFrg(el) {
    // 创建文档碎片
    const frg = document.createDocumentFragment();

    // 循环将节点里的第一个子节点从dom中移除，添加至文档碎片
    while (el.firstChild) {
      frg.appendChild(el.firstChild);
    }

    // 返回文档碎片
    return frg;
  }

  /*
   * TODO
   * 1.对象中的对象数据访问 {{ xxx.xxx }}
   * 2.多个插值的编译 {{ xxx }} {{ xxx }}
   *
   */

  /* 主编译函数 */
  compile(frg) {
    // 缓存文档碎片中的子节点
    const nodes = frg.childNodes;

    // 将子节点对象数组转换成常规数组遍历
    Array.from(nodes).forEach(node => {
      // 判断是否为元素节点
      if (this.isElement(node)) {
        // 如果当前元素节点还有子节点
        if (node.childNodes.length !== 0) {
          // 递归执行
          this.compile(node);
        }

        // 缓存元素节点的属性对象集合
        const attrs = node.attributes;

        // 将属性对象集合转换成常规数组遍历
        Array.from(attrs).forEach(attr => {
          // 缓存属性名
          const attrName = attr.name;

          // 属性值（也就是 data 数据对象中的属性名）
          const exp = attr.value;

          // 判断是否为指令 z-html / z-text ...
          if (this.isDirective(attrName)) {
            // 截取 z- 之后的字符串 html / text
            const dir = attrName.substring(2);

            // 若为内置指令，执行内置指令
            this[dir] && this[dir](node, this.$vm, exp);
          }

          // 判断是否为事件 @click / @onchange...
          if (this.isEvent(attrName)) {
            // 截取 @ 之后的字符串 click / onchange
            const dir = attrName.substring(1);

            // 注册事件处理程序
            this.eventHandler(node, this.$vm, exp, dir);
          }
        });
        // 判断是否为插值文本 {{ xxx }}
      } else if (this.isInterpolation(node)) {
        /* const reg = /\{\{(.+?)\}\}/g;
        node.textContent.replace(reg, (_, $) => {
          this.update(node, this.$vm, $.trim(), "text");
        }); */
        /*
         * 编译文本，正则捕获组去空格 /\{\{(.*)\}\}/g $1则是 .* 部分
         * 如：{{ name }}
         * $1 则为 name
         */
        this.update(node, this.$vm, RegExp.$1.trim(), "text");
      }
    });
  }

  /*
   * 事件处理程序注册
   * @param: node   ==> 要注册的节点
   * @param: vm     ==> ZhenVue实例
   * @param: exp    ==> 事件处理函数，在实例(vm)的配置对象(options)中的方法集合(methods)里获取
   * @param: dir    ==> 事件的类型，如：change、input、click
   *
   */
  eventHandler(node, vm, exp, dir) {
    node.addEventListener(dir, vm.$options.methods[exp].bind(vm));
  }

  /* 抽象更新函数（更新的节点node、实例、数据对象中的属性exp、更新类型dir） */
  update(node, vm, exp, dir) {
    // 拿到更新类型的函数
    const updateFn = this[`${dir}Update`];

    // 初始化
    updateFn(node, vm[exp]);

    // 依赖收集、给属性创建监听者
    new Watcher(vm, exp, function(val) {
      // 订阅发布者的更新
      updateFn(node, val);
    });
  }

  /* z-model 指令，双向数据绑定 */
  model(node, vm, exp) {
    // 调用抽象更新方法，更新的类型是双向数据绑定 model
    this.update(node, vm, exp, "model");

    // 同时给当前设置了 model 指令的 node 节点注册监听事件，他的值改变时，也改变当前属性的值，从而触发 Dep 更新
    node.addEventListener("input", function(event) {
      vm[exp] = event.target.value;
    });
  }

  modelUpdate(node, value) {
    node.value = value;
  }

  /* z-html 指令 */
  html(node, vm, exp) {
    this.update(node, vm, exp, "html");
  }

  htmlUpdate(node, html) {
    node.innerHTML = html;
  }

  /* z-text 指令  */
  text(node, vm, exp) {
    this.update(node, vm, exp, "text");
  }

  textUpdate(node, value) {
    node.textContent = value;
  }

  /* 元素节点判断 */
  isElement(node) {
    return node.nodeType === 1;
  }

  /* 插值文本判断 */
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/g.test(node.textContent);
  }

  /* 指令判断 */
  isDirective(attr) {
    return attr.startsWith("z-");
  }

  /* 事件判断 */
  isEvent(attr) {
    return attr.startsWith("@");
  }
}
