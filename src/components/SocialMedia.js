import React from 'react';

import './SocialMedia.css';
import label from '../json/label';

export const SocialMedia = () => {
  return (
    <div className='links'>
      <a className="github-button"
        href="https://github.com/luanorlandi/tic-tac-porg"
        data-show-count="true"
        aria-label="Star luanorlandi/tic-tac-porg on GitHub">
        { label.github }
      </a>
      <a className="twitter-share-button"
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        data-show-count="true">
        { label.twitter }
      </a>
    </div>
  );
}

export default SocialMedia;
