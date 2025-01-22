import React from "react"
import Header from "./Movies/Header"
import MoviesContainerPage from "./Movies/MoviesContainerPage"
import { FaFilm } from "react-icons/fa"

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b mt-5 from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl mb-4 flex items-center justify-center">
            <FaFilm className="mr-4 text-yellow-400" />
            MoviePub
            <span className="text-yellow-400">✨</span>
          </h1>
          <p className="italic text-2xl md:text-3xl text-gray-300 mb-6">Experience the Magic of Movies....</p>
          <p className="text-lg md:text-xl max-w-8xl mx-auto text-gray-400 leading-relaxed">
            Welcome to MoviePub, your ultimate destination to discover and review the latest movies. Explore a vast
            collection of films, find personalized recommendations, and share your opinions with a community of movie
            enthusiasts. Dive into the world of cinema and make every movie night unforgettable!
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
          <Header />
        </div>

        <section className="">
          <MoviesContainerPage />
        </section>
      </div>
    </div>
  )
}

export default Home

