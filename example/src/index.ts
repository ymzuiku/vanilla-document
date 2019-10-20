import './polyfill';
import { DOM, Route, routeManage } from 'vanilly';
import { Home } from './pages/home';
import { User } from './pages/user';

const root = DOM('div').append(Route({ path: '/home', component: Home }), Route({ path: '/user', component: User }));

document.body.append(root.element);
routeManage.init('/home');
