import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { MovieType } from '../../types/movie';
import StarRating from '../StarRating';
import './index.scss';


export type Props = {
  movie: MovieType;
};

export default function MovieCard(props: Props) {
  const { movie } = props;

  
  const formatDateBR = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <li className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="movie-infos">
        <p className="movie-title">{movie.title}</p>
        {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
        
        <p className="movie-date">
          {formatDateBR(movie.release_date)}
        </p>
        <div className="hidden-content">
          {movie.overview && (
            <p className="movie-description">
              {movie.overview.length > 100
                ? `${movie.overview.substring(0, 100)}...`
                : movie.overview}
            </p>
          )}
          <button className="btn-default" ><Link to={`/details/${movie.id}`}>Ver Mais</Link></button>
        </div>
      </div>
    </li>
  );
}
