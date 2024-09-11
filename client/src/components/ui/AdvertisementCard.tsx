import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import type { AdvertisementType } from '../../types/advertisementTypes';

function formatPrice(price: number | undefined): string {
  if (price === undefined) {
    return 'Цена не указана';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

type AdvertisementCardProps = {
  advertisement: AdvertisementType;
};

export default function AdvertisementCard({ advertisement }: AdvertisementCardProps): JSX.Element {
  const imageUrl = advertisement.imageUrl || '/logo.svg';

  const isMobile = useMediaQuery('(max-width:345px)');

  return (
    <Card
      sx={{
        width: isMobile ? 200 : 300,
        height: 450,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="300"
          image={imageUrl}
          alt="Объявление"
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
    </Card>
  );
}
