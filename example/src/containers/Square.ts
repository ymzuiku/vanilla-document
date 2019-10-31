import dom from 'vanilla-document';

export const Square = (val: number | string, onClick: Function) => {
  return dom('button')
    .$class('square')
    .$text(val)
    .$on('click', function() {
      const v = onClick.call(this);
      this.$replace(Square(v, onClick));
    })
    .$hover({
      backgroundColor: '#f8f8f8',
    })
    .$active({
      backgroundColor: '#eee',
    });
};
