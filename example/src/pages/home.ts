import $ from 'vanilly';
import { obs } from './actions';

const BEM = $.randomBEM();

$.css(
  `
  .^btn {
    background: #f00;
  }
  .^btn:hover{
    background: #f55;
  }
  .^btn-2 {
    background: #00f;
  }
  .^btn-2:hover {
    background: #55f;
  }
  .^item{
    font-size: 25px;
  }
`,
  BEM,
);

const Item = (index: number, text: string, fs = 20) => {
  const out = $('div');

  out.$append(
    $('button')
      .$id('btn')
      .$text(text)
      .$class('^item', BEM)
      .$append(
        text.indexOf('3') > -1 && $('button').$text('aaa'),
        text.indexOf('3') === -1 &&
          $('input').$style({
            backgroundColor: '#33f',
          }),
      ),
  );

  obs.connectElement(
    out,
    s => {
      out.$query('#btn', el => {
        el.$text(s.list[index]);
      });
    },
    s => [s.list[index]],
  );

  // store.connectElement(
  //   out,
  //   s => {
  //     out.$query('#btn', el => {
  //       el.$text(s.age);
  //     });
  //   },
  //   s => [s.age],
  // );
  return out;

  // .$props({
  //   onclick: (e: any) => {
  //     // e.stopPropagation();
  //     out.$replace(Item(Math.random().toString(32), fs));
  //   },
  // });
  // .$on('click', e => {});
};

export const Home = (index: number) => {
  const home = $('div');
  return home
    .$class('^btn', BEM)
    .$text(index)
    .$on('click', () => {
      console.time('update');
      home.$replace(Home(index));
      obs.update(s => (s.list[index] += 1));
      console.timeEnd('update');
    })
    .$append(
      Item(index, String(index)),
      Item(index, String(index)).$on('click', e => {
        // e.stopPropagation();
        // nuageRoute.push('/user');
      }),
    );
};

// console.time('1');
// let b = Home(3);
// b.id = 'bbbb';

// store.state.list.forEach((v, i) => {
//   document.body.append(Home(i));
// });
// document.body.append(b);
// console.timeEnd('1');

// console.time('contains');
// console.log(document.body.contains(b));
// console.timeEnd('contains');

// console.time('id');
// console.log(document.getElementById('bbbb'));
// console.timeEnd('id');
// setInterval(() => {
//   store.update(s => (s.age += 1));
// }, 1000);
