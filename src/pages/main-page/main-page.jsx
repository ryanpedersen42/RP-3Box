import { tsPropertySignature } from "@babel/types";

import React, { Component } from 'react';
import ProfileHover from 'profile-hover';

import InputForm from '../../components/input-form/input-form';
import Header from '../../components/header/header';
import SecretList from '../../components/secret-list/secret-list';

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log('second tier', this.props.privateSpaces[0])
  // }

  render() {
    const { myAddress, myProfile, box, privateSpaces } = this.props;
    return (
      <React.Fragment>
        {/* <ProfileHover myAddress={myAddress}/> */}
        <Header
        myAddress={myAddress}
        box={box}
        />
        <InputForm 
          myAddress={myAddress}
          myProfile={myProfile}
          box={box}
          privateSpaces={privateSpaces}
         />
         <SecretList />
      </React.Fragment>
    )
  }
}

export default MainPage;