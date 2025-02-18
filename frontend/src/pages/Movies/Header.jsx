import { useGetNewMoviesQuery } from "../../redux/api/movies";
import MovieCard from "./MovieCard";

const Header = () => {
  const { data = [], isLoading, error } = useGetNewMoviesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full lg:w-[85rem] md:w-[80%] mr-0 md:mr-2 overflow-x-auto">
        <div className="flex">
          {data.map((movie) => (
            <div key={movie._id} className="flex-shrink-0 m-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
