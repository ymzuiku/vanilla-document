import $ from 'vanilly';
import Route from 'vanilla-route';
import List from 'vanilla-list';
import Message from 'vanilla-message';
import Icon from 'vanilla-icon';

export const User = () => {
  const user = $('div').$text('user-page');

  const input = $('input').$id('input');

  const p = $('p')
    .$onMound(() => {
      console.log('onAppend-sub-p');
    })
    .$text('111');

  const button = $('button')
    .$on('click', e => {
      console.log('haha');
      Message('hello', { outTime: 9000, style: { backgroundColor: '#f55' } });
    })
    .$text('user-page-click');

  const changePage = $('button')
    .$props({
      onclick: () => {
        console.log('wwww');
      },
    })
    .$on('click', e => {
      Route.push('/home');
    })
    .$text('go-home-page');

  user.$append(input, p, button, changePage);
  user.$append(Icon('close'));
  user.$append(
    $(
      List({
        itemCount: 20000,
        render: index => {
          return $('div').$text('aa-' + index);
        },
      }),
    ).$style({
      height: '200px',
    }),
  );

  return user;
};
