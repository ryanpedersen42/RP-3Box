import React from 'react';
// import ProfileHover from 'profile-hover';

import './header.styles.scss';

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
      3DropBox
      </div>
      <div className='options'>
        <a to='/' className='option' href='mygithubrepo'>GitHub</a>
        <div className='option' to='/'>Sign Out</div>
      </div>
    </div>
  )
}

export default Header;