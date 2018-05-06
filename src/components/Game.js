import React, { Component } from 'react';
import Board from './Board';

import TicTacToe from '../game/TicTacToe'

export default class Game extends Component {
  constructor(props) {
    super(props);

    const size = TicTacToe.boardSize.width * TicTacToe.boardSize.height;
    this.state = {
      history: [
        {
          squares: Array(size).fill(null),
          cell: null,
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isUndoingMove: false,
      isDescendingOrder: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (TicTacToe.calculateWinnerSquares(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
          cell: i,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      isUndoingMove: false,
    });
  }

  handleCheckbox = (event) =>
    this.setState({
      isDescendingOrder: event.target.checked
    });

  jumpTo = (step) =>
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      isUndoingMove: true,
    });

  renderMoves = () => {
    const history = this.state.history;

    const moves = history.map((step, move) => {
      // calculate move position as (row, column)
      const row = 1 + Math.floor(step.cell / 3);
      const column = 1 + step.cell % 3;
      const desc = move ?
        `Go to move #${move} (${row}, ${column})` :
        'Go to game start';

      const moveSelectedClass =
        this.state.isUndoingMove && this.state.stepNumber === move ?
        'move-selected' : '';
      
      return (
        <li key={move}>
          <button
            className={ moveSelectedClass }
            onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    if (this.state.isDescendingOrder) {
      const reversedMoves = moves.slice(0).reverse();

      return <ol>{ reversedMoves }</ol>;
    }

    return <ol>{ moves }</ol>;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = TicTacToe.calculateWinnerSquares(current.squares);

    let status = TicTacToe.statusLabel(
      current.squares, winner, this.state.xIsNext);

    return (
      <article>
        <div className='status'>{ status }</div>
        <Board
          squares={current.squares}
          highlight={ winner }
          onClick={i => this.handleClick(i)}
        />
        <div className='game-info'>
          <label>
            <input
              type='checkbox'
              onChange={ this.handleCheckbox }
            />
            Sort descending
          </label>
          { this.renderMoves() }
        </div>
      </article>
    );
  }
}
