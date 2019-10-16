// import './polyfill';
// import { cssin } from 'cssin';
import { DOM, observerDOM } from './vanilly2';

const initState = {
  name: 'dog',
  age: 5,
};
type IState = typeof initState;

const { store, routeManage, Route } = observerDOM(document.body, initState);

const root = DOM('div').setChilds(
  DOM('div')
    .setStyle({
      backgroundColor: '#f66',
      fontSize: '24px',
    })
    .setText('hello-bb'),
  DOM('div'),
);

document.body.append(root.target);
