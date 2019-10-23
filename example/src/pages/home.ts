import { DOM } from 'vanilly';
import nuageRoute from '@nuage/route';

import { store } from './actions';

export const Home = () => {
  const home = DOM('div')
    .setCssText('background:#f55')
    .setText('home-page')
    .onAppend(() => {
      console.log('onAppend-home-page');
    })
    .setAppend(
      DOM('button')
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
    );

  return home;
};
