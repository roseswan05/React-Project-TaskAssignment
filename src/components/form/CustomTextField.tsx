import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";
import ErrorText from "../typography/ErrorText";

interface Props {
  name: string;
  label: string;
  type?: string;
}

const CustomTextField = ({ name, label, type = "text" }: Props) => {
  const [field, meta] = useField(name);
  const isError = meta.touched && meta.error;

  return (
    <>
      <TextField
        {...field}
        fullWidth
        label={label}
        type={type}
        error={Boolean(isError)}
        variant="outlined"
      />
      {isError && <ErrorText>{meta.error}</ErrorText>}
    </>
  );
};

export default CustomTextField;
