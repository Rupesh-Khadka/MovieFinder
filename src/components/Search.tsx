import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

import { toast } from "react-toastify";
import MovieCard from "./MovieCrad";

export function Search() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState(null);

  const fetchMovie = async (movieName: string) => {
    try {
      if (movieName.trim() === "") {
        setError("Movie name is required");
        return;
      }
      setError("");
      setLoading(true);
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          movieName
        )}&apikey=fcde75fe`
      );

      const data = await response.json();

      if (data.Response === "False") {
        toast.error(data.Error || "No movie found");
        setMovie(null);
        setLoading(false);
        return;
      }
      console.log("Movie Data:", data);
      //   setName("");
      setMovie(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie:", error);
      toast.error("Server Error. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name.trim() === "") {
      setMovie(null);
      setError("");
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      fetchMovie(name);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [name]);

  return (
    <div className="flex flex-col items-center justify-center  w-full">
      <h1 className="text-3xl font-bold ">Search for movie </h1>
      <div className="flex items-centers justify-center space-x-4 w-full mt-4">
        <div className="">
          <input
            value={name}
            type="text"
            className="border-2 rounded-xl p-2 px-6  w-[400px]"
            placeholder="Enter the name of the movie..."
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            disabled={loading}
            onClick={() => fetchMovie(name)}
            className="flex items-center justify-center "
          >
            {loading ? (
              <div className="flex gap-2 items-center border-2 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-800 cursor-pointer">
                <LuLoaderCircle className="animate-spin" />{" "}
                <span>Searching</span>
              </div>
            ) : (
              <div className="border-2 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-800 cursor-pointer">
                Search
              </div>
            )}
          </button>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm text-start w-full">{error}</p>
      )}

      {movie && <MovieCard movie={movie} />}
    </div>
  );
}
