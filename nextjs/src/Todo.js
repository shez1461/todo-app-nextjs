import * as React from 'react';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField  from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  const labelId = `checkbox-list-label-${todo.id}`;
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
        color="primary"
        tabIndex={-1}
        inputProps={{ 'aria-labelledby': labelId }}
      />
      <TextField 
        id={labelId}
        sx={{ width: '100%' }}
        value={todo.name}
        //text={todo.name}
        variant="standard"
        color="primary"
        hiddenLabel
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="default" sx={{ p: '10px' }} aria-label="directions">
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
