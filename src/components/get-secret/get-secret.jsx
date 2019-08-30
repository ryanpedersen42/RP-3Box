import React, { Component } from 'react';

import FormInput from '../form-input/form-input';

import './get-secret.styles.scss';

class GetSecret extends Component {
    handleChange = (e) => {
      this.props.handleKeyChange(e.target.value);
    }
  
    copyToClipboard = (e) => {
      this.input.select();
      document.execCommand('copy');
      e.target.focus();
    }

    render() {
      const { displayValue, getSecret } = this.props;
      return (
      <div>
        <h3 className='section-header'>Get Secret</h3>
        <FormInput
          onChange={this.handleChange}
          label='which secret do you want?'
        />
        <button className='custom-button padded-button' onClick={getSecret}>get secret</button> 
          {
            (displayValue.length > 1) && document.queryCommandSupported('copy') &&
            <>
            <div className='padded-button'>
              <button className='custom-button padded-button' onClick={this.copyToClipboard}>Copy</button> 
            </div>
            <div className='display-value'>secret: {displayValue}</div>
            <input
            ref={(input) => this.input = input}
            value={displayValue}
          />
          </>
        }
      </div>
      )
    }
} 


export default GetSecret;

// this.state = { 
//   copySuccess: '',
//   copyText: 'testtext'
// }
// }

// copyToClipboard = (e) => {
// this.input.select();
// document.execCommand('copy');
// // This is just personal preference.
// // I prefer to not show the the whole text area selected.
// // e.target.focus();
// this.setState({ copySuccess: 'Copied!' });
// };

// render() {
// return (
//   <div>
//     {
//      /* Logical shortcut for only displaying the 
//         button if the copy command exists */
//      document.queryCommandSupported('copy') &&
//       <div>
//         <button onClick={this.copyToClipboard}>Copy</button> 
//         {this.state.copySuccess}
//       </div>
//     }
//     <form>
//       <input
//         ref={(input) => this.input = input}
//         value={this.state.copyText}
//       />
//     </form>
//   </div>