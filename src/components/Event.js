import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/api';
import { enqueueSnackbar } from 'notistack';

function Event({
  description,
  entries,
  thematic,
  name,
  index,
  id,
  preview,
  remainingEntries,
  admin,
  status,
}) {
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);
  const handleFinish = () => {
    api.finishEvent(id, () => {
      enqueueSnackbar('Event finished successfully.', { variant: 'success' });
    });
  };
  return (
    <Box
      sx={{
        width: '320px',
        height: 'auto',
        boxShadow: '0px 0px 2px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '24px',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => navigate('/events/' + id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover &&
        admin &&
        status !==
          'Finished'(
            <Box
              sx={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'white',
                color: 'red',
                cursor: 'pointer',
              }}
              onClick={() => handleFinish()}
            >
              Finish
            </Box>
          )}
      <img
        style={{
          maxHeight: '174px',
          maxWidth: '310px',
        }}
        src={'data:image/png;base64,' + preview}
      />
      <span>{name}</span>
      <span>Thematic: {thematic}</span>
      <span>
        Entries: {entries - remainingEntries}/{entries}
      </span>
      <span>Status: {status}</span>
    </Box>
  );
}

export default Event;
