import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Layout from './Layout.tsx'; // Importe o Layout
import MovieList from './pages/MovieList/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout com Navbar
    children: [
      {
        path: "",
        element: <MovieList /> // Página principal
      },
      // Adicione outras rotas filhas aqui
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
