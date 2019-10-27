import $ from 'vanilly';

export const Square = (val: number | string, onClick: Function) => {
  return $('button')
    .$class('square')
    .$text(val)
    .$on('click', function() {
      const v = onClick();
      this.$replace(Square(v, onClick));
    });
};
