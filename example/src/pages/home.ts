import { DOM, store, routeManage } from '../vanilly2';

export const Home = () => {
  return DOM('div')
    .cssText('background:#f55')
    .textContent('home-page')
    .onAppend(() => {
      console.log('onAppend-home-page');
    })
    .append(
      DOM('button')
        .ref(e => {
          e.onclick = () => {
            store.update(s => {
              s.age += 1;
            });
          };
        })
        .textContent('test-click'),
      DOM('button')
        .addEventListener('click', () => {
          routeManage.push('/user');
        })
        .textContent('go-user-pagei'),
    );
};
