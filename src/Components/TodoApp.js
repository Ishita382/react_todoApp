import React from 'react';
import uuid from 'react-uuid';
import TodoItem from './TodoItem';
import Input from "./Input";
import Footer from "./Footer";
import Button from "./Button";

class TodoApp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          all: [],
      newToDo:"",
      mode:"all",
      editToDo:""
        };
      }
      
      
      handleChange=(event)=>{
        this.setState({newToDo:event.target.value});
      };
    
    
      handleKeypress = e => {
       
      if (e.key==='Enter') {
        this.newTodo();
        this.setState({newToDo:""});
      }
    };
    
      newTodo=()=>{
        this.setState({
          all:[
            ...this.state.all,
            {id:uuid(),action:this.state.newToDo,done:false,isEdit:false}
          ]});
      };
    
     
      toggleDone = (todo) =>
      this.setState({
        all: this.state.all.map((item) =>
          item.id === todo.id ? { ...item, done: !item.done } : item
        ),
      });
    
     
      delete=(todo)=>{
        this.setState({ all: this.state.all.filter((item) => this.state.all.indexOf(item) !== this.state.all.indexOf(todo)) });
      }
    
      
      edit = (todo) => {
        this.setState({
          all: this.state.all.map((item) =>
            item.id=== todo.id ? { ...item, isEdit: !item.isEdit } : item
          ),
          editToDo: todo.action
        });
      }
    
     
      handleEdit= e =>{
        this.setState({editToDo : e.target.value});
      };
    
      
      handleKeyEdit = event => {
        
      if (event.key==='Enter') {
        this.editTodo(event.target.id);
        this.setState({editToDo:""});
      }
    };
    
      
      editTodo=(id)=>{
        this.setState({
          all: this.state.all.map((item) =>
            item.id === id ? { ...item, action:this.state.editToDo ,isEdit:false} : item
          )
        });
      }
    
    
    listToMap=()=> {
      if(this.state.mode==="active")
      {
        return this.state.all.filter(item=>item.done===false);
      }
      else if(this.state.mode==="completed"){
        return this.state.all.filter(item=>item.done===true);
      }
      else{
        return this.state.all;
      }
      }
    
     
     checkAll = () =>{
        if(this.count("completed")<this.count()){
      this.setState({ all : this.state.all.map((item) =>
      item = { ...item, done: true })})
      }
      else{
        this.setState({ all : this.state.all.map((item) =>
          item = { ...item, done: false })})
      }
    }
    
    
    setMode=(mode)=>{
         this.setState({mode:mode});
    }
    
   
    clear=()=>{
      this.setState({all:this.state.all.filter(item=>item.done===false)});
    }
    
    
    count=(mode)=>{
        switch(mode){
          case "completed":
            return this.state.all.filter(item=>item.done===true).length;
          case "active":
            return this.state.all.filter(item=>item.done===false).length;
          default:
            return this.state.all.length;
        }
    }
     
      render(){
        return(
            <>
              <h1 className="heading">todos</h1>
              <div className="main">
             <div className="top">
              <Button count={this.count} checkAll={this.checkAll}/>
               <Input value={this.state.newToDo} click={this.handleChange} enter={this.handleKeypress}/>
             </div>
             {this.listToMap().map((item)=>(
            <TodoItem todo={item} toggle={this.toggleDone} value={this.state.editToDo}
            edit={this.handleEdit} handleEdit={this.handleKeyEdit} editInput={this.edit} delete={this.delete}/> ))}
            {this.count("all")?<Footer count={this.count} setMode={this.setMode} clear={this.clear}/>:null}
             </div>
            </>
        )
      }
    }
    
export default TodoApp;