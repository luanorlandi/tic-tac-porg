import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Square.css';
import porg from '../assets/porg.png';
import chewbacca from '../assets/chewbacca.png';
import label from '../json/label';

export default class Square extends Component {
  static propTypes = {
    isDarkened: PropTypes.bool,
  }

  static defaultProps = {
    isDarkened: false,
  }

  render() {
    const classHighlight = this.props.isDarkened ? 'darkened' : '';

    if (!this.props.value) {
      return (
        <div
          className='square empty'
          onClick={this.props.onClick}>
        </div>
      );
    }

    return (
      <img
        src={ this.props.value === label.playerOne ? porg : chewbacca }
        alt={ this.props.value }
        className={`square ${classHighlight}`}
        onClick={this.props.onClick} />
    );
  }
}
