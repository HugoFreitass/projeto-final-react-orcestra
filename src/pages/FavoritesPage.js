import React, { useEffect, useState } from 'react';
// import { fetchMovies } from './api';
// import MovieList from './components/MovieList';
import FavoriteList from './components/FavoriteList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
        const data = await fetchMovies();
        setMovies(data);
        };
        getMovies();
    }, []);

    const addFavorite = (movie) => {
        setFavorites([...favorites, movie]);
    };

    const removeFavorite = (id) => {
        setFavorites(favorites.filter((movie) => movie.id !== id));
    };

    return (
        <Router>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favoritos</Link>
        </nav>
        <Routes>
            <Route
            path="/"
            element={<MovieList movies={movies} favorites={favorites} onAddFavorite={addFavorite} onRemoveFavorite={removeFavorite} />}
            />
            <Route
            path="/favorites"
            element={<FavoriteList favorites={favorites} onRemoveFavorite={removeFavorite} />}
            />
        </Routes>
        </Router>
    );
};

export default App;
