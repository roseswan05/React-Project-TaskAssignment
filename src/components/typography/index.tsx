import { Typography, TypographyProps } from "@mui/material";

export const TitleLarge = ({ children, ...props }: TypographyProps) => (
  <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }} {...props}>
    {children}
  </Typography>
);

export const TitleMedium = ({ children, ...props }: TypographyProps) => (
  <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }} {...props}>
    {children}
  </Typography>
);

export const BodyText = ({ children, ...props }: TypographyProps) => (
  <Typography variant="body1" color="text.secondary" {...props}>
    {children}
  </Typography>
);
