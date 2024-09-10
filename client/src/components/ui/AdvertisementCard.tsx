import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import type { AdvertisementType } from '../../types/advertisementTypes';

type AdvertisementCardProps = {
  advertisement: AdvertisementType;
};

export default function AdvertisementCard({ advertisement }: AdvertisementCardProps): JSX.Element {
  const imageUrl = advertisement.imageUrl || 'https://picsum.photos/200/300';
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} alt="Фото объявления" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {advertisement.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {advertisement.price}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {advertisement.views}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {advertisement.likes}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
