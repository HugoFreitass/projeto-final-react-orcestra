import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import "./DetailsPage.scss";

import starIcon from "../../assets/images/icons8-estrela-24.png";

const DetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        // Recupera favoritos do localStorage ao carregar a página
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        async function getMovieDatails() {
        try {
            const movieResponse = await api.get(`/movie/${id}`);
            setMovie(movieResponse.data);

            const castResponse = await api.get(`/movie/${id}/credits`);
            setCast(castResponse.data.cast);
        } catch (error) {
            console.error("Erro ao buscar detalhes do filme:", error);
        }
        }
        getMovieDatails();
    }, [id]);

    const formatDate = (isoDate) => {
        const [year, month, day] = isoDate.split("-");
        return `${day}/${month}/${year}`;
    };

    const toggleFavorite = () => {
        const isFavorite = favorites.some((fav) => fav.id === movie.id);

        let updatedFavorites;
        if (isFavorite) {
        // Remove dos favoritos
        updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
        } else {
        // Adiciona aos favoritos
        updatedFavorites = [...favorites, { id: movie.id, title: movie.title }];
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Atualiza o localStorage
    };

    if (!movie) return <div>Carregando...</div>;

    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    return (
        <div className="details-page-content">
        <img
            className="movie-backdrop"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="Banner do filme"
        />

        <div className="movie-data">
            <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="Poster do filme"
            />

            <div className="movie-description-container">
            <div className="movie-description">
                <h2 className="movie-title">{movie.title}</h2>
                <p>{movie.tagline}</p>
                <p>
                {movie.vote_average.toFixed(1)}{" "}
                <img src={starIcon} alt="Star" width="20px" /> ({movie.vote_count}) votos
                </p>
                <p>{movie.runtime} min</p>
                <p>Data de lançamento: {formatDate(movie.release_date)}</p>
                <div className="container-movie-genres">
                {movie.genres &&
                    movie.genres.map((genre) => (
                    <div key={genre.id} className="movie-genres">
                        {genre.name}
                    </div>
                    ))}
                </div>
                <button 
                className={`favorite-btn ${isFavorite ? "favorited" : ""}`} 
                onClick={toggleFavorite}
                >
                {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                </button>
            </div>
            <div className="container-movie-overview">
                <h3>Sinopse</h3>
                <p>{movie.overview}</p>
            </div>
        </div>

        <div className="movie-cast">
            {cast &&
                cast.slice(0, 5).map((actor) => (
                <div key={actor.id} className="movie-actor">
                    <img
                    src={
                        actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://i.pinimg.com/474x/cf/c8/a7/cfc8a77cecf698e50890d8ab4a566e34.jpg"
                    }
                    alt={actor.name}
                    />
                    <p className="actor-name"> {actor.name}</p>
                    <p>{actor.character}</p>
                </div>
                ) )}
            </div>
        </div>
        </div>
    );
};

export default DetailsPage;
