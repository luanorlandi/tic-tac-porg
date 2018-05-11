import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Square.css';
import label from '../json/label';

export default class Square extends Component {
  static propTypes = {
    isHighligthed: PropTypes.bool,
  }

  static defaultProps = {
    isHighligthed: false,
  }

  render() {
    const classHighlight = this.props.isHighligthed ? 'highlight' : '';
    let background = '';

    if (this.props.value) {
      background = this.props.value === label.playerOne ? 'porg' : 'chewbacca';
    }

    return (
      <button
        className={`square ${classHighlight} ${background}`}
        onClick={this.props.onClick} />
    );
  }
}
