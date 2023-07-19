import React from 'react';
import { TextField } from '@mui/material';

function InputText({ onChange, type = 'text', value }) {
  return (
    <TextField
      sx={styles.inputField}
      onChange={onChange}
      fullWidth
      value={value}
      type={type}
    />
  );
}

const styles = {
  inputField: {
    borderRadius: '16px',
    boxShadow: '0px 0px 4px rgba(0,0,1,0.2)',
    '& fieldset': {
      borderRadius: '40px',
      border: 'none',
    },
    input: {
      fontSize: 18,
      padding: '12px 16px',
      '&::placeholder': { opacity: 1 },
    },
  },
};

export default InputText;
