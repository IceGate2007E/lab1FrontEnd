import { Box, Button, ButtonBase, CircularProgress } from '@mui/material';
import React, { useRef } from 'react';
import api from '../api/api';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

function EventDetails() {
  const [event, setEvent] = React.useState(null);
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const fetchRef = useRef(null);

  React.useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;
    api.getEvents((res) => {
      setEvent(res[id]);
      setLoading(false);
    });
  }, []);

  return (
    <Box sx={styles.container}>
      {loading && <CircularProgress sx={{ color: '#AFAFAF' }} size={100} />}
      {event && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',
            color: '#AFAFAF',
          }}
        >
          <Box sx={{ font: '700 32px Lato', alignSelf: 'center' }}>
            {event.title}
          </Box>
          <Box sx={{ font: '500 18px Lato', alignSelf: 'center' }}>
            by {event.author || 'Anonymous'}
          </Box>
          <Box
            sx={{
              font: '500 14px Lato',
              alignSelf: 'center',
              marginTop: '20px',
            }}
          >
            {event.description}
          </Box>
          <Box display={'flex'} mt={'30px'}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 2,
                color: 'black',
                strong: { color: '#AFAFAF', fontWeight: 500 },
                gap: '4px',
                img: {},
              }}
            >
              <span>
                <strong>Thematic:</strong> {event.thematic}
              </span>
              <span>
                <strong>Entries:</strong> {event.entries} / {event.entries}
              </span>
              <Button sx={styles.button}>JOIN</Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flex: 5,
              }}
            ></Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 80px',
    boxSizing: 'border-box',
    width: '100vw',
  },
  button: {
    backgroundColor: 'rgb(252,159,4)',
    border: '4px solid #FFFFFF',
    borderRadius: '48px',
    color: 'white',
    font: '700 18px Lato',
    margin: '24px',
    padding: '12px 32px',
    width: '160px',
    textTransform: 'none',
    position: 'relative',
    '&:hover': {
      backgroundColor: 'rgb(251,98,5)',
      border: '4px solid #FFFFFF',
      color: 'white',
    },
    '&:disabled': {
      color: 'grey',
    },
  },
};

export default EventDetails;
