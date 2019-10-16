import { DOM, navHistory } from 'vanilly';
import { cssin } from 'cssin';

// Options for the observer (which mutations to observe)
let config = {
  attributes: true,
  childList: true,
  subtree: true,
};

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
    DOM('button')
      .set({ textContent: 'go createDomExample' })
      .set({
        onclick: () => {
          navHistory.push('/createDomExample');
        },
      }),
  );

  return root;
};
