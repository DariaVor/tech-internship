import { z } from 'zod';

export const AdvertisementSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().min(0, 'Цена не может быть отрицательной'),
  createdAt: z.string(),
  views: z.number().min(0, 'Количество просмотров не может быть отрицательным'),
  likes: z.number().min(0, 'Количество лайков не может быть отрицательным'),
  imageUrl: z.string().optional(),
});

export const OrderItemSchema = AdvertisementSchema.extend({
  count: z.number().min(1, 'Количество должно быть не менее 1'),
});

export const OrderSchema = z.object({
  id: z.string(),
  status: z.number(),
  createdAt: z.string(),
  finishedAt: z.string().optional(),
  items: z.array(OrderItemSchema),
  deliveryWay: z.string(),
  total: z.number().min(0, 'Сумма заказа не может быть отрицательной'),
});
