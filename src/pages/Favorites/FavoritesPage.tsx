import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieType } from "../../types/movie";
import StarRating from "../StarRating"; 
import useAuth from "../../hooks/useAuth";
import { formatDateBR } from "../../utils/date"; 
import "./FavoritesPage.scss";

const FavoritesPage: React.FC = () => {
  const { user } = useAuth(); 
  const [favoriteMovies, setFavoriteMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    if (user) {
      const favoritesKey = `favoritos_${user.email}`; 
      const storedFavorites = localStorage.getItem(favoritesKey);

      if (storedFavorites) {
        try {
          const parsedFavorites = JSON.parse(storedFavorites);

          const validFavorites = parsedFavorites.filter(
            (movie: MovieType) =>
              movie.id && movie.title && movie.release_date && movie.poster_path
          );

          setFavoriteMovies(validFavorites);
        } catch (error) {
          console.error("Erro ao carregar os favoritos:", error);
          setFavoriteMovies([]);
        }
      }
    }
  }, [user]);

  const removeFavorite = (id: number) => {
    if (user) {
      const favoritesKey = `favoritos_${user.email}`;
      const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== id);
      setFavoriteMovies(updatedFavorites);
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    }
  };

  if (!user) {
    return <p className="no-favorites">Por favor, faça login para ver seus favoritos.</p>;
  }

  if (favoriteMovies.length === 0) {
    return <p className="no-favorites">Você ainda não adicionou filmes aos favoritos.</p>;
  }

  return (
    <section className="favorites-container">
      <h1 className="favorites-title">Meus Favoritos</h1>
      <ul className="movie-list-favorites">
        {favoriteMovies.map((movie) => (
          <li key={movie.id} className="movie-card">
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div className="movie-infos">
              <p className="movie-title">{movie.title}</p>
              {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
              
              <p className="movie-date">{formatDateBR(movie.release_date)}</p>
              <div className="hidden-content">
                {movie.overview && (
                  <p className="movie-description">
                    {movie.overview.length > 100
                      ? `${movie.overview.substring(0, 100)}...`
                      : movie.overview}
                  </p>
                )}
                <button className="btn-default">
                  <Link to={`/details/${movie.id}`}>Ver Mais</Link>
                </button>
                <button
                  className="btn-default"
                  onClick={() => removeFavorite(movie.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FavoritesPage;
