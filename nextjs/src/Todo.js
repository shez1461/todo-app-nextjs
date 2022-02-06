import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField  from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_EDIT = 'edit'

export default function Todo({ todo, toggleTodo }) {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()
  const labelId = `checkbox-list-label-${todo.id}`;

  // Get Item in browser LocalStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EDIT))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  // Set Item in browser LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_EDIT, JSON.stringify(todos))
  }, [todos])

  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  function handleEditClick() {
    //e.preventDefault(id);
    const newValue = todoNameRef.current.value
    const defValue = todoNameRef.current.defaultValue
    console.warn('Edited:', todo.id, newValue)
    if (newValue != defValue || newValue === defValue) {
      return
    } else {
      setTodos(updateTodos => {
        return [...updateTodos, { id: uuidv4(), name: newValue, complete: false }]
      })
    }
    todoNameRef.current.value = null
  }

  return (
    <>
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <Checkbox 
          id={`checkbox-uuid-${todo.id}`}
          type="checkbox"
          checked={todo.complete} 
          onChange={handleTodoClick}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
          inputProps={{ 'aria-labelledby': labelId }}
          color="primary"
          tabIndex={-1}
        />
        <TextField 
          id={labelId}
          sx={{ width: '100%' }}
          defaultValue={todo.name} // Default value as per mui doc
          inputProps={{ minLength: 2, maxLength: 256 }}
          variant="standard"
          color="primary"
          hiddenLabel
          multiline={true}
          inputRef={todoNameRef}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton onClick={handleEditClick} color="default" sx={{ p: '10px' }} aria-label="directions">
          <EditIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="default" sx={{ p: '10px' }} aria-label="directions">
          <HighlightOffIcon />
        </IconButton>
      </Paper>
    </>
  )
}
