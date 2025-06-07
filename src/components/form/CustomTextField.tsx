import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import { FC } from "react";

type Props = TextFieldProps & {
  name: string;
};

const CustomTextField: FC<Props> = ({ ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      fullWidth
      {...field}
      {...props}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default CustomTextField;
