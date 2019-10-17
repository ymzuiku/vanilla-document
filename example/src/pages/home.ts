import { DOM, store, routeManage } from 'vanilly';

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
          e.target.onclick = () => {
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
