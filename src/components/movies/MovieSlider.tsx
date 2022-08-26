import { useMovies } from "hooks";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import MovieItem from "./MovieItem";

type MovieSliderProps = {
  title: string;
  fetchURL?: string;
  liked?: boolean;
  rowID: string;
};

export const MovieSlider = ({
  title,
  fetchURL,
  liked,
  rowID,
}: MovieSliderProps) => {
  const [movies, likedMovies] = useMovies(fetchURL);

  //   Fetch 10 random movies for Popular only
  const sample =
    rowID === "popular"
      ? movies
          .map((x) => ({ x, r: Math.random() }))
          .sort((a, b) => a.r - b.r)
          .map((a) => a.x)
          .slice(0, 10)
      : liked
      ? [...likedMovies]
      : [...movies];

  if (sample.length === 0) return null;

  const slide = (direction: "left" | "right") => {
    const slider = document.getElementById("slider" + rowID);
    const slideWidth = rowID === "popular" ? 316 : 300;
    if (direction === "left") {
      slider!.scrollLeft = slider!.scrollLeft - slideWidth;
    } else {
      slider!.scrollLeft = slider!.scrollLeft + slideWidth;
    }
  };

  return (
    <div className="px-10 my-2">
      <h2 className="p-4 font-bold text-white md:text-3xl">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide("left")}
          className="absolute left-0 z-10 hidden text-black bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowID}
          className="relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {sample?.map((item, index) => (
            <MovieItem
              key={item.id}
              item={item}
              index={index + 1}
              showNumber={rowID === "popular"}
            />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide("right")}
          className="absolute right-0 z-10 hidden text-black bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
};
