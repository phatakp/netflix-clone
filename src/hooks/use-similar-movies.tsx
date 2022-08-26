import { useEffect, useState } from "react";
import { api } from "services";
import { IMovie } from "types";

export const useSimilarMovies = (movieID: number) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    api.get(`/movie/${movieID}/similar`).then((response) => {
      setMovies(response.data.results);
    });
  }, [movieID]);

  return movies?.slice(0, 2);
};
