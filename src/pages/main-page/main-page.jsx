import React from 'react';
import ProfileHover from 'profile-hover';

import InputForm from '../../components/input-form/input-form';
import Header from '../../components/header/header';
import SecretList from '../../components/secret-list/secret-list';
import DropDown from '../../components/dropdown-selector/dropdown-selector';
import CreateSpace from '../../components/create-new-space/create-new-space';

import './main-page.styles.scss';

const MainPage = ({ ethAddress, handleKeyChange, createNewSpace, handleValueChange, userProfile, value, inputKey, onSubmit, privateLogs, spaceOptions, changeSelectedSpace, selectedSpace, dappStorage, deleteSecret }) => (
  <React.Fragment>
          <Header />
      <div className='main-page'>
        <div className='profile-hover'>
          <ProfileHover address={ethAddress} showName/>
        </div>
        <DropDown 
          spaceOptions={spaceOptions}
          changeSelectedSpace={changeSelectedSpace}
          selectedSpace={selectedSpace}
         />
         <CreateSpace 
          handleKeyChange={handleKeyChange}
          createNewSpace={createNewSpace}
          />
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
         <SecretList 
           privateLogs={privateLogs}
           deleteSecret={deleteSecret}
         />
        </div>
  </React.Fragment>
);

export default MainPage;