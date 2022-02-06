import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField  from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function Todo({ todo, toggleTodo, saveEdit }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('')
  const todoNameRef = useRef()
  const labelId = `checkbox-list-label-${todo.id}`;

  function handleTodoClick() {
    console.log('[x]');
    toggleTodo(todo.id)
  }

  function savedEdit() {
    console.log('[saved]');
    saveEdit(todo.name)
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
          //id={labelId}
          id="textarea"
          sx={{ width: '100%' }}
          //value={todo.name}
          defaultValue={todo.name} // Default value as per mui doc
          inputProps={{ minLength: 2, maxLength: 256 }}
          variant="standard"
          color="primary"
          hiddenLabel
          multiline={true}
          inputRef={todoNameRef}
          onChange={e => setTitle(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton onClick={savedEdit} color="default" sx={{ p: '10px' }} aria-label="directions">
          <EditIcon />
        </IconButton>
      </Paper>
    </>
  )
}
