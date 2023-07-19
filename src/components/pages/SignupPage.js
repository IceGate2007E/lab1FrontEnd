import React from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import InputText from '../input/InputText';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { enqueueSnackbar } from 'notistack';

function SignupPage() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);

  const handleSignup = () => {
    setLoading(true);
    api.postSignup(
      state,
      (res) => {
        enqueueSnackbar('SignUp Successfully.', { variant: 'success' });
        setLoading(false);
        navigate('/login');
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
        <span style={styles.intro}>Welcome to a new paper world!</span>
        <Box sx={styles.form}>
          <span>Name:</span>
          <InputText
            value={state['name']}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
          <span>Email:</span>
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
          onClick={() => handleSignup()}
          disabled={loading}
        >
          {loading && <CircularProgress sx={styles.loading} />}
          SIGNUP
        </Button>
        <Box>
          <span>Already have an account?</span>
          <Link style={styles.link} to='/login'>
            LogIn
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
    fontSize: 18,
    fontWeight: 700,
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
    fontSize: '18px',
    color: 'grey',
  },
  intro: {
    color: 'grey',
    margin: '12px 0px 32px',
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

export default SignupPage;
