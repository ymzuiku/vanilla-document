import { DOM } from '../vanilly2';
import { store } from '../state';

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
    );
};
