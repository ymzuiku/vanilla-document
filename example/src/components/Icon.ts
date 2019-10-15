export const Icon = (icon: string) => {
  const div = document.createElement('div');
  div.innerHTML = `<svg class="icon" style="width:100%; height:100%" aria-hidden="true"><use xlink:href="#${icon}"></use></svg>`;

  return div;
};
