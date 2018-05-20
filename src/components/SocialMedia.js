import React from 'react';

import './SocialMedia.css';
import label from '../json/label';

export const SocialMedia = () => {
  return (
    <div className='links'>
      <div className='media fb-share-button'
        data-href='https://luanorlandi.github.com/tic-tac-porg'
        data-layout='button_count'
        data-size='small'
        data-mobile-iframe='true'>
        <a className='fb-xfbml-parse-ignore'
          href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fluanorlandi.github.com%2Ftic-tac-porg&amp;src=sdkpreparse'>
          { label.footer.facebook }
        </a>
      </div>
      <div className='media'>
        <a className='twitter-share-button'
          href='https://twitter.com/share?ref_src=twsrc%5Etfw'
          data-show-count='true'>
          { label.footer.twitter }
        </a>
      </div>
      <div className='media'>
        <a className='github-button'
          href='https://github.com/luanorlandi/tic-tac-porg'
          data-show-count='true'
          aria-label='Star luanorlandi/tic-tac-porg on GitHub'>
          { label.footer.github }
        </a>
      </div>
    </div>
  );
}

export default SocialMedia;
