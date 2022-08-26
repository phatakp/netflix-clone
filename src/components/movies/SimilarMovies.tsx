import { useSimilarMovies } from "hooks";
import { truncateChars } from "utilties/truncate";
import LikeMovie from "./LikeMovie";

const SimilarMovies = ({ movieId }: { movieId: number }) => {
  const movies = useSimilarMovies(movieId);

  return (
    <>
      <h1 className="my-8 text-3xl font-semibold">More Like this</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="relative flex flex-col w-full border-0 shadow-lg outline-none focus:outline-none bg-slate-200">
            <div className="relative w-full ">
              <img
                className="z-0 float-left object-cover w-full"
                src={`${process.env.REACT_APP_MOVIE_IMAGE_CROP_URL}${movie?.backdrop_path}`}
                alt={movie?.title}
              />
              <div className="absolute z-40 cursor-pointer left-4 bottom-4">
                <div className="font-bold text-center uppercase whitespace-normal text-slate-200 md:text-3xl mix-blend-difference">
                  {movie?.title}
                </div>
              </div>
              <div className="absolute inset-0 z-10 bg-black opacity-40"></div>
            </div>
            <div className="relative flex-auto p-6 bg-black/90">
              <div className="flex flex-col items-start gap-4">
                <div className="inline-flex items-center">
                  <div className="px-1 mr-2 border border-slate-50">
                    {movie?.adult ? "A" : "U/A 13+"}
                  </div>
                  <span className="mr-4">
                    {new Date(movie?.release_date).getFullYear()}
                  </span>
                  <LikeMovie movie={movie} />
                </div>

                <div className="whitespace-normal text-slate-200">
                  {truncateChars(movie?.overview, 200)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SimilarMovies;
