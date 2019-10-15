import { store } from 'vanilly';
const state = {
  name: 'dog',
  age: 10,
  history: {
    '/home': {
      dog: '111',
    },
  },
};

export type IState = typeof state;

store._state = {
  ...store._state,
  ...state,
};

if (process.env.NODE_ENV === 'development') {
  (window as any).store = store;
}
