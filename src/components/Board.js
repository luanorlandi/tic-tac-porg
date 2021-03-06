import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Square from './Square';
import { boardSize } from '../game/ticTacToe';
import './Board.css';

export default class Board extends Component {
  static propTypes = {
    winnerSquares: PropTypes.array,
  }

  static defaultProps = {
    winnerSquares: [],
  }

  renderSquare = (square) => {
    const isDarkened = this.props.winnerSquares.length > 0 &&
      !this.props.winnerSquares.includes(square);

    const clickable = this.props.winnerSquares.length === 0;

    return (
      <Square
        key={ square }
        value={ this.props.squares[square] }
        clickable={ clickable }
        isDarkened={ isDarkened }
        onClick={() => this.props.onClick(square)}
      />
    );
  }

  renderRow = (width, row) => {
    const squares = [];

    for (let i = 0; i < width; i++) {
      const square = width * row + i;
      squares.push(this.renderSquare(square));
    }

    return (
      <div key={ row } className='board-row'>
        { squares }
      </div>
    );
  }

  render() {
    const width = boardSize.width;
    const height = boardSize.height;
    const rows = [];

    for (let i = 0; i < height; i++) {
      rows.push(this.renderRow(width, i));
    }

    return (
      <div className='game-board'>
        { rows }
        <div className='lines'>
          <div className='horizontal-line'></div>
          <div className='horizontal-line'></div>
        </div>
        <div className='lines'>
          <div className='vertical-line'></div>
          <div className='vertical-line'></div>
        </div>
      </div>
    );
  }
}
