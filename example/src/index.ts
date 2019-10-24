import './polyfill';
import { DOM } from 'vanilly';
import nuageRoute from '@nuage/route';
import { Home } from './pages/home';
import { User } from './pages/user';

const Route = nuageRoute.Route;

const root = DOM('div').setAppend(
  Route({ path: '/home', component: Home }),
  Route({ path: '/user', component: User }),
);

document.body.append(root);
nuageRoute.init('/home');

const b = DOM('div').setAppend(DOM('input').setAttr('id', 'bb'));
