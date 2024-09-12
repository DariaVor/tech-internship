import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';

type SortControlProps = {
  sortOption: string;
  handleSortChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: Array<{ value: string; label: string }>;
};

export default function SortControl({
  sortOption,
  handleSortChange,
  options,
}: SortControlProps): JSX.Element {
  return (
    <TextField
      select
      label="Сортировать"
      value={sortOption}
      onChange={handleSortChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SortIcon />
            </InputAdornment>
          ),
        },
      }}
      sx={{ minWidth: 300 }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
