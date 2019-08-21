import React, { Component } from 'react';
import SecretList from '../secret-list/secret-list';

const Box = require('3box')

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      value: '',
      privateValue: '',
      privateSpaces: [],
      privateSpacesKeys: [],
      firstKey: '',
      selectedPrivateSpace: '',
      firstValue: '',
      testDapp: {},
      isComponentReady: false,
    }
  }

  // componentDidMount() {
  //   const { box, myAddress } = this.props;

  //   console.log('third tier', this.props.privateSpaces[0])

  // }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value})
  }  

  testFunction2 = async () => {
    const { privateText, box } = this.props;

    // const dappStorage = await box.openSpace('testDapp')
    // // await dappStorage.public.set('firstPublicTest', 'it worked') 
    // await dappStorage.private.set('secondPrivateTest', privateText)

  }

  getSpaceCall = async () => {
    const { box } = this.props;

    const testDapp = await box.openSpace('testDapp')
    // console.log(await box.openSpace('testDapp'))
    this.setState({ testDapp })


    //get private spaces (array of objects)
    // const privateSpaces = await testDapp.private.log
    // console.log(privateSpaces)


    //get array of the different keys
    // let privateSpacesKeys = await privateSpaces.map(post => post.key)

    // console.log(privateSpacesKeys)
    // console.log('private space', privateSpaces)
    // this.setState({ privateSpacesKeys })
    // console.log(privateSpaces[privateSpaces.length-1].key)
    // console.log(privateSpaces[0].value)

    // this.setState({ firstKey: privateSpaces[0].key, firstValue: privateSpaces[0].value })

    //get specific private space
    // const privateSpace = await testDapp.private.get(selectedPrivateSpace)

    // console.log(await testDapp.private.log)
  }

  listSpaces = async () => {
    const { myAddress } = this.props;
    // const userSpaces = await Box.listSpaces(myAddress)
    console.log(await Box.listSpaces(myAddress))
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
    const { firstKey, firstValue, privateSpacesKeys } = this.state;
    const { privateSpaces } = this.props;
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
            <p>key: {firstKey}</p>
            <p>value: {firstValue}</p>
                        <p>SHOULD BE HERE {privateSpaces[0].key}</p>

            <SecretList
              privateSpaces={privateSpaces}
             />
            <div>
              {
                this.state.privateSpaces ? <p>{privateSpacesKeys}</p> : null
              }
            </div>
      </div>
    )
  }
}

export default InputForm;