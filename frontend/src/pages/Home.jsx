import Header from "./Movies/Header"
import MoviesContainerPage from "./Movies/MoviesContainerPage"
import { FaFilm, FaSearch, FaStar } from "react-icons/fa"

const Home = () => {
  return (
    <div className="min-h-screen mt-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl mb-6 flex items-center justify-center">
            <FaFilm className="mr-4 text-yellow-400 animate-pulse" />
            Movie<span className="text-yellow-400">Pub</span>
            <span className="text-yellow-400 ml-2">✨</span>
          </h1>
          <p className="italic text-2xl md:text-3xl text-gray-300 mb-8">Experience the Magic of Movies...</p>
          <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-400 leading-relaxed">
            Welcome to MoviePub, your ultimate destination to discover and review the latest movies. Explore a vast
            collection of films, find personalized recommendations, and share your opinions with a community of movie
            enthusiasts.
          </p>
          <div className="flex justify-center mt-8 space-x-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
              <FaSearch className="mr-2" /> Explore Movies
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
              <FaStar className="mr-2" /> Top Rated
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-12 hover:shadow-xl transition duration-300">
          <Header />
        </div>

        <section className="bg-gray-900 rounded-lg shadow-lg p-6">
          <MoviesContainerPage />
        </section>
      </div>
    </div>
  )
}

export default Home

