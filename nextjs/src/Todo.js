import * as React from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  return (
    <>
    <div>
      <label>
        <Checkbox 
          type="checkbox"
          checked={todo.complete} 
          onChange={handleTodoClick}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
        />
        <TextField  
          id="filled-basic" 
          label={todo.name} 
          variant="filled" 
        />
      </label>
    </div>
    </>
  )
}