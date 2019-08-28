import React from 'react';

const CreateSpace = ({ createNewSpace, handleKeyChange }) => {

  const handleChange = (e) => {
    // console.log(e.target.value)
    handleKeyChange(e.target.value);
  }

  return (
  <div>
    <input
      onChange={handleChange}
    />
    <button onClick={createNewSpace}>create new space</button> 
  </div>

  )
}

export default CreateSpace;