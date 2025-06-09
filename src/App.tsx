import React, { useState } from "react";
import { CssBaseline, Container, Paper, Typography, Divider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { Home } from "./components/home";


function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Task
          </Typography>
          <AddTaskForm onTaskAdded={triggerRefresh} />
        </Paper>

        <Divider sx={{ mb: 4 }} />

        <Paper sx={{ p: 3 }} elevation={3}>
          <Typography variant="h5" component="h2" gutterBottom>
            Task List
          </Typography>
          <TaskList refreshFlag={refreshFlag} />
        </Paper>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Container>
    </>
  );
}

export default App;
