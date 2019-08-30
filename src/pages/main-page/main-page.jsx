import React from 'react';
import ProfileHover from 'profile-hover';

import InputForm from '../../components/input-form/input-form';
import Header from '../../components/header/header';
import DropDown from '../../components/dropdown-selector/dropdown-selector';
import CreateSpace from '../../components/create-new-space/create-new-space';
import GetSecret from '../../components/get-secret/get-secret';

import './main-page.styles.scss';

const MainPage = ({ ethAddress, handleKeyChange, createNewSpace, handleNameChange, displayValue, getSecret, handleValueChange, value, inputKey, onSubmit, spaceOptions, changeSelectedSpace, selectedSpace, dappStorage, deleteSecret }) => (
  <React.Fragment>
      <Header />
      <div className='main-page'>
        <div className='profile-hover'>
          <ProfileHover 
            address={ethAddress} 
            showName
            orientation='left'
          />
        </div>
        <DropDown 
          spaceOptions={spaceOptions}
          changeSelectedSpace={changeSelectedSpace}
          selectedSpace={selectedSpace}
         />
         <div className='input-form'>
         <CreateSpace 
          handleNameChange={handleNameChange}
          createNewSpace={createNewSpace}
          />
          </div>
          <div className='input-form'>
          <GetSecret
          getSecret={getSecret}
          handleKeyChange={handleKeyChange}
          displayValue={displayValue}
           />
          </div>
         <div className='input-form'>
          <InputForm 
            handleValueChange={handleValueChange}
            handleKeyChange={handleKeyChange}
            onSubmit={onSubmit}
            inputKey={inputKey}
            value={value}
            deleteSecret={deleteSecret}
          />
        </div>
      </div>
  </React.Fragment>
);

export default MainPage;