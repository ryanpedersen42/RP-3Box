import React from 'react';
import SpaceName from '../space-name/space-name';

const SpaceList = ({ privateSpaces }) => {
  
  return (
  <div>
    {
      privateSpaces.map((names, i) => {
          return (
            <SpaceName
              key={names[i].key}
              />
         );
        })
      }
    </div>
  );
}

export default SpaceList;