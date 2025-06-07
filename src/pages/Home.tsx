import React, { useState } from "react";
import { Container, Typography, Divider, Paper } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleTaskAdded = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Add New Task
        </Typography>
        <AddTaskForm onTaskAdded={handleTaskAdded} />
      </Paper>

      <Divider sx={{ mb: 4 }} />

      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Task List
        </Typography>
        <TaskList refreshFlag={refreshFlag} />
      </Paper>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Container>
  );
};

export default Home;
