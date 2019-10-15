import { DOM, navHistory } from 'vanilly';

export const createDomExample = () => {
  const refs = {
    message: DOM('span'),
  };

  const root = DOM('div')
    .set({
      onclick: () => {},
    })
    .setStyle({
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
    })
    .setChilds(
      DOM('h2').set({ textContent: 'VBind lable and input:' }),
      DOM('span').setRef(r => (refs.message = r)),
      DOM('input').set({
        oninput: (e: any) => {
          refs.message.textContent = e.target.value;
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

  root.onAppend = () => {
    console.log('listening, at element append to parentElement');
  };

  root.onRemove = () => {
    console.log(
      'listening at element at remove by dom, when use root.remove, or parentElement use remove or removeChild',
    );
  };

  root.onUpdate = () => {
    console.log('listening, when store.update(...)');
  };

  return root;
};
