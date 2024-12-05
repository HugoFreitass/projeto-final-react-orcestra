import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import DetailsPage from './pages/DetailsPage/DetailsPage.jsx';
import MovieList from './pages/MovieList/index.tsx';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MovieList />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />
      },
      {
        path: "/movies/:id",
        element: <DetailsPage />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
