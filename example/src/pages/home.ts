import { DOM, store, routeManage } from 'vanilly';

export const Home = () => {
  const home = DOM('div')
    .cssText('background:#f55')
    .textContent('home-page')
    .onAppend(() => {
      console.log('onAppend-home-page');
    })
    .append(
      DOM('button')
        .props({
          onclick: () => {
            store.update(s => {
              s.age += 1;
            });
          },
        })
        .textContent('test-click'),
      DOM('button')
        .addEventListener('click', () => {
          routeManage.push('/user');
        })
        .textContent('go-user-pagei'),
    );

  return home;
};
