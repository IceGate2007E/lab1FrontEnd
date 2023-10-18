import { Box, Button, InputAdornment, MenuItem, Select } from '@mui/material';
import React from 'react';
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

function UploadOfficialPage() {
  const [steps, setSteps] = React.useState([{ desc: '', image: null }]);
  const [videoURL, setVideoURL] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('Other');
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handlePreviewFile = (file) => {
    setFile(file);
  };
  const [file, setFile] = React.useState(null);

  const [difficulty, setDifficulty] = React.useState('All');
  const [type, setType] = React.useState('Common');

  const [time, setTime] = React.useState(5);
  const [loading, setLoading] = React.useState(false);

  const reloadState = () => {
    setSteps([{ desc: '', image: null }]);
    setVideoURL('');
    setDescription('');
    setTitle('');
    setCategory('Other');
    setFile(null);
    setDifficulty('All');
    setType('Common');
    setTime(5);
  };

  const handleChangeDifficulty = (event) => {
    setDifficulty(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const validateOrigami = () => {
    if (title === '') return "Title can't be empty.";
    if (difficulty === 'All') return 'Specify a difficulty.';
    if (!file) return "Preview can't be empty.";
    if (description === '') return "Description can't be empty.";
    for (let i = 0; i < steps.length; i++) {
      if (!steps[i].desc || ('' && !steps[i].image))
        return `Steps fields can\'t be empty.`;
    }
    return '';
  };

  const handleUpload = () => {
    setLoading(true);
    let warning = validateOrigami();
    if (warning) {
      enqueueSnackbar(warning, { variant: 'error' });
      setLoading(false);
    } else {
      let images = [];
      let steps_desc = [];
      let user = JSON.parse(localStorage.getItem('orukami_user'));

      Promise.all(
        steps.map((s) =>
          convertImage(s.image).then((res) => {
            images.push(res.split(',')[1]);
            steps_desc.push(s.desc);
          })
        )
      ).then(() => {
        convertImageToBase64(file, (res) => {
          api.postOrigami(
            {
              category: category,
              title: title,
              description: description,
              preview: res.split(',')[1],
              images: images,
              steps: steps_desc,
              videoURL: videoURL,
              difficulty: difficulty,
              type: type,
              estimatedTime: time,
              userId: user.userId,
            },
            () => {
              enqueueSnackbar('Origami created successfully.', {
                variant: 'success',
              });
              setLoading(false);
              reloadState();
            },
            ({ message }) => {
              enqueueSnackbar(message, { variant: 'error' });
              setLoading(false);
            }
          );
        });
      });
    }
  };

  const insideDragAndDrop = file ? (
    <div
      style={{
        cursor: 'pointer',
        width: '320px',
        height: '60px',
        boxShadow: '0px 0px 4px rgba(0,0,1,0.2)',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: '24px',
        boxSizing: 'border-box',
        borderRadius: '24px',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CompleteIcon />
        {file.name}
      </div>
    </div>
  ) : (
    <div
      style={{
        cursor: 'pointer',
        width: '320px',
        height: '60px',
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

  const handleStepChange = (e, i, cond) => {
    let temp = [...steps];
    if (cond) temp[i] = { desc: e.target.value, image: temp[i].image };
    else temp[i] = { desc: temp[i].desc, image: e };
    setSteps(temp);
  };

  const removeStep = () => {
    let temp = [...steps];
    let out = [];
    if (temp.length > 1) {
      for (let i = 0; i < temp.length - 1; i++) {
        out.push(temp[i]);
      }
      setSteps(out);
    }
  };

  return (
    <Box sx={styles.container}>
      {
        //<h1 style={{ color: 'grey', fontFamily: 'Lato' }}>
        //  Upload Origami Official
        //</h1>
        //<span style={{ font: '500 16px Lato' }}>Upload your new creations!</span>
      }
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
            {['Easy', 'Medium', 'Hard'].map((cat, i) => (
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
        <span>Time (min): </span>
        <Box width='90px'>
          <InputText
            type='number'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          ></InputText>
        </Box>
      </Box>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span style={{ font: '700 18px Lato', color: 'grey' }}>Preview: </span>
        <FileUploader
          types={['JPG', 'PNG', 'JPEG']}
          handleChange={handlePreviewFile}
          name='file'
          children={insideDragAndDrop}
        />
      </div>
      <Box sx={{ display: 'flex', gap: '12px', margin: '32px' }}>
        <span style={{ font: '700 18px Lato', color: 'grey' }}>
          Description:
        </span>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            border: 'none',
            boxShadow: '0px 0px 4px rgba(0,0,1,0.2)',
            width: '420px',
          }}
          minRows={2}
        />
      </Box>
      {steps.map((st, i) => {
        return <Step step={st} index={i} onChange={handleStepChange} />;
      })}
      <Box display={'flex'} gap='32px'>
        <Button
          sx={styles.button}
          onClick={() => setSteps([...steps, { desc: '', image: null }])}
        >
          Add Step
        </Button>
        <Button sx={styles.button} onClick={() => removeStep()}>
          Remove Step
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          span: { font: '700 18px Lato', color: 'grey' },
          gap: '12px',
        }}
      >
        <span>VideoURL: </span>
        <Box width='320px'>
          <InputText
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          ></InputText>
        </Box>
        <span>(optional)</span>
      </Box>
      <Button
        sx={styles.button}
        onClick={() => handleUpload()}
        disabled={loading}
      >
        Upload
      </Button>
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

export default UploadOfficialPage;
