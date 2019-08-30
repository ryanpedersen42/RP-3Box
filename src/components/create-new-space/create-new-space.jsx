import React, { Component } from 'react';
import FormInput from '../form-input/form-input';

import './create-new-space.styles.scss';

class CreateSpace extends Component {
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
  
  toggleThisComponent = () => {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden })
  }

  render() {
    const { createNewSpace } = this.props;
    const { hidden } = this.state;
    return (
    <div>
      <h3 className='section-header' onClick={this.toggleThisComponent}>Create New Space</h3>

      { 
          hidden ? 
          null 
          : 
          <>
            <FormInput
              onChange={this.handleChange}
              label='new space'
            />
            <button className='custom-button' onClick={createNewSpace}>create new space</button> 
        </>
      }
    </div> 
    )
  }
}

export default CreateSpace;
