import { Typography } from "@mui/material";

interface SubtitleTextProps {
  children: React.ReactNode;
}

const SubtitleText: React.FC<SubtitleTextProps> = ({ children }) => {
  return (
    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
      {children}
    </Typography>
  );
};

export default SubtitleText;
