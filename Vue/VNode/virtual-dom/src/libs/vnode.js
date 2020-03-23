import diff from './diff';
import patchDOM from './patchDOM';
import { createElement, render, renderDOM } from './element';

const virtualDOM = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, [1]),
  createElement('li', { class: 'item' }, [2]),
]);

const newVirtualDOM = createElement('ul', { class: 'list-new' }, [
  createElement('li', { class: 'item' }, [1]),
  createElement('div', { class: 'item' }, [2]),
]);

const result = render(virtualDOM);

renderDOM(result, document.body);

const patches = diff(virtualDOM, newVirtualDOM);

patchDOM(result, patches);

/**
 * 1.什么是virtual dom ：用js对象描述DOM
 * TODO ...
 * 1.解决元素每个节点都相同，排序不通，则无需渲染
 * 2.解决在newVirtualDOM新增节点（不管是前面新增还是中间新增还是最后新增）
 *
 */
