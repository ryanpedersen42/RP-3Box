import React, { Component, Fragment } from 'react';
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import AuthPage from './pages/auth/auth-page';
import MainPage from './pages/main-page/main-page';
import './App.styles.scss';

const Box = require('3box')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: null,
      ethAddress: '',
      userProfile: {},
      isAppReady: false,
      spaceOptions: [],      
      selectedSpace: '',
      dappStorage: [],
      newSpaceName: '',
      inputKey: '',
      inputValue: '',
      displayValue: '',
    };
  }

  async componentDidMount() {
    const { box } = this.state;
    const { history } = this.props;

    // if you haven't authenticated, keep authentication screen up
    if (!box) history.push('/');
    this.setState({ isAppReady: true });
  }

  handleAuth = async () => {
    const { history } = this.props

    // web3 actions to authenticate with metamask or other provider
    const ethAddresses = await window.ethereum.enable();
    const ethAddress = ethAddresses[0];
    
    // authenticate and get profile data
    const box = await Box.openBox(ethAddress, window.ethereum, {});
    const userProfile = await Box.getProfile(ethAddress);

    const myDefault = await Box.getSpace(ethAddress, 'testDapp')
    await console.log('default profile', myDefault.defaultProfile)

    // get list of spaces and open a space
    const spaceOptions = await Box.listSpaces(ethAddress);

    //change to [0] when done testing
    const dappStorage = await box.openSpace(spaceOptions[2]);
    
    // promise resolution.. waiting from 3Box onSyncDone confirmation
    await new Promise((resolve, reject) => box.onSyncDone(resolve));


    // set all to state and continue
    await this.setState({ box, userProfile, ethAddress, dappStorage, spaceOptions, selectedSpace: spaceOptions[2] });

    history.push('/main');
  }

  // change space that actions are being taken on
  changeSelectedSpace = async (event) => {
    const { box } = this.state;

    const selectedSpace = event.target.value;

    const dappStorage = await box.openSpace(selectedSpace);

    await this.setState({ selectedSpace, dappStorage });
  }

  // to create new space
  handleNameChange = (name) => {
    this.setState({newSpaceName: name});
  }
  
  //functions for 
  // change the key field for input
  handleKeyChange = (key) => {
    this.setState({inputKey: key});
  } 

  // change value field for input
  handleValueChange = (value) => {
    this.setState({inputValue: value});
  } 

  // submit new key / value pair from input-form
  onSubmit = async () => {
    const { history } = this.props;
    const { inputKey, inputValue, dappStorage } = this.state;

    // set private key / value pair from input form
    try {
      await dappStorage.private.set(inputKey, inputValue);
    } catch(err) {
      console.log(err);
    }
    // clear state
    await this.setState({ inputKey: '', inputValue: '' });

    // make sure we go to home page (if we end up adding more pages)
    history.push('/main');

    //add an alert that it was successful 
  }

  getSecret = async () => {
    const { inputKey, dappStorage } = this.state;
    
    const displayValue = await dappStorage.private.get(inputKey)

    await this.setState({ displayValue })    
  }

  // create new space 
  createNewSpace = async () => {
    const { inputKey, box } = this.state;

    try {
      await box.openSpace(inputKey);
    } catch(err) {
      console.log(err);
    }
  }

  // delete selected secret
  deleteSecret = async () => {
    const { inputKey, dappStorage } = this.state;

    //TODO: add new input key to delete once selected
    try {
      await dappStorage.private.remove(inputKey);
    } catch(err) {
      console.log(err);
    }
  }

  //TODO
  //more alerts...
  //delete secret
  //re render for form submits 
  //add blockies for non registered accounts // update profiles page
 
  render() {
    const { isAppReady, inputKey, inputValue, displayValue, ethAddress, spaceOptions, selectedSpace } = this.state;

    return (
      <div className='App'>
        {isAppReady && (<Fragment>
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
              <AuthPage 
                handleAuth={this.handleAuth} 
              />
              )}
            />
            <Route
              exact
              path='/main'
              render={() => (
                <MainPage 
                  //state
                  ethAddress={ethAddress}
                  spaceOptions={spaceOptions}
                  inputKey={inputKey}
                  inputValue={inputValue}
                  selectedSpace={selectedSpace}
                  displayValue={displayValue} 
                  
                  //functions
                  onSubmit={this.onSubmit}
                  handleValueChange={this.handleValueChange}
                  handleNameChange={this.handleNameChange}
                  handleKeyChange={this.handleKeyChange}
                  createNewSpace={this.createNewSpace}
                  changeSelectedSpace={this.changeSelectedSpace}
                  getSecret={this.getSecret}
                  deleteSecret={this.deleteSecret}
                />
              )}
            />
          </Switch>
        </Fragment>)}
      </div>
    );
  }
}

export default withRouter(App);
