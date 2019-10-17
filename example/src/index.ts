import './polyfill';
import { DOM, Route, routeManage } from 'vanilly';
import { Home } from './pages/home';
import { User } from './pages/user';
import './state';
import { cssin, addSheets } from 'cssin';
import { globalCss, valueCss } from 'cssin/umd/commonCSSValues';
import { commonSheets } from 'cssin/umd/commonSheets';

cssin(globalCss);
cssin(valueCss);
addSheets(commonSheets);

const root = DOM('h2').append(Route({ path: '/home', component: Home }), Route({ path: '/user', component: User }));

document.body.append(root.target);
routeManage.init('/home');
