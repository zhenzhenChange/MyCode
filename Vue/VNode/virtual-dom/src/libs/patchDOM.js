import setElAttr from './setElAttr';
import { render } from './element';
import { isElementInstance, diffType } from './utils';

let GlobalIndex = 0;

function doPatch(node, patches) {
  const parentNode = node.parentNode;
  const { props, text, remove, replace } = diffType;
  patches.forEach(patch => {
    const { type, newProps, newText, newNode } = patch;
    let newEl = isElementInstance(newNode) ? render(newNode) : document.createTextNode(newNode);
    switch (type) {
      case props:
        if (newProps) {
          for (const key in newProps) {
            const value = newProps[key];
            if (value) {
              setElAttr(node, key, value);
            } else {
              node.removeAttribute(key);
            }
          }
        }
        break;
      case text:
        node.textContent = newText;
        break;
      case remove:
        parentNode.removeChild(node);
        break;
      case replace:
        parentNode.replaceChild(newEl, node);
        break;
      default:
        break;
    }
  });
}

function patchDOM(dom, patches) {
  const indexPatch = patches[GlobalIndex++];
  const childNodes = dom.childNodes;

  /* 后序遍历，从子节点开始打补丁 */
  Array.from(childNodes).forEach(child => patchDOM(child, patches));

  /* 判断当前层级是否含有补丁 */
  if (Array.isArray(indexPatch)) {
    doPatch(dom, indexPatch);
  }
}

export default patchDOM;
