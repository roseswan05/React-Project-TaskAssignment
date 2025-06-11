import React, { useEffect, useState } from "react";
import { Box, Container, Divider } from "@mui/material";
import axiosInstance from "../../api/axios";
import AddTaskForm from "../AddTaskForm";
import TaskList from "../TaskList";
import TitleText from "../typography/TitleText";

const Home = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/todos");
      setTasks(res.data.todos);
    } catch (error) {
      console.error("خطا در گرفتن تسک‌ها:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask: any) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box>
        <TitleText>مدیریت تسک‌ها</TitleText>
        <AddTaskForm onTaskAdded={handleTaskAdded} />
        <Divider sx={{ my: 4 }} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </Box>
    </Container>
  );
};

export default Home;
