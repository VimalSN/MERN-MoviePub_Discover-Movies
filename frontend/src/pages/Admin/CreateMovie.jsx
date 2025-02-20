import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMovieMutation, useUploadImageMutation } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { Film, Upload, Star, Users, Calendar, FileText, Layout } from "lucide-react";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie, error: createMovieErrorDetail }] = useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      const selectedGenre = genres.find((genre) => String(genre._id) === value);
      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateMovie = async () => {
    try {
      if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast.length || !selectedImage) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData).unwrap();
        
        if (uploadImageResponse && uploadImageResponse.image) {
          uploadedImagePath = uploadImageResponse.image;
        } else {
          console.error("Failed to upload image: ", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await createMovie({
        ...movieData,
        image: uploadedImagePath,
      }).unwrap();

      navigate("/admin/movies-list");

      setMovieData({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        rating: 0,
        image: null,
        genre: "",
      });
      setSelectedImage(null);
      setImagePreview(null);

      toast.success("Movie Added To Database");
    } catch (error) {
      console.error("Failed to create movie: ", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <Film className="w-8 h-8 text-teal-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Create Movie
            </h1>
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
              ></textarea>
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
                value={Array.isArray(movieData.cast) ? movieData.cast.join(", ") : ""}
                onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter cast members (comma-separated)"
              />
            </div>

            {/* Genre Select */}
            <div className="group relative">
              <label className="flex items-center gap-2 text-white/80 mb-2 text-sm">
                <Star className="w-4 h-4" />
                Genre
              </label>
              <select
                name="genre"
                value={movieData.genre}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
              >
                {isLoadingGenres ? (
                  <option>Loading genres...</option>
                ) : (
                  genres.map((genre) => (
                    <option key={genre._id} value={genre._id} className="bg-gray-800">
                      {genre.name}
                    </option>
                  ))
                )}
              </select>
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
              onClick={handleCreateMovie}
              disabled={isCreatingMovie || isUploadingImage}
              className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-white font-medium py-3 px-4 rounded-lg hover:from-teal-500 hover:to-emerald-500 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCreatingMovie || isUploadingImage ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Film className="w-5 h-5" />
                  Create Movie
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;