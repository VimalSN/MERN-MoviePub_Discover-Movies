import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import { Film, Upload, Users, Calendar, FileText, Layout, Trash2 } from "lucide-react";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
      if (initialMovieData.image) {
        setImagePreview(initialMovieData.image);
      }
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateMovie = async () => {
    try {
      if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast) {
        toast.error("Please fill in all required fields");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      });

      navigate("/movies");
      toast.success("Movie updated successfully");
    } catch (error) {
      console.error("Failed to update movie:", error);
      toast.error("Failed to update movie");
    }
  };

  const handleDeleteMovie = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(id);
        toast.success("Movie deleted successfully");
        navigate("/movies");
      } catch (error) {
        console.error("Failed to delete movie:", error);
        toast.error(`Failed to delete movie: ${error?.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Film className="w-8 h-8 text-teal-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Update Movie
              </h1>
            </div>
            <button
              type="button"
              onClick={handleDeleteMovie}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Delete Movie
            </button>
          </div>

          <form className="space-y-6">
            {/* Name Input */}
            <div className="group relative">
              <label className="flex items-center gap-2 text-white/80 mb-2 text-sm">
                <Layout className="w-4 h-4" />
                Movie Name
              </label>
              <input
                type="text"
                name="name"
                value={movieData.name}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter movie name"
              />
            </div>

            {/* Year Input */}
            <div className="group relative">
              <label className="flex items-center gap-2 text-white/80 mb-2 text-sm">
                <Calendar className="w-4 h-4" />
                Release Year
              </label>
              <input
                type="number"
                name="year"
                value={movieData.year}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter release year"
              />
            </div>

            {/* Detail Input */}
            <div className="group relative">
              <label className="flex items-center gap-2 text-white/80 mb-2 text-sm">
                <FileText className="w-4 h-4" />
                Movie Details
              </label>
              <textarea
                name="detail"
                value={movieData.detail}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none min-h-[100px]"
                placeholder="Enter movie description"
              />
            </div>

            {/* Cast Input */}
            <div className="group relative">
              <label className="flex items-center gap-2 text-white/80 mb-2 text-sm">
                <Users className="w-4 h-4" />
                Cast Members
              </label>
              <input
                type="text"
                name="cast"
                value={movieData.cast.join(", ")}
                onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter cast members (comma-separated)"
              />
            </div>

            {/* Image Upload */}
            <div className="group relative">
              <label className="flex items-center gap-2 text-white/80 mb-2 text-sm">
                <Upload className="w-4 h-4" />
                Movie Poster
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-grow">
                  <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 cursor-pointer hover:border-teal-400 transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
                    </div>
                  </label>
                </div>
                {imagePreview && (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                          setMovieData(prev => ({ ...prev, image: null }));
                        }}
                        className="text-white hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleUpdateMovie}
              disabled={isUpdatingMovie || isUploadingImage}
              className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-white font-medium py-3 px-4 rounded-lg hover:from-teal-500 hover:to-emerald-500 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUpdatingMovie || isUploadingImage ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Film className="w-5 h-5" />
                  Update Movie
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;