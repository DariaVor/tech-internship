import React from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

type PaginationControlProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
};

export default function PaginationControl({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationControlProps): JSX.Element {
  return (
    <Box display="flex" justifyContent="center" mt={4} mb={4}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  );
}
