import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const DetailsPage = ()=> {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function getMovies() {
            try{
              const response = await api.get(`/movie/${id}`);
              console.log(response.data)
              setMovie(response.data)       
            } catch (error) {
              console.error("Erro ao buscar filmes:", error);
            }
          }
          getMovies();
    }, [id]);

    if (!movie) return <div>Carregando...</div>;

    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`} alt="" />
            <img
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt={movie.title}
            />
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>



        </div>
    );
}

export default DetailsPage