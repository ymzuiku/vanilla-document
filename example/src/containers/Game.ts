import $ from 'vanilly';
import { Board } from './Board';

export const Game = () => {
  return $('div')
    .$class('game')
    .$append(
      $('div')
        .$class('game-board')
        .$append(Board('Game A')),
      $('div')
        .$class('game-board')
        .$append(Board('Game B')),
      $('div')
        .$class('game-board')
        .$append(Board('Game C')),
    );
};
