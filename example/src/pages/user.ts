import { DOM, routeManage } from 'vanilly';
import { store } from './actions';

export const User = () => {
  const user = DOM('div').textContent('user-page');

  function updateInput() {
    console.log('xxx');
    if (store.state.age > 10) {
      input.remove();
    }
  }

  const input = DOM('input')
    .props({ id: 'input' })
    .onAppend(() => store.listen(updateInput, s => [s.age]))
    .onRemove(() => store.unListen(updateInput));

  const p = DOM('p')
    .onAppend(() => {
      console.log('onAppend-sub-p');
    })
    .textContent('111');

  const button = DOM('button')
    .props({
      onclick: () => {
        console.log('haha');
      },
    })
    .textContent('user-page-click');

  const changePage = DOM('button')
    .addEventListener('click', () => {
      routeManage.push('/home');
    })
    .textContent('go-home-page');

  return user.append(input, p, button, changePage);
};
