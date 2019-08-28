import React from 'react';

import './secrets.styles.scss';

const Secrets = ({ value, major, deleteSecret }) => {
  return (
      <div className='checkout-item'>
        <span className='key'>
          {major}
        </span>
        <span className='value'>
          {JSON.stringify(value)}
        </span>
        <span onClick={() => deleteSecret}>
          x
        </span>
    </div>
  )
};

export default Secrets;