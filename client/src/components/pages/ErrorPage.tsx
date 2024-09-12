import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage(): JSX.Element {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleGoHome = (): void => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography
        variant={isMobile ? 'h2' : 'h1'}
        fontWeight="bold"
        color="primary"
        sx={{ fontSize: isMobile ? '6rem' : '10rem', mb: 2 }}
      >
        404
      </Typography>

      <Typography variant={isMobile ? 'h5' : 'h3'} fontWeight="bold" color="textPrimary" mb={2}>
        Страница не найдена
      </Typography>

      <Typography variant="body1" color="textSecondary" mb={4}>
        Неправильно набран адрес или такой страницы не существует
      </Typography>

      <Button variant="contained" color="primary" onClick={handleGoHome}>
        На главную
      </Button>
    </Box>
  );
}
