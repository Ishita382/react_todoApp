import React, {Component} from 'react';
import { styled } from '@mui/system';


const CustomInput=styled('input')`
    font-size:25px;
    width:550px;
    border: none;
    :focus{
      border:none;
   
  }
  box-shadow: inset 0 -2px 1px rgb(0 0 0 / 3%);
`;



class Input extends Component{
  render(){
  return <CustomInput aria-label="Demo input" placeholder="What needs to be done?" value={this.props.value} 
  onChange={this.props.click}
  onKeyPress={this.props.enter} />;
}
}



export default Input;