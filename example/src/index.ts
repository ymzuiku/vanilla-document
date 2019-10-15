import { cssin } from 'cssin';
import { setGlobalCss } from 'cssin/commonCSSValues';
import 'cssin/commonSheets';
import { DOM, Route, navHistory } from 'vanilly';
import { Home } from './pages/home';
import { User } from './pages/user';
import { createDomExample } from './pages/createDomExample';
import './state';

setGlobalCss();

document.body.setClass(cssin`padding:0px;margin:0px;`);

const App = () => {
  const root = DOM('div').append(
    Route({ path: '/user', component: User }),
    Route({ path: '/home', component: Home }),
    Route({ path: '/createDomExample', component: createDomExample }),
  );

  root.onAppend = () => {
    console.log('init-append');
  };

  return root;
};

document.body.append(App());
navHistory.init('/user');
