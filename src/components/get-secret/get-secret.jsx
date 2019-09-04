import React, { Component, Fragment } from 'react';

import FormInput from '../form-input/form-input';

import './get-secret.styles.scss';

class GetSecret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    }
  }

  handleChange = (e) => {
    const { handleKeyChange } = this.props;
    handleKeyChange(e.target.value);
  }

  copyToClipboard = (e) => {
    this.input.select();
    document.execCommand('copy');
    e.target.focus();
  }

  toggleThisComponent = () => {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden })
  }

  render() {
    const { displayValue, getSecret } = this.props;
    const { hidden } = this.state;
    return (
      <div>
        <h3 className='section-header' onClick={this.toggleThisComponent}>Get Secret</h3>
        { 
          hidden ? 
          null 
          : 
          <Fragment>
          <FormInput
            handleChange={this.handleChange}
            label='which secret do you want?'
          />
          <button 
            className='custom-button padded-button' 
            onClick={getSecret}
          >
            get secret
          </button> 
            {
              (displayValue.length > 1) && document.queryCommandSupported('copy') &&
              <Fragment>
                <div className='padded-button'>
                  <button 
                    className='custom-button padded-button' 
                    onClick={this.copyToClipboard} 
                  >
                    Copy
                  </button> 
                </div>
                <div className='display-value'>
                  secret: {displayValue}
                </div>
                <input
                ref={(input) => this.input = input}
                defaultValue={displayValue}
              />
            </Fragment>
          }
          </Fragment>
        }
      </div>
    )
  }
}

export default GetSecret;