import React, { Component } from 'react';
import Secrets from '../secrets/secrets';

import './secret-list.styles.scss';

class SecretList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loadThisComponent: false,
      loadedData: '',
    }
  };

  componentDidMount() {

  }

  render() {
    const { privateLogs } = this.props;
      return (
        <div className='secrets'>
          <div className='secrets-header'>
            <div className='header-block'>
              <span>Tool</span>
            </div>
            <div className='header-block'>
              <span>Password</span>
            </div>
            <div className='header-block'>
              <span>Delete</span>
            </div>
          </div>
          {privateLogs && privateLogs.map(privateLog => (
            <Secrets
              key={privateLog.timeStamp}
              major={privateLog.key}
              value={privateLog.value}
            />
          ))}
        </div>
          )
    }
  };

export default SecretList;