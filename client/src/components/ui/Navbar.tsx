import { AppBar, Box, Link, Toolbar } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import React from 'react';

export default function Navbar(): JSX.Element {
  const links = [{ to: '/advertisements', name: 'Объявления' }];

  return (
    <Box sx={{ flexGrow: 1, typography: 'body1' }}>
      <AppBar position="static">
        <Toolbar>
          {links.map((link) => (
            <Link
              component={NavLink}
              key={link.name}
              to={link.to}
              sx={{ color: 'white', mr: 2, textDecoration: 'none' }}
            >
              {link.name}
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
