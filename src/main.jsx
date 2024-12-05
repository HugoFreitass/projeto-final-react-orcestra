import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from "./contexts/auth";
import './index.css';
import Layout from './Layout.tsx';
import MovieList from './pages/MovieList/index.tsx';
import Signin from './pages/Signin/index.tsx';
import Signup from './pages/Signup/index.tsx';
import Edit from './pages/Edit/index.tsx';
import Details from './pages/DetailsPage/DetailsPage.tsx';
import FavoritesPage from './pages/Favorites/FavoritesPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MovieList />
      },
      {
        path: "signin",
        element: <Signin />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "details/:id",
        element: <Details />
      },
      {
        path: "favorites",
        element: <FavoritesPage />
      },
      
      {
        path: "edit",
        element: <Edit />
      }

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
