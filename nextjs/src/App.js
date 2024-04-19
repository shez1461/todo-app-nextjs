import React, { useState, useRef, useEffect, useContext } from "react";
import TodoList from "../components/TodoList";
import { v4 as uuidv4 } from "uuid";
import Footer from "../components/Footer";
import { Alert, Stack } from "@mui/material";
import { Box, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import DeleteSweep from "@mui/icons-material/DeleteSweep";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BasicMenu from "../pages/BasicMenu";
//import useDarkMode from '../hooks/useDarkMode';
//import useLocalStorage from "../hooks/useLocalStorage";
//import useDarkMode from '../hooks/use-dark-mode';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const LOCAL_STORAGE = "todo.list.app";

export const App = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  // Get Item in browser LocalStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Set Item in browser LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(todos));
  }, [todos]);

  // Handle Enter Key
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleAddTodo(e);
    }
  };

  // Toggle Todo
  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  // Handle Add Todo
  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") {
      return;
    } else {
      setTodos((prevTodos) => {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
      });
      console.warn("Added:", name);
    }
    todoNameRef.current.value = null;
  }

  // Delete a Todo
  function deleteTodo() {
    const deleteATodo = todos.filter((todo) => !todo.complete);
    setTodos(deleteATodo);
  }

  // Handle Delete Todo
  function handleDeleteTodos() {
    const newTodos = todos.filter((todo) => todo.complete && !todo.complete);
    setTodos(newTodos);
  }

  return (
    <Grid
      container
      sx={{
        paddingTop: 2,
        paddingBottom: "100%",
        flexGrow: 1,
        overflow: "hidden",
        bgcolor: "background.default",
        border: "1px round background.default",
      }}
    >
      <Box
        sx={{
          height: "auto",
          flexGrow: 1,
          overflow: "hidden",
          bgcolor: "background.default",
          border: "1px round background.default",
        }}
      >
        <Paper
          sx={{
            bgcolor: "background.default",
            maxWidth: "90%",
            my: 2,
            mx: "auto",
            p: 2,
          }}
        >
          <Grid
            container
            wrap="nowrap"
            spacing={2}
            width="100%"
            maxWidth="100%"
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  mt: 2,
                  my: 2,
                  m: 2,
                  width: "100%",
                  height: "auto",
                },
                width: "100%",
                maxWidth: "100%",
              }}
              noValidate
              autoComplete="off"
            >
              {/* Theme Switch <MaterialUISwitch /> darkMode={darkMode} setDarkMode={setDarkMode} */}
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "100%",
                  alignItems: "center",
                  justifyContent: "right",
                  bgcolor: "background.primary",
                  color: "text.primary",
                  borderRadius: 1,
                  p: 1,
                }}
              >
                {theme.palette.mode} mode
                <Tooltip title="Appearance" placement="bottom">
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                  >
                    {theme.palette.mode === "dark" ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>

              {/*<BasicMeta />*/}
              <BasicMenu />

              {/* Header H1/H4 */}
              <Typography variant="h4" component="h1" gutterBottom>
                Tasks List
              </Typography>

              {/* Alert tally - Incomplete/Pending tasks todo */}
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert id="alertMsg" variant="outlined" severity="success">
                  <div>
                    Completed:{" "}
                    <strong>
                      {todos.filter((todo) => todo.complete).length}
                    </strong>
                  </div>
                </Alert>
                <Alert id="alertMsg" variant="outlined" severity="warning">
                  <div>
                    Incomplete:{" "}
                    <strong>
                      {todos.filter((todo) => !todo.complete).length}
                    </strong>
                  </div>
                </Alert>
                <Alert id="alertMsg" variant="outlined" severity="info">
                  <div>
                    Total:{" "}
                    <strong>{todos.filter((todo) => todo).length}</strong>
                  </div>
                </Alert>
              </Stack>

              <Paper
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <InputBase
                  sx={{ fontSize: "12px", ml: 1, flex: 1 }}
                  id="inputField"
                  placeholder="Type here to add new task item..."
                  inputProps={{ minLength: 2, maxLength: 256 }}
                  type="text"
                  fullWidth
                  inputRef={todoNameRef}
                  onKeyDown={handleEnterKey}
                  //multiline={true}
                />
                {/* Icons */}
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip title="Add" placement="top">
                  <IconButton
                    onClick={handleAddTodo}
                    color="default"
                    sx={{ p: "10px" }}
                    aria-label="directions"
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip title="Clear Completed" placement="top">
                  <IconButton
                    onClick={deleteTodo}
                    color="default"
                    sx={{ p: "10px" }}
                    aria-label="directions"
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip title="Clear All" placement="top">
                  <IconButton
                    onClick={handleDeleteTodos}
                    color="default"
                    sx={{ p: "10px" }}
                    aria-label="directions"
                  >
                    <DeleteSweep />
                  </IconButton>
                </Tooltip>
              </Paper>

              <TodoList
                sx={{
                  "& > :not(style)": { mt: 2, my: 2, m: 2, width: "100%" },
                  maxWidth: "100%",
                }}
                todos={todos}
                toggleTodo={toggleTodo}
                //saveEdit={saveEdit}
              />

              <Footer />
            </Box>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
};

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
