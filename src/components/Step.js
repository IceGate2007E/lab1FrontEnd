import { Textarea } from '@mui/joy';
import { Box } from '@mui/material';
import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { CompleteIcon } from './icons/CompleteIcon';

function Step({ step, index, onChange }) {
  const insideDragAndDrop = step.image ? (
    <div
      style={{
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
        {step.image.name}
      </div>
    </div>
  ) : (
    <div
      style={{
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

  return (
    <Box sx={{ display: 'flex', gap: '12px', margin: '16px' }}>
      <span style={{ font: '700 18px Lato', color: 'grey' }}>
        Step {index + 1}:
      </span>
      <Textarea
        value={step.desc}
        onChange={(e) => onChange(e, index, true)}
        sx={{
          border: 'none',
          boxShadow: '0px 0px 4px rgba(0,0,1,0.2)',
          width: '420px',
        }}
        minRows={2}
      />
      <span
        style={{ font: '700 18px Lato', color: 'grey', marginLeft: '32px' }}
      >
        Preview:{' '}
      </span>
      <FileUploader
        types={['JPG', 'PNG', 'JPEG']}
        handleChange={(e) => onChange(e, index, false)}
        name='file'
        children={insideDragAndDrop}
      />
    </Box>
  );
}

export default Step;
