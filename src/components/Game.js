import React, { Component } from 'react';

import Board from './Board';
import TicTacToe from '../game/TicTacToe';
import './Game.css';
import label from '../json/label';

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
      isPlayerOneNext: true,
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
    squares[i] = this.state.isPlayerOneNext ? label.playerOne : label.playerTwo;
    this.setState({
      history: history.concat([
        {
          squares: squares,
          cell: i,
        }
      ]),
      stepNumber: history.length,
      isPlayerOneNext: !this.state.isPlayerOneNext,
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
      isPlayerOneNext: (step % 2) === 0,
      isUndoingMove: true,
    });

  renderMoves = () => {
    const history = this.state.history;

    const moves = history.map((step, move) => {
      // calculate move position as (row, column)
      const row = 1 + Math.floor(step.cell / 3);
      const column = 1 + step.cell % 3;
      const desc = move ?
        `${1+move}. ${label.move} (${row}, ${column})` :
        `1. ${label.start}`;

      const moveSelectedClass =
        this.state.isUndoingMove && this.state.stepNumber === move ?
        'move-selected' : '';
      
      return (
        <div key={move}
          className={ moveSelectedClass }
          onClick={() => this.jumpTo(move)}>
          {desc}
        </div>
      );
    });

    if (this.state.isDescendingOrder) {
      const reversedMoves = moves.slice(0).reverse();

      return <div className='moves-list'>{ reversedMoves }</div>;
    }

    return <div className='moves-list'>{ moves }</div>;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = TicTacToe.calculateWinnerSquares(current.squares);

    let status = TicTacToe.statusLabel(
      current.squares, winner, this.state.isPlayerOneNext);

    return (
      <article>
        <section className='game'>
          <div className='status'>{ status }</div>
          <Board
            squares={current.squares}
            highlight={ winner }
            onClick={i => this.handleClick(i)}
          />
        </section>
        <section className='moves'>
          <label>
            <input
              type='checkbox'
              onChange={ this.handleCheckbox }
            />
            <span></span>
            { label.sort }
          </label>
          { this.renderMoves() }
        </section>
      </article>
    );
  }
}
