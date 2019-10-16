// import './polyfill';
// import { cssin } from 'cssin';
import { append, DOM, lifeDom, onUpdate, onAppend, onRemove } from './vanilly2';

const root = DOM('div');
const initState = { name: 'dog', age: 10 };
type IState = typeof initState;
const store = lifeDom(root, initState);

const dog = DOM('button');

document.body.append(root);

onAppend(dog, () => {
  console.log('dog is onAppend');
});

dog.append('123');
onRemove(dog, () => {
  console.log('xxx-remove');
});

append(root, [dog]);

onUpdate<IState, [number]>(
  dog,
  s => [s.age],
  ([age]) => {
    console.log('xxx-update', age);
    dog.textContent = age as any;
  },
);

console.time('a');
for (let i = 0; i < 1000; i++) {
  const test = DOM('h2');
  test.textContent = '123';
  root.append(test);
}
console.timeEnd('a');

setInterval(() => {
  store.update(s => {
    console.log('xx');
    s.age += 1;

    return s;
  });
  // dog.remove();
}, 500);
