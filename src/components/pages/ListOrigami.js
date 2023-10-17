import { Box, CircularProgress } from '@mui/material';
import React, { useRef } from 'react';
import api from '../api/api';
import Origami from '../Origami';

function ListOrigami() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const fetchRef = useRef(null);

  React.useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;
    api.getOrigamis((res) => {
      setData([
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
        ...res,
      ]);
      setLoading(false);
    });
  }, []);

  return (
    <Box sx={styles.container}>
      {loading && <CircularProgress sx={{ margin: '32px' }} size={100} />}
      <Box
        display={'flex'}
        width={'100%'}
        flexWrap={'wrap'}
        justifyContent={'center'}
      >
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
    justifyContent: 'center',
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
