import React from 'react';

import './secrets.styles.scss';

const Secrets = ({ value, major }) => {
  return (
      <div className='checkout-item'>
        <span className='key'>
          {major}
        </span>
        <span className='value'>
          {value}
        </span>
        <span>
          x
        </span>
    </div>
  )
};

export default Secrets;