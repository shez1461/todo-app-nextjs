import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField  from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useLocalStorage } from "../hooks/useLocalStorage";
import Tooltip from '@mui/material/Tooltip';

const LOCAL_STORAGE = 'todo.list.app2'

export default function Todo({ todo, toggleTodo, saveEdit }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState([])
  const todoNameRef = useRef()
  const labelId = `checkbox-list-label-${todo.id}`;
  const [asd, setName] = useLocalStorage(LOCAL_STORAGE, '');

  // Get Item in browser LocalStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  // Set Item in browser LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(todos))
  }, [todos])

  function handleTodoClick() {
    console.log('[x] -', todo.complete, todo.id);
    toggleTodo(todo.id)
  }

  // Handle Save Edit
  function saveEdit(id) {
    const name = todoNameRef.current.value
    if (name === '') {
      return
    } 
    else {
      setTodos(prevTodos => {
        return [...prevTodos, { id: todo.id, name: name, complete: false}]
      })
      console.warn('Edited:', todo.id, name)
    }
    todoNameRef.current.value = name
  }

  return (
    <>
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <Tooltip title="" placement="left">
          <Checkbox 
            id={`checkbox-uuid-${todo.id}`}
            type="checkbox"
            checked={todo.complete} 
            onChange={handleTodoClick}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            inputProps={{ 'aria-labelledby': labelId }}
            color="success"
            tabIndex={-1}
          />
        </Tooltip>
        <Tooltip title="" placement="top">
          <TextField 
            //id={labelId}
            id="textarea"
            sx={{ width: '100%' }}
            //value={name}
            defaultValue={todo.name} // Default value as per mui doc
            inputProps={{ minLength: 2, maxLength: 256 }}
            variant="standard"
            color="success"
            hiddenLabel
            //multiline={true}
            inputRef={todoNameRef}
            //onChange={(e) => saveEdit(e.target.value)}
          />
        </Tooltip>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Tooltip title="Edit" placement="right">
          <IconButton onClick={(e) => saveEdit(e.target.value)} color="default" sx={{ p: '10px' }} aria-label="directions">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </>
  )
}
