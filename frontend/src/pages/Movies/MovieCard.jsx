import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="relative group m-[2rem]">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name || "Movie Poster"}
          className="w-[15rem] h-[15rem] rounded transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
      </Link>
      
      <p className="absolute top-[85%] left-[2rem] opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie.name}
      </p>
    </div>
  );
};

export default MovieCard;
