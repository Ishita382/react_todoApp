import React, {Component} from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';


const CustomButton = styled('Button')`
color: #E5E8EA   ;
border:none;
background-color:white;
padding-right: 20px;
padding-top: 10px;
font-size: 20px;
`
class Arrowbutton extends Component{
    render(){
            return (
                <>
        {this.props.count("all") ? (
          <CustomButton onClick={this.props.checkAll}>
            <FaChevronDown />
          </CustomButton>
        ) : (
          <CustomButton />
        )}
      </>
            );
      }
    }


export default Arrowbutton;