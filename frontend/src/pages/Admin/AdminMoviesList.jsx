import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col">
          <div className="mb-4">
            <h1 className="text-3xl  mt-3 font-bold text-gray-50 flex items-center gap-2">
              Movies Collection
              <span className="text-lg font-medium text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                {movies?.length || 0}
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className="group transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300"/>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                      {movie.name}
                    </h2>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                      {movie.detail}
                    </p>

                    <div className="pt-4 border-t border-gray-100">
                      <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Update Movie
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;