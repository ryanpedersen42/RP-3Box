import React from 'react';

import './dropdown-selector.styles.scss';

const DropDown = ({ spaceOptions, selectedSpace, changeSelectedSpace }) => (
  <div>
    <p className='instructions'>Pick your 3box Space</p>
    <select className='drop-down' defaultValue={selectedSpace} onChange={event => changeSelectedSpace(event)}>
      {spaceOptions.map((option) => {
        return ( 
        <option key={option} value={option}>{option}</option>
        )
      })} 
    </select>
  </div>
)

export default DropDown;