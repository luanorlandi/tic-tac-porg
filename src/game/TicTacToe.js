import label from '../json/label';

export const boardSize = { width: 3, height: 3, };

export const calculateWinnerSquares = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
}

export const isBoardFull = squares => !squares.includes(null);

export const statusLabel = (squares, winner, isPlayerOneNext) => {
  if (winner) {
    return `${label.statusWinner}: ${squares[winner[0]]}`;
  } else if (isBoardFull(squares)) {
    return 'Draw';
  }

  const next = isPlayerOneNext ? label.playerOne : label.playerTwo;

  return `${label.statusNext}: ${next}`;
}

export default {boardSize, calculateWinnerSquares, isBoardFull, statusLabel};
