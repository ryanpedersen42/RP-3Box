import React, { Component } from 'react';
import SecretList from '../secret-list/secret-list';

const Box = require('3box')

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      value: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value})
  }  

  listSpaces = () => {
    const { myAddress } = this.props;
    // const userSpaces = await Box.listSpaces(myAddress)
    console.log(Box.listSpaces(myAddress))
  }

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
    const { privateLogs, selectedSpace, userProfile, ethAddress } = this.props;
    return (
      <div>
        <form>
          {/* <p>key</p>
          <input
            type='text'
            onChange={this.handleChange}
            name='key'
            />
            <p>value</p>
            <input
            type='text'
            onChange={this.handleChange}
            name='value'
            />
            <button onClick={this.onSubmit}>submit</button> */}
        </form>
            {/* <button onClick={this.getSpaceCall}>get space call</button>
            <button onClick={this.listSpaces}>list spaces</button> */}
      </div>
    )
  }
}

export default InputForm;