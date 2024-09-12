import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetAdvertisementByIdQuery } from '../../features/api/accountApi';
import Loader from '../ui/Loader';
import AddAdvertisements from '../ui/AddAdvertisements';

export default function AdvertisementDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { data: advertisement, isLoading } = useGetAdvertisementByIdQuery(id || '');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (!advertisement) {
    return <Typography >Объявление не найдено</Typography>;
  }

  const handleEditClick = (): void => {
    setIsEditModalOpen(true);
  };

  const handleModalClose = (): void => {
    setIsEditModalOpen(false);
  };

  const imageUrl = advertisement.imageUrl || '/logo.svg';

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {advertisement.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Описание: {advertisement.description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Цена: {advertisement.price} ₽
      </Typography>
      <Box my={2}>
        <img src={imageUrl} alt={advertisement.name} style={{ width: '100%', maxWidth: '500px' }} />
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Button variant="contained" color="success" sx={{ ml: 2 }} onClick={handleEditClick}>
          Редактировать
        </Button>
      </Box>

      {isEditModalOpen && (
        <AddAdvertisements advertisement={advertisement} onClose={handleModalClose} />
      )}
    </Box>
  );
}
