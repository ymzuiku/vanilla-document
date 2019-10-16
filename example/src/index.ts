import { cssin } from 'cssin';
import { append, setClass, domObserver, DOM } from './vanilly-dom';

const root = DOM('div');

const dog = DOM('div');

domObserver(dog, {
  childList: (v: any) => {
    console.log('xxx');
  },
});

append(root, dog);

domObserver(root, {
  attributes: (v: any) => {
    console.log('xxxx', v);
  },
  childList: (v: any) => {
    console.log('xxxx', v);
  },
  subtree: (v: any) => {
    console.log('xxxx', v);
  },
});

root.setAttribute('cccc', 'bbb');

document.body.append(root);

setTimeout(() => {
  root.remove();
}, 500);
