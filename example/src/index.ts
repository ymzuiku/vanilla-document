import { $ } from 'vanilly';
import Route from 'vanilla-route';
import { Home } from './pages/home';
import { User } from './pages/user';
import './iconfont';

const Register = Route.Register;

const root = $('div').$append(
  Register({ path: '/home', component: Home }),
  Register({ path: '/user', component: User }),
);

document.body.append(root);
Route.init('/home');
