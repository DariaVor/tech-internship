import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useGetAdvertisementsQuery } from '../../features/api/accountApi';
import type { AdvertisementType } from '../../types/advertisementTypes';
import AdvertisementCard from '../ui/AdvertisementCard';
import AddAdvertisements from '../ui/AddAdvertisements';

export default function AdvertisementsPage(): JSX.Element {
  const { data: allAdvertisements } = useGetAdvertisementsQuery();

  const [advertisements, setAdvertisements] = useState<AdvertisementType[]>([]);

  useEffect(() => {
    if (allAdvertisements) {
      setAdvertisements(allAdvertisements);
    }
  }, [allAdvertisements]);

  return (
    <>
      <Box display="flex" flexWrap="wrap" justifyContent="center" mt={3}>
        <AddAdvertisements />
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center" mt={2}>
        {advertisements?.map((advertisement) => (
          <Box m={3} key={advertisement.id}>
            <AdvertisementCard advertisement={advertisement} />
          </Box>
        ))}
      </Box>
    </>
  );
}
