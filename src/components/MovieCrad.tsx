import React from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFavorites } from "../hooks/useFavourites";

interface MovieCardProps {
  movie: {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Genre: string;
    imdbRating: string;
    imdbID: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const handleFavClick = () => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
      toast.error("Removed from favourite");
    } else {
      addFavorite(movie);
      toast.success("Added to favourite");
    }
  };

  return (
    <div className="border rounded-xl shadow-lg  w-full max-w-[600px] max-heigh-[400px] mt-8 ">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-[300px] object-cover rounded-md"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mt-4">
          {movie.Title} ({movie.Year})
        </h2>
        <p className="text-sm text-gray-500 mb-2">{movie.Genre}</p>
        <p className="mt-2">{movie.Plot}</p>
        <p className="mt-2 font-semibold"> Rating: ⭐ {movie.imdbRating}</p>
      </div>
      <button className="px-4 py-1" onClick={() => handleFavClick()}>
        <FaHeart
          className={`text-3xl cursor-pointer ${
            isFavorite ? "text-yellow-400" : "text-white"
          }`}
        />
      </button>
    </div>
  );
};

export default MovieCard;
