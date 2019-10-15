import 'module-touch';
export type IListRender = (index: number) => HTMLElement;

interface IList {
  itemCount: number;
  layout?: 'horizontal' | 'vertical';
  loadCount?: number;
  render: IListRender;
}

export interface IListState {
  stopAppend: boolean;
}

export const List = ({ render, itemCount, loadCount = 10, layout = 'vertical' }: IList) => {
  const box = document.createElement('div');
  // 使用relative+absolute 包裹一层，可以解决 grid 导致的scroll之后，当容器中的对象触发重排之后，会自动scrollTop=0的状况
  box.style.position = 'relative';
  box.style.width = '100%';
  box.style.height = '100%';
  const view = document.createElement('div');

  view.style.position = 'absolute';
  view.style.overflow = 'scroll';
  view.style.willChange = 'scroll-position';
  view.style.width = '100%';
  view.style.height = '100%';
  view.style.setProperty('-webkit-overflow-scrolling', 'touch');

  const childs = new Set();

  const addChild = () => {
    const l = childs.size;
    for (let i = l; i < l + loadCount; i++) {
      if (i <= itemCount && !childs.has(i)) {
        const cell = render(i);
        view.appendChild(cell);
        childs.add(i);
      }
    }
  };

  // 让box成为移动端优化过的scroll对象
  view.setAttribute('mobile-touch', 'true');

  let checker: (e: any) => boolean;

  if (layout === 'horizontal') {
    view.style.display = 'flex';
    view.style.flexDirection = 'row';
    const iw = window.innerWidth * 1.5;
    checker = e => e.target.scrollWidth - e.target.scrollLeft < iw;
  } else {
    const ih = window.innerHeight;
    checker = e => e.target.scrollHeight - e.target.scrollTop < ih;
  }

  view.addEventListener('scroll', e => {
    if (!(view as any).$stopAppend) {
      if (checker(e)) {
        addChild();
      }
    }
  });

  addChild();

  box.append(view);

  return box;
};
