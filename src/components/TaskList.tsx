import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import { toastSuccess, toastError } from "../utils/toastUtils";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Checkbox,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";


type Task = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

interface TaskListProps {
  refreshFlag: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ refreshFlag }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [search, setSearch] = useState("");

  const fetchTasks = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get("/todos", {
        params: {
          limit: 10,
          skip: (pageNumber - 1) * 10,
        },
      });
      setTasks(res.data.todos);
      setTotal(res.data.total);
    } catch (err) {
      toastError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(page);
  }, [page, refreshFlag]);

  const handlePageChange = (_: any, value: number) => {
    setPage(value);
  };

  const toggleCompleted = async (taskId: number, current: boolean) => {
    try {
      await axios.put(`/todos/${taskId}`, { completed: !current });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, completed: !current } : task
        )
      );
      toastSuccess("Task status updated!");
    } catch (error) {
      toastError("Failed to update task");
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await axios.delete(`/todos/${taskId}`);
      toastSuccess("Task deleted!");
      fetchTasks(page); 
    } catch {
      toastError("Failed to delete task");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.todo);
  };

  const handleSaveEdit = async (taskId: number) => {
    try {
      await axios.put(`/todos/${taskId}`, { todo: editText });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, todo: editText } : task
        )
      );
      setEditingId(null);
      setEditText("");
      toastSuccess("Task updated!");
    } catch {
      toastError("Failed to update task");
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (statusFilter === "completed") return task.completed;
      if (statusFilter === "incomplete") return !task.completed;
      return true;
    })
    .filter((task) => task.todo.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box>
      <Box mb={2} display="flex" gap={2}>
        <TextField
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="incomplete">Incomplete</MenuItem>
        </Select>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {filteredTasks.map((task) => (
            <ListItem key={task.id}>
              <Checkbox
                checked={task.completed}
                onChange={() => toggleCompleted(task.id, task.completed)}
              />
              {editingId === task.id ? (
                <TextField
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                />
              ) : (
                <ListItemText
                  primary={task.todo}
                  secondary={`User ID: ${task.userId}`}
                  sx={{ flex: 1 }}
                />
              )}
              {editingId === task.id ? (
                <IconButton onClick={() => handleSaveEdit(task.id)} color="primary">
                  <SaveIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleEdit(task)} color="primary">
                  <EditIcon />
                </IconButton>
              )}
              <IconButton onClick={() => handleDelete(task.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <Pagination
        count={Math.ceil(total / 10)}
        page={page}
        onChange={handlePageChange}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default TaskList;
