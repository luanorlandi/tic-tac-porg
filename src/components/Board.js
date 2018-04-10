import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

import { boardSize } from '../game/TicTacToe';

export default class Board extends Component {
  static propTypes = {
    highlight: PropTypes.array,
  }

  static defaultProps = {
    highlight: [],
  }

  renderSquare = (square) => {
    const isHighligthed = this.props.highlight.includes(square);

    return (
      <Square
        key={ square }
        value={ this.props.squares[square] }
        isHighligthed={ isHighligthed }
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
      <div>
        { rows }
      </div>
    );
  }
}