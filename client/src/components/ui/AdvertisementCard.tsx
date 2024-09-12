import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  useMediaQuery,
  Button,
  CardActions,
} from '@mui/material';
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import type { AdvertisementType } from '../../types/advertisementTypes';
import { useDeleteAdvertisementMutation } from '../../features/api/accountApi';
import DeleteModal from './DeleteModal';

function formatPrice(price: number | undefined): string {
  if (price === undefined) {
    return 'Цена не указана';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

type AdvertisementCardProps = {
  advertisement: AdvertisementType;
  onCardClick: (id: string) => void;
};

export default function AdvertisementCard({
  advertisement,
  onCardClick,
}: AdvertisementCardProps): JSX.Element {
  const imageUrl = advertisement.imageUrl || '/logo.svg';
  const isMobile = useMediaQuery('(max-width:345px)');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAdvertisement] = useDeleteAdvertisementMutation();

  const handleDeleteClick = (): void => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = (): void => {
    void (async () => {
      try {
        await deleteAdvertisement({ id: advertisement.id });
        setIsModalOpen(false);
      } catch (error) {
        console.error('Failed to delete advertisement:', error);
      }
    })();
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
  };

  return (
    <Card
      sx={{
        width: isMobile ? 200 : 300,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea onClick={() => onCardClick(advertisement.id)} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="300"
          image={imageUrl}
          alt={advertisement.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {advertisement.name}
          </Typography>

          <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} mb={2}>
            <Box display="flex" alignItems="center">
              <VisibilityIcon sx={{ color: 'gray', fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {advertisement.views}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <ThumbUpAltIcon sx={{ color: 'gray', fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {advertisement.likes}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {formatPrice(advertisement.price)} ₽
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button variant="contained" color="error" onClick={handleDeleteClick}>
          Удалить
        </Button>
        <DeleteModal
          open={isModalOpen}
          onClose={handleModalClose}
          onConfirmDelete={handleDeleteConfirm}
        />
      </CardActions>
    </Card>
  );
}
