import { useMovieCredits, useMovieDetail } from "hooks";
import React, { useEffect } from "react";
import { FaPlay, FaStar, FaTimes } from "react-icons/fa";
import { truncateChars } from "utilties/truncate";
import LikeMovie from "./LikeMovie";

interface MovieModalProps {
  showModal: boolean;
  closeModal: () => void;
  movieID: number;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function MovieModal({
  showModal,
  closeModal,
  movieID,
}: MovieModalProps) {
  const movie = useMovieDetail(movieID);
  const { cast, producer, director, screenplay } = useMovieCredits(movieID);

  useEffect(() => {
    const root = document.getElementById("root") as HTMLElement;
    if (showModal) root.style.overflow = "hidden";
    else root.style.overflow = "";
  }, [showModal]);

  if (!movie) return null;

  const movieYear = new Date(movie?.release_date).getFullYear();
  const newMovie = dateDiffInDays(new Date(movie?.release_date)) <= 90;

  const credits = [
    { title: "Cast:", value: cast },
    {
      title: "Genre:",
      value: movie.genres.map((item) => item.name).join(", "),
    },
    { title: "Producer:", value: producer },
    { title: "Director:", value: director },
    { title: "Screenplay:", value: screenplay },
  ];

  if (!showModal) return null;

  return (
    <React.Fragment>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-full mx-3 my-6 md:mx-36 xl:mx-80">
          {/*content*/}
          <div className="relative flex flex-col w-full border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex flex-col w-full border-0 shadow-lg outline-none focus:outline-none">
              <div className="relative w-full ">
                <img
                  className="z-0 float-left object-cover w-full"
                  src={`${process.env.REACT_APP_MOVIE_IMAGE_ORIG_URL}${movie?.backdrop_path}`}
                  alt={movie?.title}
                />
                <button
                  className="absolute z-50 grid w-12 h-12 text-xl font-bold text-white transition-all duration-150 ease-linear bg-black rounded-full outline-none top-4 right-4 place-content-center hover:bg-black/80 focus:outline-none"
                  type="button"
                  onClick={closeModal}>
                  <FaTimes />
                </button>
                <div className="absolute z-40 cursor-pointer top-1/2 left-4">
                  <div className="text-2xl font-extrabold text-center uppercase whitespace-normal text-slate-200 md:text-5xl mix-blend-difference font-">
                    {movie?.title}
                  </div>
                  <div className="inline-flex items-center mt-4">
                    <button className="z-50 inline-flex items-center p-2 mr-4 text-gray-800 rounded md:px-8 bg-slate-300 hover:bg-slate-300/80">
                      <FaPlay />
                      <span className="ml-2 text-lg font-semibold md:text-2xl">
                        Play
                      </span>
                    </button>
                    <LikeMovie movie={movie} />
                  </div>
                </div>
                <div className="absolute inset-0 z-10 bg-black opacity-40"></div>
              </div>
              <div className="relative flex-auto p-6 bg-black/90">
                <div className="flex flex-col items-start gap-4 md:gap-8 sm:flex-row">
                  <div className="flex flex-col items-start sm:w-2/3">
                    <div className="inline-flex items-center">
                      {newMovie && (
                        <span className="mr-2 font-semibold text-green-600">
                          New
                        </span>
                      )}
                      <span className="mr-4">{movieYear}</span>
                      <div className="px-1 mr-2 border border-slate-50">
                        {movie?.adult ? "A" : "U/A 13+"}
                      </div>
                      <span>{runTime(movie?.runtime)}</span>
                    </div>
                    <p className="flex items-center my-4 ">
                      <span className="mr-2 text-sm text-gray-500">
                        Release Date:
                      </span>
                      <span className="text-sm">
                        {new Date(movie.release_date).toDateString()}
                      </span>
                      <FaStar className="mx-2 text-xl text-yellow-500" />
                      <span>{movie?.vote_average.toFixed(1)}</span>
                    </p>
                    <div className="whitespace-normal text-slate-200">
                      {truncateChars(movie?.overview, 450)}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-4 sm:w-1/3">
                    {credits.map((item) => (
                      <p key={item.title} className="whitespace-normal">
                        <span className="text-sm text-gray-500">
                          {item.title}
                        </span>
                        <span className="ml-2 text-slate-300">
                          {item.value === "" ? "N/A" : item.value}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
                {/* <SimilarMovies movieId={movie?.id} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </React.Fragment>
  );
}

function dateDiffInDays(a: Date) {
  // Discard the time and time-zone information.
  const b = new Date();
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

function runTime(a: number) {
  const hours = Math.floor(a / 60);
  const minutes = a % 60;
  return `${hours}hr ${minutes}m`;
}
