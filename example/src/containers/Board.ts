import { Square } from './Square';
import dom from 'vanilla-document';
import { calculateWinner } from '../utils/calculateWinner';

export const Board = (name: string) => {
  const squares = Array(9).fill(null);
  const status = 'Next player: X';
  let xIsNext = true;

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    xIsNext = !xIsNext;
    updateGameStatus();
  };

  const renderSquare = (i: number) => {
    return Square('', function() {
      handleClick(i);
      return squares[i];
    });
  };

  const updateGameStatus = () => {
    const winner = calculateWinner(squares);
    let status: string;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    game.$query('#status', el => el.$text(status));
  };

  const game = dom('div').$append(
    dom('div').$text(name),
    dom('div')
      .$id('status')
      .$class('status')
      .$text(status),
    dom('div')
      .$class('board-row')
      .$append(renderSquare(0), renderSquare(1), renderSquare(2)),
    dom('div')
      .$class('board-row')
      .$append(renderSquare(3), renderSquare(4), renderSquare(5)),
    dom('div')
      .$class('board-row')
      .$append(renderSquare(6), renderSquare(7), renderSquare(8)),
  );

  return game;
};
