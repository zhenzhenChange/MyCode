import { Element } from './element';

/* diff 类型 type */
const diffType = { props: 'PROPS', text: 'TEXT', remove: 'REMOVE', replace: 'REPLACE' };

const isElementInstance = el => el instanceof Element;

export { isElementInstance, diffType };
