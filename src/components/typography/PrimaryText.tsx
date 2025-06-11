import { Typography, TypographyProps } from "@mui/material";

const PrimaryText = (props: TypographyProps) => (
  <Typography variant="body1" fontWeight={500} {...props} />
);

export default PrimaryText;
