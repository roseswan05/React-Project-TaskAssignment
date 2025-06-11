import { Typography, TypographyProps } from "@mui/material";

const TitleText = (props: TypographyProps) => (
  <Typography variant="h5" fontWeight={700} {...props} />
);

export default TitleText;
