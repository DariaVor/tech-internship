import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AdvertisementsPage from './components/pages/AdvertisementsPage';
import './App.css';

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
