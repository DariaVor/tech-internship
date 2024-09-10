import type { z } from 'zod';
import type { AdvertisementSchema } from '../utils/validations';

export type AdvertisementType = z.infer<typeof AdvertisementSchema>;
export type AdvertisementFormType = Omit<AdvertisementType, 'id' | 'createdAt' | 'views' | 'likes'>;
