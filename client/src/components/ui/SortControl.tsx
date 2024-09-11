import React from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type SortControlProps = {
  sortOption: string;
  handleSortChange: (e: SelectChangeEvent<string>) => void;
  options: Array<{ value: string; label: string }>;
};

export default function SortControl({
  sortOption,
  handleSortChange,
  options,
}: SortControlProps): JSX.Element {
  return (
    <FormControl variant="outlined">
      <InputLabel>Сортировка</InputLabel>
      <Select value={sortOption} onChange={handleSortChange} label="Сортировка">
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
