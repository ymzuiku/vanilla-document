import { DOM, IDOM } from 'vanilly';
import nuageRoute from '@nuage/route';

import { store } from './actions';
import { isDeclareModule } from '@babel/types';

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

const Item = (text: string, fs = 20) => {
  const out = DOM('div');
  console.log(out.state);

  return out.setAppend(
    DOM('button')
      .setText(text)
      .setCss('^item', BEM)
      .setStyle({ fontSize: `${fs}px` })
      .setProps({
        onclick: (e: Event) => {
          console.log('111');
          e.stopPropagation();
          fs += 1;
          console.log('xxx', fs);
          out.setReplaceNode(Item(Math.random().toString(32), fs));
        },
      })
      .setAppend(
        text.indexOf('a') > -1 && DOM('button').setText('aaa'),
        text.indexOf('a') == -1 &&
          DOM('input').setStyle({
            backgroundColor: '#33f',
          }),
      ),
  );
};

export const Home = (text: string) => {
  return DOM('div')
    .setCss('^btn', BEM)
    .setText(text || 'aaa')
    .onRendered(() => {
      console.log('onRendered');
    })
    .setProps({
      onclick: function(this: IDOM<any>) {
        this.setReplaceNode(Home('cccc'));
        // this.setReplaceNode(Home(Date.now().toString(32)));
      },
    })
    .setAppend(
      Item(
        Math.random()
          .toString(32)
          .slice(2),
      ),
      Item('aa'),
    );

  // store.connectElement(
  //   out,
  //   s => {
  //     // out.setText(s.age);
  //     const b = Item(String(s.age));
  //     out.replaceChild(item, b);
  //   },
  //   s => [s.age],
  // );
};
