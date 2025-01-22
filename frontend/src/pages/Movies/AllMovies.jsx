import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;

      default:
        dispatch(setFilteredMovies([]));
        break;
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <section
        className="relative h-[50rem] w-full mb-24 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

        <div className="relative z-10 text-center text-white mt-[10rem]">
          <h1 className="text-6xl sm:text-8xl font-bold mb-4">
            The Movies Pub
          </h1>
          <p className="text-xl sm:text-2xl">
            Cinematic Odyssey: Unveiling the Magic of Movies
          </p>
        </div>

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
          <input
            type="text"
            className="w-full h-16 border px-10 outline-none rounded"
            placeholder="Search Movie"
            value={moviesFilter.searchTerm}
            onChange={handleSearchChange}
          />
          <div className="sorts-container mt-4 flex flex-wrap justify-center gap-4">
            <select
              className="border p-2 rounded text-black"
              value={moviesFilter.selectedGenre}
              onChange={(e) => handleGenreClick(e.target.value)}
            >
              <option value="">Genres</option>
              {genres?.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded text-black"
              value={moviesFilter.selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
            >
              <option value="">Year</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded text-black"
              value={moviesFilter.selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="new">New Movies</option>
              <option value="top">Top Movies</option>
              <option value="random">Random Movies</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mt-24 w-full flex justify-center items-center flex-wrap">
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </section>
    </div>
  );
};

export default AllMovies;
