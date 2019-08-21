import React from 'react';
import ProfileHover from 'profile-hover';

import './header.styles.scss';

const Header = ({ myAddress, box }) => {
  return (
    <div className='header'>
      <div className='logo'>
      <ProfileHover address={myAddress}/>
      </div>
      <div className='options'>
        <a to='/'>github</a>
        <div to='/'>sign out</div>
      </div>
    </div>
  )
}

export default Header;