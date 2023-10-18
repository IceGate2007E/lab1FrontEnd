import { Box, Button, ButtonBase, CircularProgress } from '@mui/material';
import React, { useRef } from 'react';
import api from '../api/api';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import InputText from '../input/InputText';
import { Textarea } from '@mui/joy';
import { CompleteIcon } from '../icons/CompleteIcon';
import { FileUploader } from 'react-drag-drop-files';
import { enqueueSnackbar } from 'notistack';
import OrigamiEvent from '../OrigamiEvent';

function convertImageToBase64(file, callback) {
  let reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

function convertImage(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function EventDetails() {
  const [event, setEvent] = React.useState(null);
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const fetchRef = useRef(null);
  const [sending, setSending] = React.useState(false);

  const [state, setState] = React.useState({
    name: '',
    description: '',
  });

  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;
    let user = JSON.parse(localStorage.getItem('orukami_user'));
    console.log(user);
    api.getEventById(id, user.userId, (res) => {
      setEvent(res);
      setLoading(false);
    });
  }, []);

  const handleEvent = () => {
    setSending(true);
    let user = JSON.parse(localStorage.getItem('orukami_user'));
    if (event.registered)
      api.leaveEvent(event.id, user.userId, () => {
        setSending(false);
        setEvent({ ...event, registered: false });
        enqueueSnackbar('You leave the event.', { variant: 'info' });
      });
    else
      convertImageToBase64(file, (res) => {
        api.postOrigamiEvent(
          { ...state, preview: res.split(',')[1] },
          event.id,
          user.userId,
          () => {
            setSending(false);
            setEvent({ ...event, registered: true });
            setFile(null);
            enqueueSnackbar('Origami uploaded successfully.', {
              variant: 'success',
            });
          }
        );
      });
  };

  const handlePreviewFile = (file) => {
    setFile(file);
  };

  const insideDragAndDrop = file ? (
    <div
      style={{
        width: '100%',
        height: '80px',
        boxShadow: '0px 0px 4px rgba(0,0,1,0.2)',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: '24px',
        boxSizing: 'border-box',
        borderRadius: '24px',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', width: 'inherit' }}>
        <CompleteIcon />
        {file.name}
      </div>
    </div>
  ) : (
    <div
      style={{
        cursor: 'pointer',
        width: '100%',
        height: '80px',
        boxShadow: '0px 0px 4px rgba(0,0,1,0.2)',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: '24px',
        borderRadius: '24px',
        boxSizing: 'border-box',
      }}
    >
      <span>Drag and drop, or click here to upload a file</span>
    </div>
  );

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
            {event.name}
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
                gap: '6px',
                span: { textAlign: 'center' },
              }}
            >
              <img
                style={{
                  maxHeight: '174px',
                  maxWidth: '310px',
                }}
                src={'data:image/png;base64,' + event.preview}
              />
              <span>
                <strong>Thematic:</strong> {event.thematic}
              </span>
              <span>
                <strong>Entries:</strong>{' '}
                {event.entries - event.remainingEntries} / {event.entries}
              </span>
              <span style={{ font: '300 14px Lato', marginTop: '20px' }}>
                {!event.registered ? 'Join the event.' : 'Drop out.'}
              </span>
              <Button
                sx={styles.button}
                onClick={() => handleEvent()}
                disabled={sending}
              >
                {!event.registered ? 'Upload' : 'Leave'}
              </Button>
              {!event.registered && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    gap: '8px',
                  }}
                >
                  <span>Title:</span>
                  <InputText
                    value={state['title']}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                  <span>Description:</span>
                  <Textarea
                    value={state['description']}
                    onChange={(e) =>
                      setState({ ...state, description: e.target.value })
                    }
                    sx={{
                      border: 'none',
                      boxShadow: '0px 0px 4px rgba(0,0,1,0.2)',
                      width: '100%',
                    }}
                    minRows={3}
                  />
                  <span>Image:</span>
                  <FileUploader
                    types={['JPG', 'PNG', 'JPEG']}
                    handleChange={handlePreviewFile}
                    name='file'
                    children={insideDragAndDrop}
                  />
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flex: 5,
              }}
            >
              {event.origamis.map((origami) => (
                <OrigamiEvent
                  eventId={event.id}
                  origami={origami}
                  hasVoted={event.hasVoted}
                  setVote={() => setEvent({ ...event, hasVoted: true })}
                />
              ))}
            </Box>
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
