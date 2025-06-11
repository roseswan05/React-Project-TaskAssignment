import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

const PrimaryButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      {...props}
      sx={{
        borderRadius: 8,
        padding: '10px 24px',
        fontWeight: 600,
        textTransform: 'none',
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
