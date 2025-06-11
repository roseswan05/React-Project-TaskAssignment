import { Typography, TypographyProps } from "@mui/material";

const ErrorText = (props: TypographyProps) => (
  <Typography variant="caption" color="error" {...props} />
);

export default ErrorText;
