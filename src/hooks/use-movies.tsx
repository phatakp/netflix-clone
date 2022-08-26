import { useAuth } from "context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { api } from "services";
import { getMovies } from "services/getMovies";
import type { IMovie } from "types/Movie";
import { db } from "../firebase";

export const useMovies = (fetchURL: string | undefined) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [likedMovies, setLikedMovies] = useState<IMovie[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (fetchURL) {
      api.get(fetchURL).then((response) => {
        setMovies(response.data.results);
      });
    } else {
      (async () => {
        const data = await getMovies();
        setMovies(data);
      })();
    }
  }, [fetchURL]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setLikedMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  return [movies, likedMovies] as const;
};
