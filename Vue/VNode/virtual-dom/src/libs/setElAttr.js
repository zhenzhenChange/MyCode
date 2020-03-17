const setElAttr = (node, key, value) => {
  switch (key) {
    case 'value':
      if (node.nodeName === 'input' || node.nodeName === 'textarea') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
};

export default setElAttr;
