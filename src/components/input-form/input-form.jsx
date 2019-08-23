import React, { Component } from 'react';
// import SecretList from '../secret-list/secret-list';
import FormInput from '../form-input/form-input';

const Box = require('3box')

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      value: '',
    }
  }

  // handleChange = (event) => {
  //   const { name, value } = event.target
  //   this.setState({[name]: value})
  // }  

  // listSpaces = () => {
  //   const { myAddress } = this.props;
  //   // const userSpaces = await Box.listSpaces(myAddress)
  //   console.log(Box.listSpaces(myAddress))
  // }

  onSubmit = async (event) => {
    event.preventDefault()

    const { testDapp, key, value } = this.state;

    await testDapp.private.set(key, value)
    console.log('key:', key, 'value', value)
  }

  deleteSpace = async () => {
    // private.remove(space, key)
  }

  render() {
    // const { ethAddress } = this.props
    return (
      <div>
        <form>
          <FormInput 
            name='key' 
            label='key'
            value={this.state.key}
            handleChange={this.handleChange}
            required
            />
          <FormInput 
            name='value' 
            label='value'
            value={this.state.value} 
            handleChange={this.handleChange}
            required
            />
              <button 
                type='submit'
                className='custom-button'
                >
                Submit
              </button>
        </form>
      </div>
    )
  }
}

export default InputForm;