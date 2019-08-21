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
      myAddress: '',
      myDid: '',
      myProfile: {},
      isAppReady: false,
      privateSpaces: [],
      isComponentReady: false,
    };
  }

  async componentDidMount() {
    const { box } = this.state;
    const { history } = this.props;

    // if you haven't openedBox, return to login
    if (!box) history.push('/');
    this.setState({ isAppReady: true });
  }

  handleLogin = async () => {
    const { history } = this.props
    const addresses = await window.ethereum.enable();
    const myAddress = addresses[0];
    
    // get my box and profile
    const box = await Box.openBox(myAddress);
    const myProfile = await Box.getProfile(myAddress);

    // set all to state and continue
    await new Promise((resolve, reject) => box.onSyncDone(resolve));

    const testDapp = await box.openSpace('testDapp')
    const privateSpaces = await testDapp.private.log

    // set all to state and continue
    await this.setState({ box, myProfile, myAddress, privateSpaces, isAppReady: true});
    // console.log('privatespace', this.state.privateSpaces)
    history.push('/chat');
  }

  render() {
    const {
      isAppReady,
      myProfile,
      myAddress,
      box,
      privateSpaces,
      // myDid
    } = this.state;

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
                  myAddress={myAddress}
                  myProfile={myProfile}
                  box={box}
                  privateSpaces={privateSpaces}
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
