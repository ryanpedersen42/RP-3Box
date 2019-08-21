import React from 'react';

const Secrets = ({ value, major }) => {
  return (
    <div> 
    {
      <div className='collection-footer'>
        <span className='price'>{major}: {value}</span>
      </div>
    }
    </div>
  )
};

export default Secrets;