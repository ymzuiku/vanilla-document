import { DOM, navHistory } from 'vanilly';
import { cssin } from 'cssin';

export const Home = () => {
  const root = DOM('div');

  root.setClass(cssin('wh:100%;bg:#fff;'));
  root.textContent = 'home-page';
  root.append(
    DOM('button')
      .set({ textContent: 'go user' })
      .set({
        onclick: () => {
          navHistory.push('/user');
        },
      }),
  );

  return root;
};
