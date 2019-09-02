import React from 'react';

import './header.styles.scss';

const Header = () => (
  <div className='header'>
    <div className='logo'>
      S3cret Keep3r
    </div>
    <div className='options'>
      <a className='option' href='https://github.com/ryanpedersen42/RP-3Box'>GitHub</a>
      <div className='option' to='/'>Sign Out</div>
    </div>
  </div>
);

export default Header;