import type { z } from 'zod';
import type { OrderSchema } from '../utils/validations';

export type OrderType = z.infer<typeof OrderSchema>;
