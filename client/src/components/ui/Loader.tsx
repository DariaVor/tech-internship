import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function Loader(): JSX.Element {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
}
