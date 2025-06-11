import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../api/axios";
import { toastError, toastSuccess } from "../../utils/toastUtils";
import TitleText from "../typography/TitleText";
import BodyText from "../typography/bodytext";
import Grid from "@mui/material/Grid";



interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TaskListProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTodo, setEditedTodo] = useState<string>("");

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTodo(task.todo);
  };

  const handleSaveClick = async (task: Task) => {
    try {
      if (editedTodo.trim() === "") {
        toastError("عنوان تسک نمی‌تواند خالی باشد");
        return;
      }
      const res = await axiosInstance.put(`/todos/${task.id}`, {
        todo: editedTodo,
        completed: task.completed,
        userId: task.userId,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? res.data : t))
      );
      toastSuccess("تسک با موفقیت به‌روزرسانی شد");
      setEditingTaskId(null);
    } catch (error) {
      toastError("خطا در به‌روزرسانی تسک");
    }
  };

  const handleToggleCompleted = async (task: Task) => {
    try {
      const res = await axiosInstance.put(`/todos/${task.id}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? res.data : t))
      );
      toastSuccess(
        res.data.completed
          ? "تسک انجام شده علامت‌گذاری شد"
          : "تسک به حالت انجام نشده تغییر کرد"
      );
    } catch (error) {
      toastError("خطا در تغییر وضعیت تسک");
    }
  };

  const handleDelete = async (taskId: number) => {
    if (!window.confirm("آیا مطمئنید که می‌خواهید این تسک را حذف کنید؟")) {
      return;
    }
    try {
      await axiosInstance.delete(`/todos/${taskId}`);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      toastSuccess("تسک با موفقیت حذف شد");
    } catch (error) {
      toastError("خطا در حذف تسک");
    }
  };

  return (
    <Box mt={4}>
      <TitleText>لیست تسک‌ها</TitleText>
      <Divider sx={{ my: 2 }} />

      {tasks.length === 0 ? (
        <BodyText>هیچ تسکی وجود ندارد.</BodyText>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} md={6} key={task.id} {...({} as any)}>
              <Card
                sx={{
                  backgroundColor: task.completed ? "#e8f5e9" : "#fffde7",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleCompleted(task)}
                      color="primary"
                    />
                    <Box sx={{ flex: 1 }}>
                      {editingTaskId === task.id ? (
                        <TextField
                          value={editedTodo}
                          onChange={(e) => setEditedTodo(e.target.value)}
                          size="small"
                          fullWidth
                          autoFocus
                        />
                      ) : (
                        <BodyText
                          sx={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {task.todo}
                        </BodyText>
                      )}
                    </Box>
                    
                    {editingTaskId === task.id ? (
                      <IconButton
                        color="success"
                        onClick={() => handleSaveClick(task)}
                      >
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(task)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TaskList;
