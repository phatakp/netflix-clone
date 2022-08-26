import { useAuth } from "context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useMovies } from "hooks";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { IMovie, IMovieDetail } from "types";
import { db } from "../../firebase";

const LikeMovie = ({ movie }: { movie: IMovieDetail | IMovie }) => {
  const { user } = useAuth();
  const [, movies] = useMovies(undefined);
  const liked = movies.find((item) => item.id === movie.id);
  const userRef = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      try {
        if (!liked) {
          await updateDoc(userRef, {
            savedMovies: arrayUnion({ ...movie }),
          });
        } else {
          const result = movies.filter((item) => item.id !== movie.id);
          await updateDoc(userRef, { savedMovies: result });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please login to save");
    }
  };

  return (
    <button
      className="flex items-center justify-center p-4 rounded-full bg-slate-300 hover:bg-slate-400"
      onClick={saveShow}>
      {liked ? (
        <FaThumbsUp className="text-xl text-red-500" />
      ) : (
        <FaRegThumbsUp className="text-xl text-gray-800" />
      )}
    </button>
  );
};

export default LikeMovie;
