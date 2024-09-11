import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AdvertisementsPage from './components/pages/AdvertisementsPage';
import './App.css';
import AdvertisementDetailPage from './components/pages/AdvertisementDetailPage';
import OrdersPage from './components/pages/OrdersPage';

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <AdvertisementsPage />,
        },
        {
          path: '/advertisements',
          element: <AdvertisementsPage />,
        },
        {
          path: '/advertisements/:id',
          element: <AdvertisementDetailPage />,
        },
        {
          path: '/orders',
          element: <OrdersPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
