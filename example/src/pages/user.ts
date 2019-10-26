import { DOM } from 'vanilly';
import nuageRoute from '@nuage/route';

export const User = () => {
  const user = DOM('div').setText('user-page');

  const input = DOM('input').setProps({ id: 'input' });

  const p = DOM('p')
    .onAppend(() => {
      console.log('onAppend-sub-p');
    })
    .setText('111');

  const button = DOM('button')
    .setProps({
      onclick: () => {
        console.log('haha');
      },
    })
    .setText('user-page-click');

  const changePage = DOM('button')
    .addEvent('click', () => {
      nuageRoute.push('/home');
    })
    .setText('go-home-page');

  user.setAppend(input, p, button, changePage);

  return user;
};
