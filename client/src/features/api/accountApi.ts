import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AdvertisementFormType, AdvertisementType } from '../../types/advertisementTypes';
import type { OrderType } from '../../types/orderTypes';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Advertisement', 'Order'],
  endpoints: (builder) => ({
    getAdvertisements: builder.query<AdvertisementType[], void>({
      query: () => '/advertisements',
      providesTags: ['Advertisement'],
    }),
    getAdvertisementById: builder.query<AdvertisementType, AdvertisementType['id']>({
      query: (id) => `/advertisements/${id}`,
      providesTags: ['Advertisement'],
    }),
    addAdvertisement: builder.mutation<AdvertisementType, AdvertisementFormType>({
      query: (advertisement) => ({
        url: '/advertisements',
        method: 'POST',
        body: advertisement,
      }),
      invalidatesTags: ['Advertisement'],
    }),
    updateAdvertisement: builder.mutation<AdvertisementType, AdvertisementType>({
      query: (advertisement) => ({
        url: `/advertisements/${advertisement.id}`,
        method: 'PATCH',
        body: advertisement,
      }),
      invalidatesTags: ['Advertisement'],
    }),
    deleteAdvertisement: builder.mutation<{ success: boolean }, { id: string }>({
      query: (advertisement) => ({
        url: `/advertisements/${advertisement.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Advertisement'],
    }),

    getOrders: builder.query<OrderType[], void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<OrderType, OrderType['id']>({
      query: (id) => `/orders/${id}`,
      providesTags: ['Order'],
    }),

    updateOrder: builder.mutation<OrderType, OrderType>({
      query: (order) => ({
        url: `/orders/${order.id}`,
        method: 'PATCH',
        body: order,
      }),
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation<{ success: boolean }, { id: number }>({
      query: (order) => ({
        url: `/orders/${order.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetAdvertisementsQuery,
  useGetAdvertisementByIdQuery,
  useAddAdvertisementMutation,
  useUpdateAdvertisementMutation,
  useDeleteAdvertisementMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = accountApi;
