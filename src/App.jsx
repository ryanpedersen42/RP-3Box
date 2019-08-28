import React, { Component } from 'react';
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import AuthPage from './pages/auth/auth-page';
import MainPage from './pages/main-page/main-page';
import './App.css';

const Box = require('3box')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: null,
      ethAddress: '',
      userProfile: {},
      isAppReady: false,
      privateSpaces: [],
      spaceOptions: [],      
      selectedSpace: '',
      privateLogs: [],
      dappStorage: [],
      inputKey: '',
      inputValue: '',
    };
  }

  async componentDidMount() {
    const { box } = this.state;
    const { history } = this.props;

    // if you haven't authenticated, keep authentication screen up
    if (!box) history.push('/');
    this.setState({ isAppReady: true });
  }

  handleLogin = async () => {
    const { history } = this.props

    //web3 actions to authenticate with metamask or other provider
    const ethAddresses = await window.ethereum.enable();
    const ethAddress = ethAddresses[0];
    
    // authenticate and get profile data
    const box = await Box.openBox(ethAddress, window.ethereum, {});
    const userProfile = await Box.getProfile(ethAddress);

    //get list of spaces and open a space
    const spaceOptions = await Box.listSpaces(ethAddress)
    const dappStorage = await box.openSpace(spaceOptions[2])
    
    //get logs of actions
    const privateLogs = await dappStorage.public.log
    
    //promise resolution.. waiting from 3Box onSyncDone confirmation
    await new Promise((resolve, reject) => box.onSyncDone(resolve));

    console.log(await Box.listSpaces(ethAddress))

    // set all to state and continue
    await this.setState({ box, userProfile, ethAddress, dappStorage, privateLogs, spaceOptions, selectedSpace: spaceOptions[2] });
    history.push('/main');
  }

  handleKeyChange = (key) => {
    this.setState({inputKey: key})
  } 

  handleValueChange = (value) => {
    this.setState({value: value})
  } 

  onSubmit = async () => {
    const { history } = this.props;
    const { inputKey, value, dappStorage } = this.state;

    await dappStorage.public.set(inputKey, value)
    console.log('worked')
    history.push('/main');
  }

  createNewSpace = async () => {
    const { inputKey, ethAddress, box } = this.state;
    console.log('clicked')

    await box.openSpace(inputKey)
    console.log(await Box.listSpaces(ethAddress))
  }

  changeSelectedSpace = (event) => {
    this.setState({ selectedSpace: event.target.value});
  }

  // createNewSpace = async () => {
  //   const { keyValue, box } = this.state;

  //   try {
  //     await box.openSpace(keyValue)
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  deleteSecret = async () => {
    const { keyValue, dappStorage } = this.state;

    try {
      await dappStorage.public.remove(keyValue);
    } catch(err) {
      console.log(err);
    }
  }
 
  render() {
    const { isAppReady, userProfile, inputKey, inputValue, ethAddress, box, privateLogs, spaceOptions, dappStorage, selectedSpace } = this.state;

    return (
      <div className="App">
        {isAppReady && (<React.Fragment>

          <Switch>
            <Route
              exact
              path='/'
              render={() => (
              <AuthPage handleLogin={this.handleLogin} />
              )}
            />

            <Route
              exact
              path='/main'
              render={() => (
                <MainPage 
                  ethAddress={ethAddress}
                  userProfile={userProfile}
                  box={box}
                  privateLogs={privateLogs}
                  spaceOptions={spaceOptions}
                  inputKey={inputKey}
                  inputValue={inputValue}
                  dappStorage={dappStorage}
                  selectedSpace={selectedSpace}
                  onSubmit={this.onSubmit}
                  handleValueChange={this.handleValueChange}
                  handleKeyChange={this.handleKeyChange}
                  createNewSpace={this.createNewSpace}
                  changeSelectedSpace={this.changeSelectedSpace}
                  deleteSecret={this.deleteSecret}
                />
              )}
            />
          </Switch>
        </React.Fragment>)}
      </div>
    );
  }
}

export default withRouter(App);
