import { DOM, routeManage } from 'vanilly';
import { IState } from '../state';
import { cssin } from 'cssin';

export const User = () => {
  const user = DOM('div')
    .textContent('user-page')
    .setClass(cssin`bg:#55f`)
    .onUpdate<any, [number]>(
      s => [s.age],
      ([age], self: any) => {
        if (age > 10) {
          DOM(self).removeChild(ele => {
            if (ele.id === 'input') {
              DOM(ele).remove();
            }
          });
        }
      },
    );

  const input = DOM('input')
    .setProps({ id: 'input' })
    .onRemove(() => {
      console.log('input-remove');
    });

  const p = DOM('p')
    .onUpdate<IState, [number]>(
      s => [s.age],
      ([age], self) => {
        console.log(age);
        self.textContent = age as any;
        console.log('xx');
      },
    )
    .onAppend(() => {
      console.log('onAppend-sub-p');
    })
    .textContent('111');

  const button = DOM('button')
    .ref(e => {
      e.target.onclick = () => {
        console.log('haha');
      };
    })
    .textContent('user-page-click');

  const changePage = DOM('button')
    .addEventListener('click', () => {
      routeManage.push('/home');
    })
    .textContent('go-home-page');

  return user.append(input, p, button, changePage);
};
