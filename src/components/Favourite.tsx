import MovieCard from "./MovieCrad";
import { useFavorites } from "../hooks/useFavourites";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Genre: string;
  imdbRating: string;
  imdbID: string;
}

export function Favourite() {
  const { favorites } = useFavorites();

  return (
    <div>
      {favorites.length > 0 ? (
        favorites.map((movie: Movie, index: number) => (
          <MovieCard movie={movie} key={index} />
        ))
      ) : (
        <p>No favorites found.</p>
      )}
    </div>
  );
}
