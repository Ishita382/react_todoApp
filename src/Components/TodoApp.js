
import uuid from 'react-uuid';
import TodoItem from './TodoItem';
import Input from "./Input";
import Footer from "./Footer";
import Button from "./Button";
import { useState, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";

function TodoApp(){

   
     
        const [all, setAll] = useState([]);
        const [newToDo, setNewToDo] = useState("");
        const[mode, setMode] = useState("all");
        const [editToDo, setEditToDo] = useState("");
          
       
      const addTodo = useCallback(() => {
        const newtodolist = [
          ...all, { id : uuid(), action:newToDo, done:false, isEdit: false},

        ];
        setAll(newtodolist);
        setEditToDo("");
      },[all, newToDo, setEditToDo]);
      
      
     
  
    
     
      const toggleDone = useCallback( (todo) =>
      {
       const toggle = [...all].map((item) =>
          item.id === todo.id ? { ...item, done: !item.done } : item
        );
        setAll(toggle);
      },
      [all]
      );
    


     
      const deleteTodo = useCallback(
        (todo) => {
          const filter = [...all].filter(
            (item) => all.indexOf(item) !== all.indexOf(todo)
          );
          setAll(filter);
        },
        [all]
      );
    
      
      const edit = useCallback(
        (todo) => {
          const isedit = [...all].map((item) =>
            item.id === todo.id ? { ...item, isEdit: !item.isEdit } : item
          );
          setAll(isedit);
          setEditToDo(todo.action);
        },
        [all, setEditToDo]
      );
    
     
      const handleKeyEdit = useCallback(
        (e, id) => {
          if (e.key === "Enter") {
            const edittodo = [...all].map((item) =>
              item.id === id ? { ...item, action: editToDo, isEdit: false } : item
            );
            setAll(edittodo);
            setEditToDo("");
          }
        },
        [all, editToDo]
      );
      
      const list = useMemo(()=> [...all].length,[all]);
    
    
      const listToMap = useMemo(() => {
        if (mode === "active") {
          return [...all].filter((item) => item.done === false);
        } else if (mode === "completed") {
          return [...all].filter((item) => item.done === true);
        } else {
          return all;
        }
      }, [mode, all]);
    
      const completed = useMemo(
        () => [...all].filter((item) => item.done === true).length,
        [all]
      );

      const checkAll = useCallback(() =>{
        const temp = completed < list ? [...all].map((item) => (item = {...item, done:true})) 
        : [...all].map((item) => (item = { ...item, done:false}));
        setAll(temp);
      },[completed, list, all]);

       
    
    
      const changeMode = (mode) => setMode(mode);
    
   
    const clear = useCallback(() => {
      const filterarray = [...all].filter((item) => item.done === false);
      setAll(filterarray);
    }, [all]);
  
    
    
    const left = useMemo(
      () => [...all].filter((item) => item.done === false).length,
      [all]
    );
     
    
        return(
            <Box>
              <h1 className="heading">todos</h1>
              <div className="main">
             <div className="top">
              <Button countAll={list} checkAll={checkAll}/>
               <Input value={newToDo} change={(e)=>setNewToDo(e.target.value)}
                enter={(e)=>e.key==="Enter" && addTodo()}/>
             </div>
             {listToMap.map((item)=>(
            <TodoItem todo={item} toggle={toggleDone} value={editToDo} change = {(e) => setEditToDo(e.target.value)}
            enter={handleKeyEdit} editInput={edit}   delete={deleteTodo}/> ))}
              {list > 0 &&(
                <Footer 
                left={left}
                completed={completed}
                change={changeMode}
                clear={clear}
                />
              )}
             </div>
            </Box>
        );
      
    }
    
export default TodoApp;