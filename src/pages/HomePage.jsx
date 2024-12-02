import React from 'react';
import {useEffect, useState} from 'react';
import api from '../services/api';

import MovieList from '../components/MovieList/MovieList';
import './HomePage.css';

function HomePage() {
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    async function getMovies() {
      try{
        const response = await api.get(`/discover/movie`, {
          params: {
            page:1,
          },
        });
        console.log(response.data.results)
        setMovies(response.data.results)       
      } catch (error) {
        console.error("Erro ao buscar filmes", error);
      }
    }
    getMovies();
  }, [])


  return (
    <MovieList movies={movies}/>
  )
}

export default HomePage
