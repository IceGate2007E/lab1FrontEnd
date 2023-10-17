import { Box } from '@mui/material';
import React from 'react';
import api from '../api/api';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

function DetailsPage() {
  const [origami, setOrigami] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    api.getOrigamis((res) => setOrigami(res[id]));
  });

  return (
    origami && (
      <Box>
        <div
          style={{
            boxShadow: '0px 0px 4px rgba(0,0,0,0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <span>Title: {origami.title}</span>
          <span>Category: {origami.category}</span>
          <span>Type: {origami.type}</span>
          <img
            style={{ maxHeight: '120px' }}
            src={'data:image/png;base64,' + origami.preview}
          />
          {origami &&
            origami.steps?.map((desc, i) => {
              return (
                <Box
                  style={{
                    boxShadow: '0px 0px 4px rgba(0,0,0,0.4)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <span>Step: {i}</span>
                  <span>{desc}</span>
                  <img
                    style={{ maxHeight: '120px' }}
                    src={'data:image/png;base64,' + origami.images[i]}
                  />
                </Box>
              );
            })}
          <ReactPlayer url={origami.videoURL} />
        </div>
      </Box>
    )
  );
}

export default DetailsPage;
