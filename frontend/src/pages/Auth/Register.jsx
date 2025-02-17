import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth); // it used to extract the user data based on the 'auth'slice property and userinfo 
  // contains the user name,id,email,token 

  const { search } = useLocation(); // https://example.com/page?name=John&age=30&theme=dark => ?name=John&age=30&theme=dark
  const sp = new URLSearchParams(search);  // name: john, age: 30, theme: darkm, so URLSearchParams is used to extract info from the paramaters
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  

  const submitHandler = async (e) => {
    e.preventDefault(); //used to prevent the default behavior of the form submission. By default, when a form is submitted, the page reloads,
    //  or the browser navigates to the action URL of the form. This method is essential in single-page applications (SPAs) where
    //  you want to handle form submissions without reloading the page.
    
  
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } catch (err) {
        console.log('Error details:', err);
        const errorMessage = err?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
      }
      
    }
  };

  return (
    <div className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-teal-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-[45rem] w-[45%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </div>
  );
};
export default Register;




// In your code, the useEffect hook watches for changes in userInfo. Here's how it works:

// Initial Render: When the Register component first renders, the value of userInfo will be initially undefined or null (since no user is logged in at that point). Therefore, the code inside useEffect won’t run until userInfo gets updated.

// When userInfo Changes:

// The useEffect hook is triggered whenever there’s a change in userInfo.
// If userInfo is populated (i.e., a user has successfully registered and their info is stored in the Redux state), the navigate(redirect) will execute, and the user will be redirected to the desired page (the redirect URL or / if no redirect is provided).
// When Will userInfo be Updated?:

// After a successful registration, inside your submitHandler, you call dispatch(setCredentials({ ...res })), which updates the Redux state (including userInfo).
// Once this happens, useEffect will identify the change in userInfo and trigger the navigation logic.
// Flow:
// On the first render, userInfo is not set (assuming no one is logged in).
// The user fills out the registration form and clicks submit.
// After the registration API call is successful, userInfo is updated via dispatch(setCredentials({ ...res })).
// The useEffect hook detects that userInfo has changed and executes navigate(redirect), redirecting the user to the appropriate page.
// Important Notes:
// The useEffect hook will run once during the initial render and then again whenever userInfo changes, due to the dependency array [navigate, redirect, userInfo].


// Why useEffect Runs on Initial Render:
// Component Mount: On the initial render, the useEffect will run regardless of the dependency array. The purpose of this is to handle side 
// effects (like fetching data, subscribing to services, etc.) right after the component has been rendered.

// Dependencies: The dependency array you provided ([navigate, redirect, userInfo]) ensures that the useEffect will only rerun when one 
// of these values changes. However, the first time the component is rendered, React will run the useEffect for the first time, treating 
// it as an initial invocation of the side effect.