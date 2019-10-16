// import './polyfill';
// import { cssin } from 'cssin';
import { DOM } from './vanilly2';
import { Home } from './pages/home';
import { User } from './pages/user';
import { store } from './state';

const root = DOM('h2').append(
  DOM('div')
    .setStyle({
      backgroundColor: '#f66',
      fontSize: '24px',
    })
    .textContent('hello-bb'),
  DOM('div'),
  Home(),
  User(),
);

document.body.append(store.mutationObserver(root));
