import React from 'react';

const DropDown = ({ spaceOptions, selectedSpace, changeSelectedSpace }) => (
  <div>
    <select defaultValue={selectedSpace} onChange={event => changeSelectedSpace(event)}>
      {spaceOptions.map((option) => {
        return ( 
        <option key={option} value={option}>{option}</option>
        )
      })} 
    </select>
  </div>
)

export default DropDown;