import React from 'react';
import ProfileHover from 'profile-hover';

import InputForm from '../../components/input-form/input-form';
import Header from '../../components/header/header';
import SecretList from '../../components/secret-list/secret-list';
import DropDown from '../../components/dropdown-selector/dropdown-selector';

import './main-page.styles.scss';

const MainPage = ({ ethAddress, userProfile, box, privateLogs, spaceOptions, changeSelectedSpace, selectedSpace }) => (
  <React.Fragment>
          <Header
          ethAddress={ethAddress}
          box={box}
        />
      <div className='main-page'>
      {selectedSpace}
        <div className='profile-hover'>
          <ProfileHover address={ethAddress} showName/>
        </div>
        <DropDown 
          spaceOptions={spaceOptions}
          changeSelectedSpace={changeSelectedSpace}
          selectedSpace={selectedSpace}
         />
         <div className='input-form'>
          <InputForm 
            ethAddress={ethAddress}
            userProfile={userProfile}
            box={box}
            selectedSpace={selectedSpace}
            privateLogs={privateLogs}
          />
        </div>
         <SecretList 
           privateLogs={privateLogs}
         />
        </div>
  </React.Fragment>
);

export default MainPage;