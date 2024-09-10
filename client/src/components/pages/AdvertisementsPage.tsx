import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useGetAdvertisementsQuery } from '../../features/api/accountApi';
import type { AdvertisementType } from '../../types/advertisementTypes';
import AdvertisementCard from '../ui/AdvertisementCard';

export default function AdvertisementsPage(): JSX.Element {
  const { data: allAdvertisements } = useGetAdvertisementsQuery();

  const [advertisements, setAdvertisements] = useState<AdvertisementType[]>([]);

  useEffect(() => {
    if (allAdvertisements) {
      setAdvertisements(allAdvertisements);
    }
  }, [allAdvertisements]);

  return (
    <Box>
      <Box display="grid">
        {advertisements?.map((advertisement) => (
          <Box key={advertisement.id}>
            <AdvertisementCard advertisement={advertisement} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
