import micoStore from 'mico-store';

export const store = micoStore({
  name: 'dog',
  age: 5,
  list: Array(2000).fill(0),
});

if (process.env.NODE_ENV === 'development') {
  (window as any).store = store;
}
