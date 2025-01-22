import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

// const CustomPrevArrow = (props) => {
//   const { className, onClick } = props;
//   return (
//     <div
//       className={className}
//       onClick={onClick}
//       style={{
//         display: "block",
//         background: "#B7B7B7", // Set the arrow background color
//         borderRadius: "50%", // Make it circular
//         zIndex: 2, // Ensure it's above other content
//       }}
//     />
//   );
// };

// const CustomNextArrow = (props) => {
//   const { className, onClick } = props;
//   return (
//     <div
//       className={className}
//       onClick={onClick}
//       style={{
//         display: "block",
//         background: "#B7B7B7", // Set the arrow background color
//         borderRadius: "50%",
//         zIndex: 2,
//       }}
//     />
//   );
// };

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    // nextArrow: <CustomNextArrow />,
    // prevArrow: <CustomPrevArrow />,
  };

  return (
    <Slider {...settings} className="#000">
      {data?.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </Slider>
  );
};

export default SliderUtil;
