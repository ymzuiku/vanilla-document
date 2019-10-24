import { DOM } from 'vanilly';
import nuageRoute from '@nuage/route';

import { store } from './actions';
import { element } from 'prop-types';
import { SlowBuffer } from 'buffer';

export const Home = () => {
  return DOM('div')
    .setCssText('background:#f55')
    .setText('home-page')
    .onAppend(() => {
      console.log('onAppend-home-page');
    })
    .setAppend(
      DOM('button')
        .setId('btn')
        .setProps({
          onclick: () => {
            store.update(s => (s.age += 1));
          },
        })
        .setText('test-click'),
      DOM('button')
        .addEvent('click', () => {
          nuageRoute.push('/user');
        })
        .setText('go-user-pagei'),
    )
    .query('#btn', el => {
      el.setStyle({ fontSize: '40px' });
    });
};
