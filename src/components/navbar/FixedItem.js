import { Box } from '@mui/material';
import React from 'react';

function FixedItem({ children }) {
  return (
    <>
      <Box sx={{ position: 'fixed', width: '100%', zIndex: 1 }}>{children}</Box>
      <Box sx={{ visibility: 'hidden' }}>{children}</Box>
    </>
  );
}

export default FixedItem;
