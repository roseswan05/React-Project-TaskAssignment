import React, { useState } from "react";
import { Container, Divider, Paper } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTaskForm from "../AddTaskForm";
import TaskList from "../TaskList";
import { TitleLarge, TitleMedium } from "../typography";

const Home = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  function handleTaskAdded(): void {
    setRefreshFlag((prev) => !prev);
  }   

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <TitleLarge>Add New Task</TitleLarge>
        <AddTaskForm onTaskAdded={handleTaskAdded} />
      </Paper>

      <Divider sx={{ mb: 4 }} />

      <Paper sx={{ p: 3 }} elevation={3}>
        <TitleMedium>Task List</TitleMedium>
        <TaskList refreshFlag={refreshFlag} />
      </Paper>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Container>
  );
};

export default Home;
