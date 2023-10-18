import { Box, Button, CircularProgress, MenuItem, Select } from '@mui/material';
import React, { useRef } from 'react';
import InputText from '../input/InputText';
import { FaChevronUp } from 'react-icons/fa';
import api from '../api/api';
import Origami from '../Origami';

function ListOrigami() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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

  const handleFilter = () => {
    setLoading(true);
    let body = {
      title: title,
      difficulty: difficulty === 'All' ? '' : difficulty,
      category: category === 'All' ? '' : category,
      type: type === 'All' ? '' : type,
    };
    api.filterOrigami(body, (res) => {
      setData(res);
      setLoading(false);
    });
  };

  return (
    <Box sx={styles.container}>
      <Box
        display={'flex'}
        width={'100%'}
        flexWrap={'wrap'}
        justifyContent={'center'}
      >
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
              {['All', 'Other', 'Animal', 'Flower', 'Vehicle', 'Stars'].map(
                (cat, i) => (
                  <MenuItem value={cat} key={i}>
                    {cat}
                  </MenuItem>
                )
              )}
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
                'All',
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
          <Button
            sx={styles.button}
            onClick={() => handleFilter()}
            disabled={loading}
          >
            Search
          </Button>
        </Box>
        {loading && <CircularProgress sx={{ color: '#AFAFAF' }} size={100} />}
        {data.map((origami, i) => {
          return <Origami origami={origami} index={i} />;
        })}
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
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
};

export default ListOrigami;
