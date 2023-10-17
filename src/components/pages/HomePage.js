import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useRef } from 'react';
import InputText from '../input/InputText';
import '@fontsource/lato';
import { FaChevronUp } from 'react-icons/fa';
import { FileUploader } from 'react-drag-drop-files';

import DragAndDrop from '../icons/draganddrop.png';
import { CompleteIcon } from '../icons/CompleteIcon';
import api from '../api/api';
import { Category } from '../icons/Category';
import { Textarea } from '@mui/joy';
import Step from '../Step';
import ReactPlayer from 'react-player';
import { enqueueSnackbar } from 'notistack';
import Origami from '../Origami';

function HomePage() {
  const [mostRecent, setMostRecent] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const fetchRef = useRef(null);

  React.useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;
    api.getMostRecentOrigamis((res) => {
      setMostRecent(res);
      api.getCategoriesOrigami((r) => {
        setCategories(r);
        setLoading(false);
      });
    });
  }, []);

  return (
    <Box sx={styles.container}>
      {loading ? (
        <CircularProgress sx={{ color: '#AFAFAF' }} size={100} />
      ) : (
        <h1 style={{ color: '#AFAFAF', fontFamily: 'Lato' }}>Most Recent</h1>
      )}
      <Box
        display={'flex'}
        width={'100%'}
        flexWrap={'wrap'}
        justifyContent={'center'}
      >
        {mostRecent.map((origami, i) => {
          return <Origami origami={origami} index={i} />;
        })}
      </Box>
      {categories.map((cat) => (
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignSelf={'flex-start'}
          mt={'32px'}
        >
          <h2 style={{ color: '#AFAFAF', fontFamily: 'Lato' }}>
            {cat.category}
          </h2>
          <Box
            display={'flex'}
            width={'100%'}
            flexWrap={'wrap'}
            justifyContent={'center'}
          >
            {cat.origamis.map((origami, i) => {
              return <Origami origami={origami} index={i} />;
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 50px',
    boxSizing: 'border-box',
    width: '100vw',
  },
};

export default HomePage;
