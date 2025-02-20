import { useGetNewMoviesQuery } from "../../redux/api/movies"
import MovieCard from "./MovieCard"
import Slider from "react-slick"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

// Import CSS files for react-slick
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Header = () => {
  const { data = [], isLoading, error } = useGetNewMoviesQuery()

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading movies</div>
  }

  const CustomPrevArrow = (props) => (
    <button
      {...props}
      className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
    >
      <FaChevronLeft />
    </button>
  )

  const CustomNextArrow = (props) => (
    <button
      {...props}
      className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
    >
      <FaChevronRight />
    </button>
  )

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">New Releases</h2>
      <Slider {...settings}>
        {data.map((movie) => (
          <div key={movie._id} className="px-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Header

