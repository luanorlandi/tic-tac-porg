import React, { Component } from 'react';

import Board from './Board';
import ticTacToe from '../game/ticTacToe';
import { playMoveSound, playWinSound } from '../game/sound';
import './Game.css';
import porg from '../assets/porg.png';
import chewbacca from '../assets/chewbacca.png';
import label from '../json/label';

export default class Game extends Component {
  constructor(props) {
    super(props);

    const size = ticTacToe.boardSize.width * ticTacToe.boardSize.height;
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
      winnerSquares: [],
      statusText: ticTacToe.textStatusNext(),
      statusPlayer: label.playerOne,
    };
  }

  updateStatus(squares, playerWinner, isPlayerOneNext) {
    const statusText = ticTacToe.textStatus(
      squares, playerWinner);

    const statusPlayer = ticTacToe.playerStatus(
      squares, playerWinner, isPlayerOneNext);

    this.setState({
      statusText,
      statusPlayer,
    });
  }

  handleClick(squarePosition) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if (ticTacToe.isMoveInvalid(squares, squarePosition)) {
      return;
    }

    squares[squarePosition] = this.state.isPlayerOneNext ?
      label.playerOne : label.playerTwo;

    const winnerSquares = ticTacToe.calculateWinnerSquares(squares);
    const newHistory = history.concat([
      {
        squares: squares,
        cell: squarePosition,
      }
    ]);

    if (winnerSquares) {
      playWinSound(this.state.isPlayerOneNext);
    } else {
      playMoveSound(this.state.isPlayerOneNext);
    }

    const newIsPlayerOneNext = !this.state.isPlayerOneNext;
    const playerWinner = winnerSquares ? squares[winnerSquares[0]] : null;
    this.updateStatus(squares, playerWinner, newIsPlayerOneNext);

    this.setState({
      history: newHistory,
      stepNumber: history.length,
      isPlayerOneNext: newIsPlayerOneNext,
      isUndoingMove: false,
      winnerSquares,
    });
  }

  handleCheckbox = (event) =>
    this.setState({
      isDescendingOrder: event.target.checked
    });

  handleUndo = (step) => {
    const current = this.state.history[step];
    const squares = current.squares;
    const winnerSquares = ticTacToe.calculateWinnerSquares(squares);
    const newIsPlayerOneNext = (step % 2) === 0;
    const playerWinner = winnerSquares ? squares[winnerSquares[0]] : null;
    this.updateStatus(squares, playerWinner, newIsPlayerOneNext);

    this.setState({
      stepNumber: step,
      isPlayerOneNext: newIsPlayerOneNext,
      isUndoingMove: true,
      winnerSquares,
    });
  }

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
          onClick={() => this.handleUndo(move)}>
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

  renderStatus(text, player) {
    let image = '';
    if (player) {
      if (player === label.playerOne) {
        image = <img src={ porg } alt={ player }/>;
      } else {
        image = <img src={ chewbacca } alt={ player }/>;
      }
    }

    return (
      <div className='status'>
        <span>{ text }</span>
        { image }
      </div>
    );
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    return (
      <article>
        <section className='game'>
          { this.renderStatus(this.state.statusText, this.state.statusPlayer) }
          <Board
            squares={current.squares}
            winnerSquares={ this.state.winnerSquares }
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
