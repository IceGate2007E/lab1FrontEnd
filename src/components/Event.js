import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Event({ description, entries, thematic, name, index }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: '320px',
        height: '120px',
        boxShadow: '0px 0px 2px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '24px',
        cursor: 'pointer',
      }}
      onClick={() => navigate('/events/' + index)}
    >
      <span>{name}</span>
      <span>Thematic: {thematic}</span>
      <span>
        Entries: {entries}/{entries}
      </span>
    </Box>
  );
}

export default Event;
