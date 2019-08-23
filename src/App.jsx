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
    const box = await Box.openBox(ethAddress);
    const userProfile = await Box.getProfile(ethAddress);

    const spaceOptions = await Box.listSpaces(ethAddress)
    const dappStorage = await box.openSpace(spaceOptions[2])
    const privateLogs = await dappStorage.private.log
    
    //promise resolution.. waiting from 3Box onSyncDone confirmation
    await new Promise((resolve, reject) => box.onSyncDone(resolve));

    // set all to state and continue
    await this.setState({ box, userProfile, ethAddress, privateLogs, spaceOptions, selectedSpace: spaceOptions[2] });
    history.push('/chat');
  }

  changeSelectedSpace = (event) => {
    this.setState({ selectedSpace: event.target.value});
  }

  render() {
    const { isAppReady, userProfile, ethAddress, box, privateLogs, spaceOptions, selectedSpace } = this.state;

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
              path='/chat'
              render={() => (
                <MainPage 
                  ethAddress={ethAddress}
                  userProfile={userProfile}
                  box={box}
                  privateLogs={privateLogs}
                  spaceOptions={spaceOptions}
                  selectedSpace={selectedSpace}
                  changeSelectedSpace={this.changeSelectedSpace}
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
