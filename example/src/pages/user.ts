import { DOM } from '../vanilly2';
import { IState, store } from '../state';

export const User = () => {
  const refs = {
    root: (undefined as any) as HTMLDivElement,
  };

  const user = DOM('div')
    .ref(r => (refs.root = r))
    .cssText('background:#f88')
    .textContent('user-page')
    .append(
      DOM('p')
        .onUpdate<IState, [number]>(
          s => [s.age],
          ([age], self) => {
            console.log('xx');
          },
        )
        .onAppend(() => {
          console.log('onAppend');
        }),
      DOM('button')
        .ref(e => {
          e.onclick = () => {
            console.log('haha');
          };
        })
        .textContent('user-page-click'),
    );

  return user;
};
