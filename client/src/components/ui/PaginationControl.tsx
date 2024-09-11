import React from 'react';
import { Box, Button, Typography } from '@mui/material';

type PaginationControlProps = {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

export default function PaginationControl({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}: PaginationControlProps): JSX.Element {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Назад
      </Button>
      <Typography variant="body1" sx={{ mx: 2 }}>
        {currentPage} / {totalPages}
      </Typography>
      <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Далее
      </Button>
    </Box>
  );
}
