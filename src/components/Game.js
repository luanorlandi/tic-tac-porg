import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          cell: null,
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isUndoingMove: false,
      isDescendingOrder: false,
    };

    this.size = {
      width: 3,
      height: 3,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
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

  calculateWinner = () => {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;

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

  isBoardFull() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;

    return !squares.includes(null);
  }

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
    const winner = this.calculateWinner();

    let status;

    if (winner) {
      status = 'Winner: ' + current.squares[winner[0]];
    } else if (this.isBoardFull()) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            size={this.size}
            squares={current.squares}
            highlight={ winner }
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{ status }</div>
          <label>
            <input
              type='checkbox'
              onChange={ this.handleCheckbox }
            />
            Sort descending
          </label>
          { this.renderMoves() }
        </div>
      </div>
    );
  }
}
