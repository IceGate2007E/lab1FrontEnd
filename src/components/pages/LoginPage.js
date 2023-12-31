import React from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import InputText from '../input/InputText';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { enqueueSnackbar } from 'notistack';
import '@fontsource/lato';

function LoginPage() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({ email: '', password: '' });
  const [loading, setLoading] = React.useState(false);

  const handleLogin = () => {
    setLoading(true);
    api.postAuth(
      state,
      (data) => {
        enqueueSnackbar('Login Successfully.', { variant: 'success' });
        setLoading(false);
        localStorage.setItem('orukami_user', JSON.stringify(data));
        navigate('/home');
      },
      ({ message }) => {
        enqueueSnackbar(message, { variant: 'error' });
        setLoading(false);
      }
    );
  };

  const user = JSON.parse(localStorage.getItem('orukami_user'));
  if (user) {
    return <Navigate to='/home' />;
  }

  return (
    <Box sx={styles.container}>
      <SideBar width='25%' />
      <Box sx={styles.main}>
        <img src='/src/logo.png' alt='ORUKAMI' width='400px' />
        <Box sx={styles.form}>
          <span>Email Adress:</span>
          <InputText
            value={state['email']}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <span>Password:</span>
          <InputText
            type='password'
            value={state['password']}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
        </Box>
        <Button
          sx={styles.button}
          onClick={() => handleLogin()}
          disabled={loading}
        >
          {loading && <CircularProgress sx={styles.loading} />}
          LOGIN
        </Button>
        <Box>
          <span>Don't have an account?</span>
          <Link style={styles.link} to='/signup'>
            SignUp
          </Link>
        </Box>
      </Box>
      <SideBar width='25%' />
    </Box>
  );
}

function SideBar({ width }) {
  return (
    <img
      style={styles.sideBar}
      width={width}
      alt='background'
      src='/src/orange.png'
    />
  );
}

const styles = {
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
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    font: '500 18px Lato',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '120px 320px',
    gap: '12px 8px',
    span: {
      color: 'grey',
      fontSize: '18px',
      textAlign: 'right',
      alignSelf: 'center',
    },
  },
  input: {
    display: 'flex',
    alignItems: 'center',
    margin: '8px',
    width: '480px',
    textAlign: 'right',
    font: '400 18px Lato',
    color: 'grey',
  },
  link: {
    color: 'grey',
    fontWeight: '500',
    margin: '0px 8px',
    textDecoration: 'none',
  },
  loading: {
    color: 'grey',
    right: '-48px',
    position: 'absolute',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '96px',
  },
  sideBar: {
    objectFit: 'cover',
    height: '100%',
  },
};

export default LoginPage;
