import React from 'react';
import MovieCard from './MovieCard'; //componente com informacoes sobre o filme

const FavoriteList = ({ favorites, onRemoveFavorite }) => {
    return (
        <div className="favorite-list">
        {favorites.map((movie) => (
            <MovieCard
            key={movie.id}
            movie={movie}
            onRemoveFavorite={onRemoveFavorite}
            isFavorite={true}
            />
        ))}
        </div>
    );
};

export default FavoriteList;