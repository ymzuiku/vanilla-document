import { cssin } from 'cssin';
import { append, setClass, lifeDom, DOM } from './vanilly-dom';

const root = DOM('div');
lifeDom(root);

const dog = DOM('button');

append(root, dog);

root.setAttribute('update', { dog: '111' } as any);
root.setAttribute('update', '12312321');

document.body.append(root);

dog.append('123');

setTimeout(() => {
  dog.remove();
}, 500);
