import React from 'react';

import Game from './Game';
import SocialMedia from './SocialMedia';
import './App.css';
import label from '../json/label';

export const App = () => {
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
          { label.footer.createdBy }
          <a className='author'
            href='https://github.com/luanorlandi'>
            { label.footer.author }
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;