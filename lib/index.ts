/// <reference path="./vanilly.d.ts" />

import './rewriteElement';
import { DOM } from './DOM';
import { store } from './store';
import { Route, navHistory } from './route';

export { DOM, store, Route, navHistory };

export default {
  DOM,
  store,
  Route,
  navHistory,
};
