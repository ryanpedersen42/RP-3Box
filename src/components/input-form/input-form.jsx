import React from 'react';
import FormInput from '../form-input/form-input';

const InputForm = ({ onSubmit, inputValue, handleKeyChange, handleValueChange, inputKey, deleteSecret }) => {

  const handleChange1 = (e) => {
    handleKeyChange(e.target.value);
  }

  const handleChange2 = (e) => {
    handleValueChange(e.target.value);
  }
  return (
    <div>
      <form>
        <FormInput 
          name='key' 
          label='key'
          input={inputKey}
          onChange={handleChange1}
          required
          />
        <FormInput 
          name='value' 
          label='value'
          value={inputValue}
          onChange={handleChange2}
          required
          />
            <button 
              className='custom-button'
              onClick={deleteSecret}
            >
              Submit
            </button>
      </form>
    </div>
  )
}

export default InputForm;