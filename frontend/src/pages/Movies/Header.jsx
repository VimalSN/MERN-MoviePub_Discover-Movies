import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full lg:w-[85rem] md:w-[80%] mr-0 md:mr-2">
        <SliderUtil data={data} />
      </div>
    </div>
  );
};

export default Header;
// flex flex-col  