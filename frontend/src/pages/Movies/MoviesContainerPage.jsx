import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";
import MovieCard from "./MovieCard";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  // Remove duplicate movies based on movie _id
  const allMovies = [
    ...(data || []),
    ...(topMovies || []),
    ...(randomMovies || []),
  ];

  // Create a Set to remove duplicates based on movie _id
  const uniqueMovies = [
    ...new Map(allMovies.map((movie) => [movie._id, movie])).values(),
  ];

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = uniqueMovies.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div>
      <section className="flex flex-col justify-center items-center w-full lg:w-auto">
        {/* <div className="w-full lg:w-[85rem] mb-8 ">
          <h1 className="mb-5">Chosen For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full lg:w-[85rem] mb-8">
          <h1 className="mb-5">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div> */}

        <div className="w-full lg:w-[85rem] mb-8">
          <nav className="flex justify-center">
            {genres?.map((g) => (
              <button
                key={g._id}
                className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg ${
                  selectedGenre === g._id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleGenreClick(g._id)}
              >
                {g.name}
              </button>
            ))}
          </nav>
          <section className="mt-[1rem] flex flex-wrap justify-center">
            {filteredMovies?.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </section>
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
