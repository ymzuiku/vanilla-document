import { DOM } from 'vanilly';
import nuageRoute from '@nuage/route';

import { store } from './actions';

const BEM = DOM.randomBEM();

DOM.appendCss(
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

const Item = (text: string) => {
  let b = 20;

  return DOM.init(({ dog = b }) => {
    const out = DOM('div');

    return out.setAppend(
      DOM('button')
        .setSpanText(text)
        .setCss('^item', BEM)
        .setStyle({ fontSize: `${dog}px` })
        .setAppend(
          text.indexOf('a') > -1 && DOM('button').setSpanText('aaa'),
          text.indexOf('a') == -1 &&
            DOM('input').setStyle({
              backgroundColor: '#33f',
            }),
        )
        .setProps({
          onclick: (e: Event) => {
            e.stopPropagation();
            b += 1;
            out.render({ dog: b });
          },
        }),
    );
  });
};

export const Home = () => {
  return DOM.init(({ text }: any) => {
    return DOM('div')
      .setCss('^btn', BEM)
      .setSpanText(text || 'aaa')
      .onRendered(() => {
        console.log('onRendered');
      })
      .setProps({
        onclick: function(this: any) {
          this.render({ text: Math.random().toString(32) });
        },
      })
      .setAppend(
        Item(
          Math.random()
            .toString(32)
            .slice(2),
        ),
      );
  });

  // store.connectElement(
  //   out,
  //   s => {
  //     // out.setSpanText(s.age);
  //     const b = Item(String(s.age));
  //     out.replaceChild(item, b);
  //   },
  //   s => [s.age],
  // );
};
