import React, { Component } from 'react';

import Game from './Game';
import SocialMedia from './SocialMedia';
import './App.css';
import label from '../json/label';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>{ label.appName }</h1>
        </header>
        <main>
          <Game />
        </main>
        <footer>
          <SocialMedia />
          <span className='copyright'>
            { label.author }
          </span>
        </footer>
      </div>
    );
  }
}
