import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AdvertisementsPage from './components/pages/AdvertisementsPage';
import './App.css';
import AdvertisementDetailPage from './components/pages/AdvertisementDetailPage';

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
          path: '/advertisement/:id',
          element: <AdvertisementDetailPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
