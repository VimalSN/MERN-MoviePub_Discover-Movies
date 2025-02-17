import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
































/* How It Works
Public Route (/login):

If the user is not logged in (userInfo is null), they are redirected to the /login route.
The Login component is rendered.
Protected Route (/dashboard):

If the user is logged in (userInfo exists), they can access /dashboard and its nested routes (/dashboard/profile, /dashboard/settings).
Nested Routes with Outlet:

The PrivateRoute renders an <Outlet />, which acts as a placeholder for the nested routes.
When the user navigates to /dashboard/profile, the Profile component is rendered in place of the Outlet.
 */

/* Flow in Practice
Case 1: User Not Logged In
State: userInfo = null
URL: /dashboard
Behavior:
PrivateRoute redirects the user to /login.
The Login component is displayed.

Case 2: User Logged In
State: userInfo = { name: "John Doe" }
URL: /dashboard
Behavior:
PrivateRoute renders the Outlet.
The Dashboard component is displayed.
URL: /dashboard/profile
Behavior:
PrivateRoute renders the Outlet.
The Profile component is displayed.

Benefits of Using Outlet:

Flexible Nested Routes: Allows nested routes to be dynamically rendered inside a parent route component.
Centralized Authentication: The PrivateRoute handles authentication for all child routes.
Modular Code: Child components (Dashboard, Profile, Settings) can focus on their specific logic without worrying about authentication logic. */