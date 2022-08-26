import { useModal } from "hooks";
import { FaPlay, FaStar } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import type { IMovie } from "types";
import { truncateChars } from "utilties/truncate";

export const MovieBanner = ({ movie }: { movie: IMovie }) => {
  const { openModal, modal } = useModal(movie?.id);
  return (
    <div className="w-full px-8">
      {modal}
      <div className="w-full text-4xl font-extrabold md:w-2/3 md:text-6xl font-poppins">
        {movie?.title}
      </div>
      <p className="w-full my-8 text-gray-300 md:w-2/3 xl:w-1/2 md:text-lg">
        {truncateChars(movie?.overview, 200)}
      </p>
      <p className="inline-flex items-center text-2xl">
        <FaStar className="mx-2 text-yellow-500" />
        {movie?.vote_average}
      </p>
      <div className="flex my-4">
        <button className="inline-flex items-center px-4 py-3 mr-4 text-gray-800 rounded md:px-8 bg-slate-300 hover:bg-slate-300/80">
          <FaPlay />{" "}
          <span className="ml-2 text-lg font-semibold md:text-2xl">Play</span>
        </button>
        <button className="inline-flex items-center px-4 py-3 text-white rounded md:px-8 bg-gray-600/80 hover:bg-gray-800/80">
          <HiOutlineExclamationCircle className="text-2xl" />
          <span
            className="ml-2 text-lg font-semibold md:text-2xl"
            onClick={openModal}>
            More Info
          </span>
        </button>
      </div>
    </div>
  );
};
