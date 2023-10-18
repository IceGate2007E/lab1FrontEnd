import { Box, Button, MenuItem, Select } from '@mui/material';
import React from 'react';
import InputText from '../input/InputText';
import { FaChevronUp } from 'react-icons/fa';
import api from '../api/api';
import { Textarea } from '@mui/joy';
import { enqueueSnackbar } from 'notistack';
import { RedoOutlined } from '@mui/icons-material';

function CreateEventPage() {
  const today = new Date();
  const tenDaysLater = new Date(today);
  tenDaysLater.setDate(today.getDate() + 9);

  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    name: '',
    description: '',
    entries: 50,
    thematic: '',
    endDate: tenDaysLater.toISOString().split('T')[0],
  });

  const validateEvent = () => {
    if (state.name === '') return "Title can't be empty.";
    if (state.description === '') return "Description can't be empty.";
    if (state.thematic === '') return "Thematic can't be empty.";
    return '';
  };

  const handleUpload = () => {
    setLoading(true);
    let warning = validateEvent();
    if (warning) enqueueSnackbar(warning, { variant: 'error' });
    else {
      let user = JSON.parse(localStorage.getItem('orukami_user'));
      api.postCreateEvent({ ...state, userId: user.userId }, () => {
        enqueueSnackbar('Event created successfully.', { variant: 'success' });
        setLoading(false);
        setState({
          name: '',
          description: '',
          entries: 50,
          thematic: '',
          endDate: tenDaysLater.toISOString().split('T')[0],
        });
      });
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.form} marginTop='32px'>
        <span>Title:</span>
        <InputText
          value={state['name']}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
        <span>Thematic:</span>
        <InputText
          value={state['thematic']}
          onChange={(e) => setState({ ...state, thematic: e.target.value })}
        />
        <span>Entries:</span>
        <InputText
          type='number'
          value={state['entries']}
          onChange={(e) =>
            setState({ ...state, entries: Math.max(10, e.target.value) })
          }
        />
        <span>Finish Date:</span>
        <InputText
          type='date'
          value={state.endDate}
          onChange={(e) => setState({ ...state, endDate: e.target.value })}
        />
        <span>Description:</span>
        <Textarea
          value={state['description']}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          sx={{
            border: 'none',
            boxShadow: '0px 0px 4px rgba(0,0,1,0.2)',
            width: '100%',
          }}
          minRows={3}
        />
      </Box>
      <Button
        sx={styles.button}
        onClick={() => handleUpload()}
        disabled={loading}
      >
        Create Event
      </Button>
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
  select: {
    width: '160px',

    '.MuiOutlinedInput-root': {
      height: '50px',
      background: 'white',
      borderRadius: '12px',
      color: 'grey',
      fontFamily: 'Lato',
      boxShadow: '0px 0px 4px rgba(0,0,1,0.2)',
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '100%',
      padding: '14px 10px',
      margin: '0',
      display: 'flex',
      alignItems: 'baseline',
    },
    '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '.MuiOutlinedInput-input': {
      padding: '0',
    },
    '.MuiInputBase-input': {
      marginRight: '-4px',
    },
    '.MuiSelect-icon': {
      color: 'grey',
    },
  },
  button: {
    backgroundColor: 'rgb(252,159,4)',
    border: '4px solid #FFFFFF',
    borderRadius: '32px',
    color: 'white',
    fontSize: 18,
    fontWeight: 700,
    margin: '24px',
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
  form: {
    display: 'grid',
    gridTemplateColumns: '120px 320px',
    gap: '12px 8px',
    span: {
      color: 'grey',
      font: '700 18px Lato',
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

export default CreateEventPage;
