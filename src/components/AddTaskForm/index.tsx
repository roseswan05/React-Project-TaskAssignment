import { Box, Paper, Stack } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axios";
import { toastError, toastSuccess } from "../../utils/toastUtils";
import CustomTextField from "../form/CustomTextField";
import PrimaryButton from "../button/PrimaryButton";
import TitleText from "../typography/TitleText";
import { motion } from "framer-motion";

const AddTaskForm = ({ onTaskAdded }: { onTaskAdded: (task: any) => void }) => {
  const initialValues = {
    todo: "",
    userId: "",
  };

  const validationSchema = Yup.object({
    todo: Yup.string().required("عنوان تسک الزامی است"),
    userId: Yup.number()
      .typeError("آیدی باید عدد باشد")
      .required("آیدی کاربر الزامی است"),
  });

  const handleSubmit = async (values: typeof initialValues, actions: any) => {
    try {
      const res = await axiosInstance.post("/todos/add", {
        todo: values.todo,
        userId: values.userId,
        completed: false,
      });
      toastSuccess("تسک جدید با موفقیت اضافه شد");
      onTaskAdded(res.data);
      actions.resetForm();
    } catch (err) {
      toastError("خطا در افزودن تسک");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box mb={3}>
          <TitleText>افزودن تسک جدید</TitleText>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Stack spacing={3}>
                <CustomTextField name="todo" label="عنوان تسک" />
                <CustomTextField name="userId" label="آیدی کاربر" />
                <Box textAlign="left">
                  <PrimaryButton type="submit">افزودن</PrimaryButton>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </motion.div>
  );
};

export default AddTaskForm;
