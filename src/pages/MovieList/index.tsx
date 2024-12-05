'use client';
import React from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { useEffect, useState } from 'react';
import { MovieType } from '../../types/movie';
import './index.scss';
import SearchBar from '../SearchBar';
import Loading from '../Loading';

export default function MovieList() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [filteredMoviesPopular, setFilteredMoviesPopular] = useState<MovieType[]>([]);
    const [filteredMoviesPlaying, setFilteredMoviesPlaying] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        getMoviesPopular();
        getMoviesPlaying();
    }, []);

    useEffect(() => {
        let newMovieList = [...movies];
        if (search !== '') {
            newMovieList = newMovieList.filter(movie =>
                formatString(movie.title).includes(formatString(search))
            );
        }
        setFilteredMoviesPopular(newMovieList);
        setFilteredMoviesPlaying(newMovieList);
    }, [search]);

    const getMoviesPopular = async () => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/movie/popular',
            params: {
                api_key: 'c0bd589456566d556432e707be797008',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results);
            setFilteredMoviesPopular(response.data.results);
        });

        setIsLoading(false);
    }

    const getMoviesPlaying = async () => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/movie/now_playing',
            params: {
                api_key: 'c0bd589456566d556432e707be797008',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results);
            setFilteredMoviesPlaying(response.data.results);
        });

        setIsLoading(false);
    }

    const formatString = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <section className='movie-container'>
            <div className='sub-header'>
                <h1 className='title'>Populares</h1>
                <SearchBar onSearchChange={setSearch} />
            </div>
            <ul className='movie-list'>
                {filteredMoviesPopular.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </ul>
            <br></br><br></br><br></br>
            <div className='sub-header'>
                <h1 className='title'>Em Cartaz</h1>
                
            </div>
            <ul className='movie-list'>
                {filteredMoviesPlaying.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </ul>
        </section>
    );
}
