import './polyfill';
import { DOM, Route, routeManage } from 'vanilly';
import { Home } from './pages/home';
import { User } from './pages/user';
import './state';

const root = DOM('h2').append(Route({ path: '/home', component: Home }), Route({ path: '/user', component: User }));

document.body.append(root.target);
routeManage.init('/home');
