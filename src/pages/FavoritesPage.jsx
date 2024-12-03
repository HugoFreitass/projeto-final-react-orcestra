import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    return <p>Você ainda não adicionou filmes aos favoritos.</p>;
  }

  return (
    <div>
      <h2>Filmes Favoritos</h2>
      <ul>
        {favorites.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
