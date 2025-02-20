import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ArrowLeft, Star, Calendar, Users } from "lucide-react";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-12">
      {/* Hero Section with Movie Image */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src={movie?.image}
          alt={movie?.name}
          className="w-full h-full object-cover"
        />
        
        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Movie Info */}
            <div className="lg:col-span-2">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {movie?.name}
              </h1>
              
              <div className="flex items-center gap-6 mb-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{movie?.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-yellow-400" />
                  <span>{movie?.rating || "Not rated"}</span>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {movie?.detail}
              </p>
            </div>

            {/* Cast Section */}
            <div className="lg:border-l lg:border-gray-700 lg:pl-8">
              <div className="flex items-center gap-2 mb-4">
                <Users size={24} className="text-purple-400" />
                <h2 className="text-2xl font-semibold">Cast</h2>
              </div>
              <div className="space-y-3">
                {movie?.cast.map((actor, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700/70 transition-colors"
                  >
                    {actor}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <MovieTabs
              loadingMovieReview={loadingMovieReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              movie={movie}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;