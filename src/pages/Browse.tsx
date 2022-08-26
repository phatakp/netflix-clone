import { MovieBanner, MovieSlider } from "components";
import { useMovies } from "hooks";
import { Banner, Layout } from "layout";

export const Browse = () => {
  const [movies, likedMovies] = useMovies(undefined);

  if (movies?.length === 0) return <p>Loading...</p>;

  const index = Math.floor(Math.random() * movies?.length);
  const movie = movies[index];

  let liked;
  if (likedMovies.length > 0) liked = likedMovies.at(-1);

  return (
    <Layout>
      <Banner
        img={`${process.env.REACT_APP_MOVIE_IMAGE_ORIG_URL}${movie?.poster_path}`}
        showBanner={true}>
        <MovieBanner movie={movie} />
      </Banner>

      <MovieSlider
        rowID="popular"
        title="Top 10 Movies"
        fetchURL="/movie/popular"
      />

      <MovieSlider
        rowID="now"
        title="Trending Now"
        fetchURL="/movie/now_playing"
      />

      {likedMovies.length > 0 && (
        <MovieSlider rowID="liked" title="My Liked" liked={true} />
      )}

      <MovieSlider rowID="top" title="Top Rated" fetchURL="/movie/top_rated" />

      <MovieSlider
        rowID="upcoming"
        title="Upcoming"
        fetchURL="/movie/upcoming"
      />

      {liked && (
        <MovieSlider
          rowID="upcoming"
          title={`Because you liked ${liked.title}`}
          fetchURL={`/movie/${liked.id}/recommendations`}
        />
      )}
    </Layout>
  );
};
