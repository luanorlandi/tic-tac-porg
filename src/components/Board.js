import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {
  renderSquare = (square) =>
      <Square
        key={square}
        value={this.props.squares[square]}
        onClick={() => this.props.onClick(square)}
      />

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
    const width = this.props.size.width;
    const height = this.props.size.height;
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