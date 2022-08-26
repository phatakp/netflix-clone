import { useDimensions, useModal } from "hooks";
import { FaStar } from "react-icons/fa";
import { IMovie } from "types";
import NumberSvg from "./NumberSvg";

const MovieItem = ({
  item,
  index,
  showNumber,
}: {
  item: IMovie;
  index: number;
  showNumber: boolean;
}) => {
  const { modal, openModal } = useModal(item?.id);
  const { width } = useDimensions();

  const svgHeight = getSvgHeight(width);
  const svgWidth = svgHeight * 0.85;

  const numberElement = showNumber ? (
    <NumberSvg value={index} width={svgWidth} height={svgHeight} />
  ) : null;

  return (
    <>
      {modal}
      <div
        className="relative inline-flex mr-3 shadow cursor-pointer rounded-xl "
        onClick={openModal}>
        <div
          className={` relative inline-flex max-w-[150px] xs:max-w-[200px] md:max-w-[230px] h-[${svgHeight}px]`}>
          {numberElement}
          <img
            className={`object-cover w-full my-4`}
            src={`${process.env.REACT_APP_MOVIE_IMAGE_CROP_URL}${item?.backdrop_path}`}
            alt={item?.title}
          />
        </div>
        <div className="absolute inset-0 overflow-hidden text-white opacity-0 hover:bg-black/70 hover:opacity-100">
          <p className="absolute left-0 inline-flex items-center text-xl top-4">
            <FaStar className="mx-2 text-yellow-500" />
            {item?.vote_average.toFixed(1)}
          </p>
          <p className="absolute bottom-0 text-sm font-bold left-2 white-space-normal md:text-lg lg:text-xl">
            {item?.title}
          </p>
        </div>
      </div>
    </>
  );
};

function getSvgHeight(width: number) {
  let svgHeight = 207;

  if (width < 500) {
    svgHeight = Math.floor(width * 0.33);
  } else if (width < 800) {
    svgHeight = Math.floor(width * 0.21);
  } else if (width < 1100) {
    svgHeight = Math.floor(width * 0.16);
  } else if (width < 1400) {
    svgHeight = Math.floor(width * 0.13);
  }
  return svgHeight;
}

export default MovieItem;
