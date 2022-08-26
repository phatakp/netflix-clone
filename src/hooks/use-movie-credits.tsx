import { useEffect, useState } from "react";
import { api } from "services";
import type { IMovieCredit } from "types/MovieCredits";

export const useMovieCredits = (movieID: number) => {
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<IMovieCredit | undefined>(undefined);
  let cast: string | undefined = "";
  let producer: string | undefined = "";
  let director: string | undefined = "";
  let screenplay: string | undefined = "";

  useEffect(() => {
    api.get(`/movie/${movieID}/credits`).then((response) => {
      setCredits(response.data);
    });
    setLoading(false);
  }, [movieID]);

  if (!loading) {
    cast =
      credits?.cast
        .filter((item) => item.known_for_department === "Acting")
        .sort((a, b) => b.popularity - a.popularity)
        .map((item) => item.name)
        .slice(0, 3)
        .join(", ") + ", more";

    const producers = credits?.crew
      .filter((item) => item.job === "Producer")
      .sort((a, b) => b.popularity - a.popularity)
      .map((item) => item.name);

    if (producers && producers.length > 2)
      producer = producers?.slice(0, 2).join(", ") + ", more";
    else producer = producers?.join(", ");

    const directors = credits?.crew
      .filter((item) => item.job === "Director")
      .sort((a, b) => b.popularity - a.popularity)
      .map((item) => item.name);

    if (directors && directors.length > 2)
      director = directors?.slice(0, 2).join(", ") + ", more";
    else director = directors?.join(", ");

    const screenplayer = credits?.crew
      .filter((item) => item.job === "Screenplay")
      .sort((a, b) => b.popularity - a.popularity)
      .map((item) => item.name);

    if (screenplayer && screenplayer.length > 2)
      screenplay = screenplayer?.slice(0, 2).join(", ") + ", more";
    else screenplay = screenplayer?.join(", ");
  }

  return { cast, producer, director, screenplay };
};
