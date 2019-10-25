import { DOM } from 'vanilly';
import nuageRoute from '@nuage/route';

export const User = () => {
  const user = DOM('div').setSpanText('user-page');

  const input = DOM('input').setProps({ id: 'input' });

  const p = DOM('p')
    .onAppend(() => {
      console.log('onAppend-sub-p');
    })
    .setSpanText('111');

  const button = DOM('button')
    .setProps({
      onclick: () => {
        console.log('haha');
      },
    })
    .setSpanText('user-page-click');

  const changePage = DOM('button')
    .addEvent('click', () => {
      nuageRoute.push('/home');
    })
    .setSpanText('go-home-page');

  user.setAppend(input, p, button, changePage);

  return user;
};
