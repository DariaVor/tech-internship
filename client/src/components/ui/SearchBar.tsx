import React, { useCallback, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import debounce from 'lodash.debounce';

type SearchBarProps = {
  handleSearchChange: (searchTerm: string) => void;
};

export default function SearchBar({ handleSearchChange }: SearchBarProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.length >= 3) {
        handleSearchChange(query);
      } else {
        handleSearchChange('');
      }
    }, 500),
    [handleSearchChange],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const clearSearch = (): void => {
    setSearchTerm('');
    handleSearchChange('');
  };

  return (
    <TextField
      label="Поиск по названию"
      value={searchTerm}
      onChange={handleInputChange}
      variant="outlined"
      fullWidth
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {searchTerm && (
                <IconButton onClick={clearSearch}>
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
