import React, { Fragment } from 'react';
import ProfileHover from 'profile-hover';

import DropdownSelector from '../../components/dropdown-selector/dropdown-selector';
import InputForm from '../../components/input-form/input-form';
import Header from '../../components/header/header';
import CreateNewSpace from '../../components/create-new-space/create-new-space';
import GetSecret from '../../components/get-secret/get-secret';

import './main-page.styles.scss';

const MainPage = ({ ethAddress, handleKeyChange, createNewSpace, handleNameChange, displayValue, handleLogout, getSecret, handleValueChange, inputValue, inputKey, onSubmit, spaceOptions, changeSelectedSpace, selectedSpace, deleteSecret }) => (
  <Fragment>
      <Header
        handleLogout={handleLogout}
       />
      <div className='main-page'>
        <div className='profile-hover'>
          <ProfileHover 
            address={ethAddress} 
            showName
            orientation='left'
          />
        </div>
        <DropdownSelector 
          spaceOptions={spaceOptions}
          changeSelectedSpace={changeSelectedSpace}
          selectedSpace={selectedSpace}
         />
        <div className='main-page-section'>
        <GetSecret
          getSecret={getSecret}
          handleKeyChange={handleKeyChange}
          displayValue={displayValue}
          />
        </div>
        <div className='main-page-section'>
          <InputForm 
            handleValueChange={handleValueChange}
            handleKeyChange={handleKeyChange}
            onSubmit={onSubmit}
            inputKey={inputKey}
            inputValue={inputValue}
          />
        </div>
         <div className='main-page-section'>
          <CreateNewSpace 
            handleNameChange={handleNameChange}
            createNewSpace={createNewSpace}
          />
        </div>
      </div>
  </Fragment>
);

export default MainPage;