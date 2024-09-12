import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import GridViewIcon from '@mui/icons-material/GridView';

type ItemsPerPageControlProps = {
  itemsPerPage: number;
  handleItemsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: number[];
};

export default function ItemsPerPageControl({
  itemsPerPage,
  handleItemsPerPageChange,
  options,
}: ItemsPerPageControlProps): JSX.Element {
  return (
    <TextField
      select
      label="Отображать"
      value={itemsPerPage}
      onChange={handleItemsPerPageChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <GridViewIcon />
            </InputAdornment>
          ),
        },
      }}
      sx={{ minWidth: 50 }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}
