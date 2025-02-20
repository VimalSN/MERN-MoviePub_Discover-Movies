import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const profileData = {
        _id: userInfo._id,
        username,
        email,
        ...(password && { password }),
      };

      const res = await updateProfile(profileData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto p-4 mt-[6rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
          <div className="w-full max-w-md">
            <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                Update Profile
                <span className="text-sm font-normal bg-gray-700 px-3 py-1 rounded-full text-teal-400">
                  {userInfo.username}
                </span>
              </h2>

              <form onSubmit={submitHandler} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-medium
                      hover:bg-teal-600 transition-colors duration-200 transform hover:scale-[1.02]
                      focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
                      disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={loadingUpdateProfile}
                  >
                    {loadingUpdateProfile ? (
                      <Loader />
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;