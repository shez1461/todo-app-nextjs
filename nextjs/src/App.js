import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import Copyright from './Copyright';
import { Alert, Stack } from '@mui/material';
import { Box, Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';
import DeleteSweep from '@mui/icons-material/DeleteSweep';
import MaterialUISwitch from '../components/muiswitch';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const LOCAL_STORAGE_ADD = 'todo.list.app'

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('');
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const todoNameRef = useRef()

  // Get Item in browser LocalStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ADD))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  // Set Item in browser LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ADD, JSON.stringify(todos))
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
    if (name === '') {
      return
    } 
    else {
      setTodos(prevTodos => {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
      })
      console.warn('Added:', name)
    }
    todoNameRef.current.value = null
  }

  // Handle Save Edit
  function saveEdit(id) {
    console.warn('id:', id)
    const findTag = document.getElementById("textarea")
    const refName = todoNameRef.current.value;
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id != id) {
        editingText = todo.name;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    console.warn('getElementById:', findTag, refName)
  }

  // Delete a Todo
  function deleteTodo() {
    const deleteATodo = todos.filter(todo => !todo.complete)
    setTodos(deleteATodo)
  }

  // Handle Delete Todo
  function handleDeleteTodos() {
    const newTodos = todos.filter(todo => todo.complete && !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <Container maxWidth="sm">
      <MaterialUISwitch />
      <Box
        component="form"
        sx={{
          '& > :not(style)': { mt: 2, my: 2, m: 2, width: '100%' },
          width: 500,
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
            placeholder="Type here to add new task item..."
            inputProps={{ minLength: 2, maxLength: 256 }}
            type="text"
            fullWidth
            inputRef={todoNameRef}
            multiline={true}
          />
          {/* Icons */}
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton onClick={handleAddTodo} color="primary" sx={{ p: '10px' }} aria-label="directions">
            <AddIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton onClick={deleteTodo} color="default" sx={{ p: '10px' }} aria-label="directions">
            <DeleteForeverIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton onClick={handleDeleteTodos} color="default" sx={{ p: '10px' }} aria-label="directions">
            <DeleteSweep />
          </IconButton>
        </Paper>

        <TodoList 
          sx={{
            '& > :not(style)': { mt: 2, my: 2, m: 2, width: '100%' },
            maxWidth: '100%',
          }}
          todos={todos}
          toggleTodo={toggleTodo}
          saveEdit={saveEdit}
        />

        {/* Buttons
        <Stack direction="row" align="center" spacing={2}>
          <Button color="success" size="large" variant="contained">Add</Button>
          <Button color="primary" size="large" onClick={handleEditTodo} variant="outlined" disabled>Edit</Button>
          <Button color="warning" size="large" onClick={handleDeleteTodos} variant="outlined">Delete</Button>
        </Stack>
        */}

        {/* Alert - Incomplete/Pending tasks todo */}
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert id="alertMsg" variant="standard" severity="success">
            <div>Completed: <b>{todos.filter(todo => todo.complete).length}</b></div>
          </Alert>
          <Alert id="alertMsg" variant="standard" severity="warning">
            <div>Incomplete: <b>{todos.filter(todo => !todo.complete).length}</b></div>
          </Alert>
          <Alert id="alertMsg" variant="standard" severity="info">
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