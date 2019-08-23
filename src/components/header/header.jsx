import React from 'react';
// import ProfileHover from 'profile-hover';

import './header.styles.scss';

const Header = ({ ethAddress, box }) => {
  return (
    <div className='header'>
      <div className='logo'>
      3DropBox
      {/* <ProfileHover address={ethAddress}/> */}
      </div>
      <div className='options'>
        <a to='/' href='mygithubrepo'>github</a>
        <div to='/'>sign out</div>
      </div>
    </div>
  )
}

export default Header;