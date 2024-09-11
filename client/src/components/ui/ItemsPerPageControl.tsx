import React from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type ItemsPerPageControlProps = {
  itemsPerPage: number;
  handleItemsPerPageChange: (e: SelectChangeEvent<number>) => void;
  options: number[];
};

export default function ItemsPerPageControl({
  itemsPerPage,
  handleItemsPerPageChange,
  options,
}: ItemsPerPageControlProps): JSX.Element {
  return (
    <FormControl variant="outlined">
      <InputLabel>На странице</InputLabel>
      <Select value={itemsPerPage} onChange={handleItemsPerPageChange} label="На странице">
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
