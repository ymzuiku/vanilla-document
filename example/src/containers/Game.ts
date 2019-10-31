import dom from 'vanilla-document';
import { Board } from './Board';

export const Game = () => {
  return dom('div')
    .$class('game')
    .$append(
      dom('div')
        .$class('game-board')
        .$append(Board('Game A')),
      dom('div')
        .$class('game-board')
        .$append(Board('Game B')),
      dom('div')
        .$class('game-board')
        .$append(Board('Game C')),
    );
};
