import React, { Component, Suspense } from 'react';
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
    console.log(this.props.privateSpaces)
  }

  render() {
    const { privateSpaces } = this.props;
    const { loadThisComponent } = this.state;
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
          <ul>
          {privateSpaces && privateSpaces.map(privateSpace => (
            <Secrets
              key={privateSpace.timeStamp}
              major={privateSpace.key}
              value={privateSpace.value}
            />
          ))}
          </ul>
          {/* <p>{privateSpaces[0].key} {privateSpaces[0].value}</p> */}
          {/* {privateSpaces.map(privateSpace => (
            <Secrets privateKey={privateSpace.key} secretValue={privateSpace.value} />
          ))}     */}
        </div>
          )
    }
  };

export default SecretList;