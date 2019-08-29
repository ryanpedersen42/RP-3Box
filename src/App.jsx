import React, { Component } from 'react';
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
      privateSpaces: [],
      spaceOptions: [],      
      selectedSpace: '',
      privateLogs: [],
      dappStorage: [],
      inputKey: '',
      inputValue: '',
      newSpaceName: '',
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

    //TODO: make this dymanic 
    const dappStorage = await box.openSpace(spaceOptions[2])
    
    //promise resolution.. waiting from 3Box onSyncDone confirmation
    await new Promise((resolve, reject) => box.onSyncDone(resolve));

    // set all to state and continue
    await this.setState({ box, userProfile, ethAddress, dappStorage, spaceOptions, selectedSpace: spaceOptions[2] });
    history.push('/main');
  }

  //change the key field for input
  handleKeyChange = (key) => {
    this.setState({inputKey: key})
  } 

  handleNameChange = (name) => {
    this.setState({newSpaceName: name})
  }

  //chanve value field for input
  handleValueChange = (value) => {
    this.setState({value: value})
  } 

  //onsubmit new input / key pair
  onSubmit = async () => {
    const { history } = this.props;
    const { inputKey, value, dappStorage } = this.state;

    await dappStorage.public.set(inputKey, value)
    console.log('worked')
    await this.setState({ inputKey: '', value: '' })
    history.push('/main');
    //clear the rest of the state 
    //add an alert that it was successful 
  }

  getSecret = async () => {
    const { inputKey, dappStorage } = this.state;
    
    const displayValue = await dappStorage.public.get(inputKey)
    await this.setState({ displayValue })    
    await console.log(this.state.displayValue)
  }

  //create new space for passwords 
  createNewSpace = async () => {
    const { inputKey, ethAddress, box } = this.state;
    console.log('clicked')

    await box.openSpace(inputKey)
    console.log(await Box.listSpaces(ethAddress))
  }

  //TODO make the above a modal or side bar 

  //change the selected space that you are taking actions on
  changeSelectedSpace = async (event) => {
    await this.setState({ selectedSpace: event.target.value});
    await console.log(this.state.selectedSpace)
  }

  // createNewSpace = async () => {
  //   const { keyValue, box } = this.state;

  //   try {
  //     await box.openSpace(keyValue)
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  //delete selected secret
  deleteSecret = async () => {
    const { inputKey, dappStorage } = this.state;

    //TODO: add new input key to delete once selected
    try {
      await dappStorage.public.remove(inputKey);
    } catch(err) {
      console.log(err);
    }
  }

  //TODO
  //autofill key values 
  //alerts for success and failure on all the actions 
  //re render for form submits 
 
  render() {
    const { isAppReady, userProfile, inputKey, inputValue, displayValue, ethAddress, box, privateLogs, spaceOptions, dappStorage, selectedSpace } = this.state;

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
                  displayValue={displayValue}
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
        </React.Fragment>)}
      </div>
    );
  }
}

export default withRouter(App);
