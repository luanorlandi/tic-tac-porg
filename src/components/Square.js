import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Square.css';

export default class Square extends Component {
  static propTypes = {
    isHighligthed: PropTypes.bool,
  }

  static defaultProps = {
    isHighligthed: false,
  }

  render() {
    const classHighlight = this.props.isHighligthed ? 'highlight' : '';
    return (
      <button
        className={`square ${classHighlight}`}
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}