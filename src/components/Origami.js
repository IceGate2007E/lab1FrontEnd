import React from 'react';
import { Link } from 'react-router-dom';
import '@fontsource/lato';
import { Box } from '@mui/material';

function Origami({ origami, index }) {
  return (
    <div
      style={{
        boxShadow: '0px 0px 4px rgba(0,0,0,0.4)',
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
          padding: '12px',
        }}
      >
        <Link
          to={'/details/' + index}
          style={{ textDecoration: 'none', color: 'grey' }}
        >
          <span style={{ font: '700 20px Lato' }}>{origami.title}</span>
        </Link>
      </Box>
      <Box
        sx={{
          bottom: '0px',
          display: 'flex',
          width: '100%',
          position: 'absolute',
          boxSizing: 'border-box',
          padding: '12px',
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
        <span>{origami.category}</span>
        <span>{origami.type}</span>
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

export default Origami;
