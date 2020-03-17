import setElAttr from './setElAttr';

class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

const createElement = (type, props, children) => {
  return new Element(type, props, children);
};

const render = vnode => {
  const { type, props, children } = vnode;

  const el = document.createElement(type);

  const keys = Object.keys(props);

  keys.forEach(key => {
    setElAttr(el, key, props[key]);
  });

  const frg = document.createDocumentFragment();
  children.forEach(child => {
    if (child instanceof Element) {
      frg.appendChild(render(child));
    } else {
      frg.appendChild(document.createTextNode(child));
    }
  });
  el.appendChild(frg);

  return el;
};

const renderDOM = (dom, target) => {
  target.appendChild(dom);
};
export { createElement, render, renderDOM, Element };
