import $ from 'vanilly';

export const Square = (val: number) => {
  return $('button')
    .$class('square')
    .$text(val);
};
