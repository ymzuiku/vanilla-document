import Observer from 'vanilla-observer';

export const obs = Observer({
  name: 'dog',
  age: 5,
  list: Array(2000).fill(0),
});

if (process.env.NODE_ENV === 'development') {
  (window as any).store = obs;
}
