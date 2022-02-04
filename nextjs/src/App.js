import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import Copyright from './Copyright';
import { Button, TextField, Alert, Stack } from '@mui/material';
import { Box, Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//import ProTip from '../src/ProTip';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // Toggle Todo
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // Handle Add Todo
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    console.warn('Value: ', name)
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  // Handle Edit Todo
  function handleEditTodo() {
    const editTodo = todos.name
    console.log(editTodo);
  }

  // Handle Delete Todo
  function handleDeleteTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { mt: 2, my: 2, m: 2, width: '100%' },
          width: 450,
          maxWidth: '100%',
        }}
        noValidate
        autoComplete="off"
      >
        {/* Header H1/H4 */}
        <Typography variant="h4" component="h1" gutterBottom>
          To Do
        </Typography>

        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            id="inputField"
            label="Type here to add new task item..."
            placeholder="Type here to add new task item..."
            inputProps={{ 'aria-label': 'Enter text' }}
            inputProps={{ minLength: 2, maxLength: 256 }}
            type="text"
            fullWidth
            inputRef={todoNameRef}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton onClick={handleAddTodo} color="success" sx={{ p: '10px' }} aria-label="directions">
            <AddIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton onClick={handleEditTodo} color="default" sx={{ p: '10px' }} aria-label="directions">
            <EditIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton onClick={handleDeleteTodos} color="warning" sx={{ p: '10px' }} aria-label="directions">
            <DeleteIcon />
          </IconButton>
        </Paper>

        <TodoList 
          sx={{
            '& > :not(style)': { mt: 2, my: 2, m: 2, width: '100%' },
            maxWidth: '100%',
          }}
          todos={todos}
          toggleTodo={toggleTodo}
        />

        {/*
        <Stack direction="row" align="center" spacing={2}>
          <Button color="success" size="large" variant="contained">Add</Button>
          <Button color="primary" size="large" onClick={handleEditTodo} variant="outlined" disabled>Edit</Button>
          <Button color="warning" size="large" onClick={handleDeleteTodos} variant="outlined">Delete</Button>
        </Stack>
        */}

        {/* Alert - Incomplete/Pending tasks todo */}
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert id="alertMsg" variant="outlined" severity="success">
            <div>Completed: <b>{todos.filter(todo => todo.complete).length}</b></div>
          </Alert>
          <Alert id="alertMsg" variant="outlined" severity="warning">
            <div>Incomplete: <b>{todos.filter(todo => !todo.complete).length}</b></div>
          </Alert>
          <Alert id="alertMsg" variant="outlined" severity="info">
            <div>Total Items: <b>{todos.filter(todo => todo).length}</b></div>
          </Alert>
        </Stack>

        {/* User Tip 
        <ProTip />
        */}

        <Copyright/>

      </Box>
    </Container>
    </>
  )
}

export default App;