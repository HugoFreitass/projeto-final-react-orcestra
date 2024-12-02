import { Link } from "react-router-dom";

function MovieList({ movies }) {
    return (
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <Link to={`/movies/${movie.id}`}>Ver Detalhes</Link>
          </div>
        ))}
      </div>
    );
  }
  
  export default MovieList;