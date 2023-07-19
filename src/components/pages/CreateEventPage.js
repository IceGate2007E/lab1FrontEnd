import { Box, Button, MenuItem, Select } from '@mui/material';
import React from 'react';
import InputText from '../input/InputText';
import { FaChevronUp } from 'react-icons/fa';
import api from '../api/api';

function CreateEventPage() {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('Other');
  const [difficulty, setDifficulty] = React.useState('All');
  const [type, setType] = React.useState('Common');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeDifficulty = (event) => {
    setDifficulty(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  return (
    <Box sx={styles.container}>
      <h1 style={{ color: 'grey', fontFamily: 'Lato' }}>Create New Event</h1>
      <span style={{ font: '500 16px Lato' }}>Define competition rules!</span>
      <Box
        sx={{
          display: 'flex',
          margin: '32px',
          alignItems: 'center',
          span: { font: '700 18px Lato', color: 'grey' },
          gap: '12px',
        }}
      >
        <span>Title: </span>
        <Box width='320px'>
          <InputText
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></InputText>
        </Box>
        <span>Difficulty: </span>
        <Box sx={styles.select}>
          <Select
            value={difficulty}
            onChange={handleChangeDifficulty}
            IconComponent={FaChevronUp}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root': {
                    background: 'white',
                    padding: '8px',
                    color: '#000',
                    fontFamily: 'Lato',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '100%',
                  },
                  '& .MuiMenuItem-root:hover': {
                    color: 'grey',
                    background: 'white',
                  },
                },
              },
            }}
          >
            {['All', 'Easy', 'Medium', 'Hard'].map((cat, i) => (
              <MenuItem value={cat} key={i}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <span>Category: </span>
        <Box sx={styles.select}>
          <Select
            value={category}
            onChange={handleChange}
            IconComponent={FaChevronUp}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root': {
                    background: 'white',
                    padding: '8px',
                    color: '#000',
                    fontFamily: 'Lato',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '100%',
                  },
                  '& .MuiMenuItem-root:hover': {
                    color: 'grey',
                    background: 'white',
                  },
                },
              },
            }}
          >
            {['Other', 'Animal', 'Flower', 'Vehicle', 'Stars'].map((cat, i) => (
              <MenuItem value={cat} key={i}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <span>Type: </span>
        <Box sx={styles.select}>
          <Select
            value={type}
            onChange={handleChangeType}
            IconComponent={FaChevronUp}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root': {
                    background: 'white',
                    padding: '8px',
                    color: '#000',
                    fontFamily: 'Lato',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '100%',
                  },
                  '& .MuiMenuItem-root:hover': {
                    color: 'grey',
                    background: 'white',
                  },
                },
              },
            }}
          >
            {[
              'Common',
              'Action',
              'Modular',
              'Wet-folding',
              'Pureland',
              'Tessellations',
              'Kirigami',
              'Strip Folding',
            ].map((cat, i) => (
              <MenuItem value={cat} key={i}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button sx={styles.button}>Search</Button>
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
};

export default CreateEventPage;
