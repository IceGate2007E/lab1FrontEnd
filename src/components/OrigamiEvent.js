import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/lato';
import { Box, ButtonBase } from '@mui/material';
import api from './api/api';

function OrigamiEvent({ origami, hasVoted, setVote }) {
  const navigate = useNavigate();

  const handleVote = () => {
    api.voteOrigami(origami.id, () => {
      setVote();
    });
  };

  return (
    <div
      style={{
        boxShadow: '0px 0px 2px rgba(0,0,0,0.4)',
        width: '360px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: '24px',
        color: 'grey',
        margin: '16px',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          top: '0px',
          display: 'flex',
          width: '100%',
          position: 'absolute',
          boxSizing: 'border-box',
          margin: '12px',
          padding: '6px',
          borderRadius: '8px',
          background: '#FFFA',
          width: 'fit-content',
          boxShadow: '0px 0px 4px rgba(0,0,0,0.4)',
          alignSelf: 'flex-start',
        }}
      >
        <span style={{ font: '700 20px Lato' }}>{origami.title}</span>
      </Box>
      <Box
        sx={{
          bottom: '0px',
          display: 'flex',
          width: '100%',
          position: 'absolute',
          boxSizing: 'border-box',
          margin: '12px',
          padding: '4px',
          borderRadius: '8px',
          background: '#FFFA',
          width: 'fit-content',
          boxShadow: '0px 0px 4px rgba(0,0,0,0.4)',
          alignSelf: 'flex-start',
        }}
      >
        <span style={{ font: '700 18px Lato' }}>
          by: {origami.author || 'Anonymous'}
        </span>
      </Box>
      <Box
        sx={{
          top: '0px',
          right: '0px',
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          boxSizing: 'border-box',
          padding: '12px',
          gap: '8px',
          span: {
            font: '500 14px Lato',
            padding: '4px',
            borderRadius: '8px',
            background: '#AFAFAF',
            color: 'white',
            width: 'fit-content',
            alignSelf: 'flex-end',
          },
        }}
      >
        <ButtonBase
          sx={{
            padding: '4px',
            font: '500 16px Lato',
            borderRadius: '4px',
            background: '#AFAFAF',
            color: 'white',
            '&:disabled': {
              opacity: 0.4,
            },
          }}
          disabled={hasVoted}
          onClick={() => handleVote()}
        >
          Vote Up
        </ButtonBase>
      </Box>
      <img
        style={{
          maxHeight: '174px',
          maxWidth: '310px',
        }}
        src={'data:image/png;base64,' + origami.preview}
      />
    </div>
  );
}

export default OrigamiEvent;
