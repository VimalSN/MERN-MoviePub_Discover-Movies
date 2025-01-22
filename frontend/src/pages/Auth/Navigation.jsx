import { useState, useEffect } from "react";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineManageSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";
import MoviePub from "../../assets/MoviePub2.png";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown-button")) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropDown = () => {
    setDropDownOpen((prev) => !prev);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 bg-[#000] w-full px-8 rounded-b-lg">
      <section className="flex justify-between items-center py-3">
        {/* Logo and Navigation Links */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={MoviePub}
              alt="MoviePub Logo"
              className="w-[170px] h-[50px]"
            />
          </Link>
          <Link
            to="/movies"
            className="flex items-center ml-4 transition-transform transform hover:translate-x-2"
          >
            <MdOutlineManageSearch className="text-gray-100 mr-2" size={26} />
          </Link>
        </div>

        {/* User Info and Dropdown */}
        <div className="relative">
          {userInfo ? (
            <button
              onClick={toggleDropDown}
              className="flex items-center dropdown-button focus:outline-none"
            >
              <span className="text-white">{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-2 transform transition-transform duration-300 ease-in-out ${
                  dropDownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ) : (
            <ul className="flex space-x">
              {" "}
              {/* Added consistent spacing */}
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-1 px-4 py-2 rounded-lg  text-gray-100 hover:bg-gray-700 hover:text-white transition-colors duration-300"
                >
                  <span className="nav-item-name">SignIn</span>
                </Link>
              </li>
              <span className="mt-3">/</span>
              <li>
                <Link
                  to="/register"
                  className="flex items-center mt-1 px-4 py-2 rounded-lg  text-gray-100 hover:bg-gray-700 hover:text-white transition-colors duration-300"
                >
                  <span className="nav-item-name">SignUp</span>
                </Link>
              </li>
            </ul>
          )}

          {/* Dropdown Menu */}
          {dropDownOpen && userInfo && (
            <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md text-gray-600">
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
