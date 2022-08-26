import { useEffect, useState } from "react";
import { api } from "services";
import { IMovieDetail } from "types/MovieDetail";

export const useMovieDetail = (movieID: number) => {
  const [movie, setMovie] = useState<IMovieDetail>();

  useEffect(() => {
    api.get(`/movie/${movieID}`).then((response) => {
      setMovie(response.data);
    });
  }, [movieID]);

  return movie;
};
