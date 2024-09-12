import React, { useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import debounce from 'lodash.debounce';
import SearchIcon from '@mui/icons-material/Search';

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
      variant="outlined"
      placeholder="Поиск объявлений"
      value={searchTerm}
      onChange={handleInputChange}
      sx={{ minWidth: 300 }}
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
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
