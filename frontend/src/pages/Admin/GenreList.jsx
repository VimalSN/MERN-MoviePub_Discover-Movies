import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";
import { PlusCircle } from "lucide-react";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen mt-8 bg-gradient-to-br from-gray-900 to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              Manage Genres
              <span className="text-lg font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {genres?.length || 0}
              </span>
            </h1>
          </div>

          <div className="mb-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-teal-500" />
                Add New Genre
              </h2>
              <GenreForm
                value={name}
                setValue={setName}
                handleSubmit={handleCreateGenre}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Available Genres
            </h2>
            <div className="flex flex-wrap gap-3">
              {genres?.map((genre) => (
                <button
                  key={genre._id}
                  className="bg-white border-2 border-teal-500 text-teal-700 py-2 px-4 rounded-lg 
                    hover:bg-teal-500 hover:text-white transition-all duration-200 
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
                    transform hover:-translate-y-0.5 active:translate-y-0"
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                  }}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Update Genre
              </h2>
              <GenreForm
                value={updatingName}
                setValue={(value) => setUpdatingName(value)}
                handleSubmit={handleUpdateGenre}
                buttonText="Update"
                handleDelete={handleDeleteGenre}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default GenreList;