import { Box, Button, ButtonBase, CircularProgress } from '@mui/material';
import React, { useRef } from 'react';
import api from '../api/api';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import InputText from '../input/InputText';
import { enqueueSnackbar } from 'notistack';
import { CompleteIcon } from '../icons/CompleteIcon';

function DetailsPage() {
  const [origami, setOrigami] = React.useState(null);
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const fetchRef = useRef(null);
  const [step, setStep] = React.useState(0);
  const [chat, setChat] = React.useState('');
  const [sending, setSending] = React.useState(false);

  React.useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;
    api.getOrigamis((res) => {
      setOrigami(res[id]);
      setLoading(false);
    });
  }, []);

  const handleComment = () => {
    setSending(true);
    let user = JSON.parse(localStorage.getItem('orukami_user'));
    api.sendComment(chat, user.userId, origami.id, (res) => {
      setOrigami({
        ...origami,
        comments: res,
      });
      setChat('');
      setSending(false);
      enqueueSnackbar('Your comment was saved.', { variant: 'success' });
    });
  };

  return (
    <Box sx={styles.container}>
      {loading && <CircularProgress sx={{ color: '#AFAFAF' }} size={100} />}
      {origami && (
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
            {origami.title} {origami.official && <CompleteIcon size='24' />}
          </Box>
          <Box sx={{ font: '500 18px Lato', alignSelf: 'center' }}>
            by {origami.author || 'Anonymous'}
          </Box>
          <Box
            sx={{
              font: '500 14px Lato',
              alignSelf: 'center',
              marginTop: '20px',
            }}
          >
            {origami.description}
          </Box>
          <Box display={'flex'} mt={'30px'}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 3,
                color: 'black',
                strong: { color: '#AFAFAF', fontWeight: 500 },
                gap: '4px',
                img: {},
              }}
            >
              <img
                style={{ maxHeight: '120px' }}
                src={'data:image/png;base64,' + origami.preview}
              />
              <span>
                <strong>Category:</strong> {origami.category}
              </span>
              <span>
                <strong>Type:</strong> {origami.type}
              </span>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 5,
                position: 'relative',
              }}
            >
              <Box
                style={{
                  padding: '10px 20px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <ButtonBase
                  sx={{
                    position: 'absolute',
                    left: '32px',
                    top: '0px',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    font: '500 16px Lato',
                    background: '#AFAFAF',
                    color: 'white',
                    '&:disabled': {
                      opacity: 0.4,
                    },
                  }}
                  onClick={() => setStep(step - 1)}
                  disabled={step === 0}
                >
                  Prev
                </ButtonBase>
                <ButtonBase
                  sx={{
                    position: 'absolute',
                    right: '32px',
                    top: '0px',
                    padding: '4px',
                    font: '500 16px Lato',
                    borderRadius: '4px',
                    background: '#AFAFAF',
                    color: 'white',
                    '&:disabled': {
                      opacity: 0.4,
                    },
                  }}
                  disabled={step + 1 === origami.steps.length}
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </ButtonBase>
                <span style={{ font: '700 24px Lato' }}>Step: {step + 1}</span>
                <span style={{ color: 'black' }}>{origami.steps[step]}</span>
                <img
                  style={{ maxHeight: '360px' }}
                  src={'data:image/png;base64,' + origami.images[step]}
                />
              </Box>
            </Box>
          </Box>
          {origami.videoURL !== '' && (
            <Box alignSelf={'center'} mt={'30px'}>
              <ReactPlayer url={origami.videoURL} controls={true} />
            </Box>
          )}
          <Box
            alignSelf={'center'}
            mt={'30px'}
            display={'flex'}
            flexDirection={'column'}
            width='60%'
          >
            {(origami.comments || []).map(({ author, text, date }) => (
              <Box sx={{ display: 'flex', gap: '10px', width: '100%' }}>
                {`${author}: ${text}`}
                <span style={{ marginLeft: 'auto' }}>{date}</span>
              </Box>
            ))}
            <Box sx={{ width: '100%', display: 'flex' }}>
              <InputText
                value={chat}
                onChange={(e) => setChat(e.target.value)}
              />
              <Button
                onClick={() => handleComment()}
                disabled={sending}
                sx={styles.button}
              >
                Comment
              </Button>
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
    marginTop: '30px',
    backgroundColor: 'rgb(252,159,4)',
    border: '4px solid #FFFFFF',
    borderRadius: '32px',
    color: 'white',
    fontSize: 18,
    fontWeight: 700,
    padding: '10px 24px',
    width: '200px',
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

export default DetailsPage;
