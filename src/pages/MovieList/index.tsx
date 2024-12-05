'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { MovieType } from '../../types/movie';
import './index.scss';
import SearchBar from '../SearchBar';
import Loading from '../Loading';

export default function MovieList() {
    const [moviesPopular, setMoviesPopular] = useState<MovieType[]>([]);
    const [moviesPlaying, setMoviesPlaying] = useState<MovieType[]>([]);
    const [filteredMoviesPopular, setFilteredMoviesPopular] = useState<MovieType[]>([]);
    const [filteredMoviesPlaying, setFilteredMoviesPlaying] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [sortCriteria, setSortCriteria] = useState<string>(''); 

    useEffect(() => {
        
        getMoviesPopular();
        getMoviesPlaying();
    }, []);

    useEffect(() => {
        
        filterAndSortMovies();
    }, [search, sortCriteria, moviesPopular, moviesPlaying]);

    const getMoviesPopular = async () => {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: 'c0bd589456566d556432e707be797008',
                language: 'pt-BR',
            },
        });

        setMoviesPopular(response.data.results);
        setFilteredMoviesPopular(response.data.results);
        setIsLoading(false);
    };

    const getMoviesPlaying = async () => {
        const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            params: {
                api_key: 'c0bd589456566d556432e707be797008',
                language: 'pt-BR',
            },
        });

        setMoviesPlaying(response.data.results);
        setFilteredMoviesPlaying(response.data.results);
        setIsLoading(false);
    };

    const filterAndSortMovies = () => {
        let filteredPopular = [...moviesPopular];
        if (search) {
            filteredPopular = filteredPopular.filter((movie) =>
                formatString(movie.title).includes(formatString(search))
            );
        }
        filteredPopular = sortMovies(filteredPopular);

        
        let filteredPlaying = [...moviesPlaying];
        if (search) {
            filteredPlaying = filteredPlaying.filter((movie) =>
                formatString(movie.title).includes(formatString(search))
            );
        }
        filteredPlaying = sortMovies(filteredPlaying);

        setFilteredMoviesPopular(filteredPopular);
        setFilteredMoviesPlaying(filteredPlaying);
    };

    const sortMovies = (movies: MovieType[]) => {
        if (sortCriteria === 'alphabetical') {
            return movies.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortCriteria === 'release_date') {
            return movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        }
        return movies;
    };

    const formatString = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className='movie-container'>
            <div className='sub-header'>
                <h1 className='title'>Filtrar e Ordenar</h1>
                
                <select
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    className='sort-dropdown'
                >
                    <option value=''>Ordenar Por...</option>
                    <option value='alphabetical'>Ordem Alfabética</option>
                    <option value='release_date'>Data de Lançamento</option>
                </select>
                <SearchBar onSearchChange={setSearch} />
            </div>
            <div className='sub-header'>
                <h1 className='title'>Populares</h1>
            </div>
            <ul className='movie-list'>
                {filteredMoviesPopular.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </ul>
            <br />
            <div className='sub-header'>
                <h1 className='title'>Em Cartaz</h1>
            </div>
            <ul className='movie-list'>
                {filteredMoviesPlaying.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </ul>
        </section>
    );
}
