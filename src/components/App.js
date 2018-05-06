import React, { Component } from 'react';
import Game from './Game';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Tic-Tac-Porg</h1>
        </header>
        <main>
          <Game />
        </main>
        <footer>
          <h1>footer</h1>
        </footer>
      </div>
    );
  }
}