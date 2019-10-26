export interface IOptions {
  size?: string;
  type?: 'font' | 'svg';
  style?: any;
  iconfontClass?: string;
}

const Icon = (icon: string, options?: IOptions) => {
  const { size = '24px', type = 'font', style = {}, iconfontClass = 'iconfont' } = options || {};

  const span = document.createElement('span');
  span.setAttribute('class', `${iconfontClass} icon-${icon}`);

  const theStyle = {
    display: 'inline-block',
    textAlign: 'center',
    fontSize: size,
    lineHeight: size,
    ...style,
  };

  Object.keys(theStyle).forEach(k => {
    (span as any).style[k] = (theStyle as any)[k];
  });

  if (type === 'svg') {
    span.innerHTML = `<svg class="${iconfontClass}" style="width:100%; height:100%" aria-hidden="true"><use xlink:href="#${icon}"></use></svg>`;
  }

  return span;
};

export default Icon;
