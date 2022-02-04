import * as React from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  return (
    <>
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <Checkbox 
        type="checkbox"
        checked={todo.complete} 
        onChange={handleTodoClick}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
        color="success"
      />
      <TextField 
        sx={{ width: '100%' }}
        id="textfield-standard" 
        value={todo.name} 
        variant="standard" 
      />
    </Paper>
    </>
  )
}
