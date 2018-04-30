import React, { Component } from 'react';
import Game from './Game';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <header>
          <h1>Tic-Tac-Porg</h1>
        </header>
        <Game />
        <footer>
          <h1>footer</h1>
        </footer>
      </div>
    );
  }
}