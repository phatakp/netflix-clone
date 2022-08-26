import { useAuth } from "context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { useMovies } from "hooks";
import BannerImg from "images/banner.jpg";
import { Banner, Layout } from "layout";
import { FaTimes } from "react-icons/fa";
import { db } from "../firebase";

export const Account = () => {
  const [, movies] = useMovies(undefined);
  const { user } = useAuth();

  const userRef = doc(db, "users", `${user?.email}`);
  const removeSaved = async (id: number) => {
    try {
      const result = movies.filter((item) => item.id !== id);
      await updateDoc(userRef, { savedMovies: result });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Banner img={BannerImg} showBanner={true}>
        <div>{user?.displayName}</div>
      </Banner>

      <div className="max-w-4xl px-8 py-4 mx-auto">
        <h1 className="text-4xl font-semibold font-poppins">My Movies</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {movies?.map((item) => (
            <div
              key={item.id}
              className="relative shadow cursor-pointer rounded-xl max-w-[300px]">
              <img
                className={`object-cover my-4`}
                src={`${process.env.REACT_APP_MOVIE_IMAGE_CROP_URL}${item?.backdrop_path}`}
                alt={item?.title}
              />
              <div className="absolute inset-0 overflow-hidden text-white opacity-0 hover:bg-black/70 hover:opacity-100">
                <p
                  className="absolute right-0 text-xl top-4"
                  onClick={() => removeSaved(item.id)}>
                  <FaTimes className="mx-2 text-yellow-500" />
                </p>
                <p className="absolute bottom-0 text-sm font-bold left-2 white-space-normal md:text-lg lg:text-xl">
                  {item?.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
