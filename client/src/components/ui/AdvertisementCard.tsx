import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
        width: isMobile ? 200 : 250,

        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea onClick={() => onCardClick(advertisement.id)} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="250"
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
            padding: '12px',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
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

          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {advertisement.name}
          </Typography>

          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {formatPrice(advertisement.price)} ₽
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions
        sx={{
          justifyContent: 'flex-end',
          padding: 0,
        }}
      >
        <IconButton
          onClick={handleDeleteClick}
          sx={{
            color: 'red',
            '&:hover': {
              backgroundColor: 'rgba(255,0,0,0.1)',
            },
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>

        <DeleteModal
          open={isModalOpen}
          onClose={handleModalClose}
          onConfirmDelete={handleDeleteConfirm}
        />
      </CardActions>
    </Card>
  );
}
