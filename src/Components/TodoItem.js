import React, { Component } from "react";

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Input from "@mui/material/Input";
import { styled } from '@mui/material/styles';
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Button from "@mui/material/Button";

const CustomizedBox = styled(Box)`
  display: flex;
  margin: auto;
  border:none;
  width: 600px;
  :hover {
    .delete {
      display: initial;
    }
  }
 padding-right: 40px;
 border-bottom: 1px solid #E5E8EA;
`;

const TickCircle = styled(CheckCircleOutlinedIcon)`
  color: green;
  font-size: 30px;
`;

const Circle = styled(CircleOutlinedIcon)`
  color: #E5E8EA;
  font-size: 30px;
  :focus{
    color: #E5E8EA;
  }
`;

const CustommInput = styled(Input)`
  font-size: 25px;
  width: 550px;
  padding: 10px;
  margin-left: 45px;
  
`;

const List = styled(Box)`
  font-size: 25px;
  padding: 15px 0px;
  color: rgb(105, 105, 105);
  width: 500px;
`;

const Delete = styled(Button)`
  color: rgba(175, 47, 47);
  margin: auto 10px auto auto;
  display: none;
`;

class TodoItem extends Component {
    render() {
      return (
        <CustomizedBox key={this.props.todo.id}>
          {this.props.todo.isEdit ? null : (
            <Button onClick={() => this.props.toggle(this.props.todo)}>
              {this.props.todo.done ? <TickCircle /> : <Circle />}
            </Button>
          )}
          {this.props.todo.isEdit ? (
            <CustommInput
              id={this.props.todo.id} type="text" disableUnderline={true} value={this.props.value} onChange={this.props.edit} onKeyPress={this.props.handleEdit}
            />
          ) : (
            <List
              sx={{textDecoration: this.props.todo.done ? "line-through" : "none", }} onDoubleClick={() => this.props.editInput(this.props.todo)}> {this.props.todo.action}
            </List>
          )}
          {this.props.todo.isEdit ? null : (
            <Delete className="delete" onClick={() => this.props.delete(this.props.todo)}
            >
              <CloseIcon /> </Delete> )}</CustomizedBox>
      );
    }
  }
  export default TodoItem;