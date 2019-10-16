import { createStore } from './vanilly2';

const initState = {
  name: 'dog',
  age: 5,
};
export type IState = typeof initState;

const { store, routeManage, Route } = createStore(initState);

export { store, Route, routeManage };

if (process.env.NODE_ENV === 'development') {
  (window as any).store = store;
}
