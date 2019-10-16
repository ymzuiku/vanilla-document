import { store } from './vanilly2';

const initState = {
  name: 'dog',
  age: 5,
};
export type IState = typeof initState;

store.__state = {
  ...store.__state,
  ...initState,
};

if (process.env.NODE_ENV === 'development') {
  (window as any).store = store;
}
