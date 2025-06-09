import React from "react";
import { Box, Button } from "@mui/material";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "../api/axiosInstance";
import { Typography } from "@mui/material"; //امه اشه مسیر کی تغییر بم

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

interface TaskValues {
  todo: string;
}

const validationSchema = Yup.object({
  todo: Yup.string().required("Task title is required"),
});

const CustomTextField: React.FC<{ name: string; label: string }> = ({ name, label }) => {
  const [field, meta] = useField(name);

  return (
    <Box sx={{ my: 2 }}>
      <input
        {...field}
        placeholder={label}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: meta.touched && meta.error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      {meta.touched && meta.error && (
        <Typography variant="body2" color="error" mt={1}>
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const initialValues: TaskValues = { todo: "" };

  const handleSubmit = async (values: TaskValues, { resetForm }: any) => {
    try {
      await axios.post("/todos/add", {
        todo: values.todo,
        completed: false,
        userId: 1,
      });

      toast.success("Task added successfully!");
      resetForm();
      onTaskAdded();
    } catch (error) {
      toast.error("Failed to add task.");
      console.error(error);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <CustomTextField name="todo" label="Enter task title" />

        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Form>
    </Formik>
  );
};

export default AddTaskForm;
