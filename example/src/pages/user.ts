import { IState } from '../state';
import { DOM, store, navHistory } from 'vanilly';
import { cssin } from 'cssin';

export const User = () => {
  const h = {
    title: DOM('span'),
  };

  const root = DOM('div')
    .set({
      onclick: () => {},
    })
    .setChilds(
      DOM('span').setRef(r => (h.title = r)),
      DOM('input').set({
        oninput: (e: any) => {
          if (e.target) {
            store.update((s: IState) => {
              s.name = e.target.value;
            });
          }
        },
      }),
      DOM('button')
        .set({ textContent: 'go home' })
        .set({
          onclick: () => {
            navHistory.push('/home');
          },
        }),
    );

  root.onMemo = (s: IState) => [s.name];
  root.onUpdate = ([name = 'user-page']: [string]) => {
    h.title.textContent = name;
  };
  root.setClass(cssin('width:100%;height:100%;background:#fff;'));

  return root;
};
