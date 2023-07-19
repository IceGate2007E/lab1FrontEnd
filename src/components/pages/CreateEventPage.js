import { Box, Button, MenuItem, Select } from '@mui/material';
import React from 'react';
import InputText from '../input/InputText';
import { FaChevronUp } from 'react-icons/fa';
import api from '../api/api';
import { Textarea } from '@mui/joy';

function CreateEventPage() {
  const [state, setState] = React.useState({
    name: '',
    description: '',
    entries: '',
    thematic: '',
  });

  return (
    <Box sx={styles.container}>
      <h1 style={{ color: 'grey', fontFamily: 'Lato' }}>Create New Event</h1>
      <span style={{ font: '500 16px Lato' }}>Define competition rules!</span>
      <Box sx={styles.form} marginTop='32px'>
        <span>Title:</span>
        <InputText
          value={state['name']}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
        <span>Thematic:</span>
        <InputText
          value={state['entries']}
          onChange={(e) => setState({ ...state, thematic: e.target.value })}
        />
        <span>Entries:</span>
        <InputText
          value={state['entries']}
          onChange={(e) => setState({ ...state, entries: e.target.value })}
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
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export default CreateEventPage;
