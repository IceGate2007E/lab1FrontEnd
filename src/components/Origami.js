import React from 'react';
import { Link } from 'react-router-dom';
import '@fontsource/lato';

function Origami({ origami, index }) {
  return (
    <div
      style={{
        boxShadow: '0px 0px 4px rgba(0,0,0,0.4)',
        width: '400px',
        height: '240px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '24px',
        color: 'grey',
        margin: '16px',
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
      <img
        style={{ maxHeight: '120px' }}
        src={'data:image/png;base64,' + origami.preview}
      />
    </div>
  );
}

export default Origami;
