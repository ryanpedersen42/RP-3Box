import React from 'react';
import FormInput from '../form-input/form-input';

import './create-new-space.styles.scss';

const CreateSpace = ({ createNewSpace, handleKeyChange, displayValue }) => {

  const handleChange = (e) => {
    handleKeyChange(e.target.value);
  }

  return (
  <div>
    <h3 className='section-header'>Create New Space</h3>
    <FormInput
      onChange={handleChange}
      label='new space'
    />
    <button className='custom-button' onClick={createNewSpace}>create new space</button> 
    {displayValue}
  </div>

  )
}

export default CreateSpace;