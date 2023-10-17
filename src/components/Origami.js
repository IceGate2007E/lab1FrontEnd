import React from 'react';
import { Link } from 'react-router-dom';
import '@fontsource/lato';
import { Box } from '@mui/material';

function Origami({ origami, index }) {
  return (
    <div
      style={{
        boxShadow: '0px 0px 4px rgba(0,0,0,0.4)',
        width: '320px',
        height: '240px',
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
        }}
      >
        <Link
          to={'/details/' + index}
          style={{ textDecoration: 'none', color: 'grey' }}
        >
          <span style={{ font: '700 20px Lato' }}>Title: {origami.title}</span>
        </Link>
        <span style={{ font: '500 18px Lato' }}>
          Category: {origami.category}
        </span>
        <span style={{ font: '500 18px Lato' }}>Type: {origami.type}</span>
      </Box>
      <img
        style={{ maxHeight: '200px', maxWidth: '300px' }}
        src={'data:image/png;base64,' + origami.preview}
      />
    </div>
  );
}

export default Origami;
