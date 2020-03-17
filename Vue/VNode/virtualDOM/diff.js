import { isElementInstance, diffType } from './utils';

let GlobalIndex = 0;

/* diff 属性 */
function diffProps(oldProps, newProps) {
  /* 属性补丁对象 */
  const propPatch = {};

  /* 判断新旧节点属性的属性值是否相等 */
  for (const key in oldProps) {
    /* 如果新旧节点属性的属性值不等，则存入补丁对象 */
    if (oldProps[key] !== newProps[key]) {
      propPatch[key] = newProps[key];
    }
  }

  /* 如果旧节点中不存在新节点中的属性，则存入补丁对象 */
  for (const key in newProps) {
    if (!oldProps[key]) {
      propPatch[key] = newProps[key];
    }
  }

  /* 返回属性补丁对象 */
  return propPatch;
}

/* diff 子节点 */
function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, index) => {
    ergodicTree(child, newChildren[index], ++GlobalIndex, patches);
  });
}

function ergodicTree(oldIndexNode, newIndexNode, index, patches) {
  /* 当前层级对应的补丁集合 */
  const indexPatch = [];

  const { props, text, remove, replace } = diffType;

  /* 判断对应节点是否存在，不存在则代表删除 */
  if (!newIndexNode) {
    indexPatch.push({ type: remove, index });
  } else if (!isElementInstance(oldIndexNode) && !isElementInstance(newIndexNode)) {
    /* 判断是否是文本 */
    /* 判断文本是否相等 */
    if (oldIndexNode !== newIndexNode) {
      indexPatch.push({ type: text, newText: newIndexNode });
    }
  } else if (oldIndexNode.type === newIndexNode.type) {
    /* 判断当前层级的节点类型是否相等，如果相等就比较它们的属性 */
    /* 1.比较属性是否变化 */
    const newProps = diffProps(oldIndexNode.props, newIndexNode.props);

    /* 如果非空，则发生了变化，给当前层级的补丁集合存入【属性变化补丁对象】 */
    if (Object.keys(newProps).length > 0) {
      indexPatch.push({ type: props, newProps });
    }

    /* 2.比较子节点是否变化 */
    diffChildren(oldIndexNode.children, newIndexNode.children, patches);
  } else {
    indexPatch.push({ type: replace, newNode: newIndexNode });
  }

  /* 如果当前层级对应的补丁集合非空，则存入对应层级的总补丁对象 */
  if (indexPatch.length > 0) {
    patches[index] = indexPatch;
  }
}

const diff = (oldDOMTree, newDOMTree) => {
  /* 总补丁对象，当前层级 */
  const patches = {};

  /* 深度优先遍历DOM树 Depth first traversal */
  ergodicTree(oldDOMTree, newDOMTree, GlobalIndex, patches);

  /* 返回diff后的总补丁对象 */
  return patches;
};

export default diff;
