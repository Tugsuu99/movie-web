import { fetchFromPopularMoviesDB } from "@/app/page";
import { Movie } from "@/app/index";
import MovieSection from "./MovieSection";

const MovieList = async () => {
  const [upcoming, popular, topRated] = await Promise.all([
    fetchFromPopularMoviesDB("upcoming"),
    fetchFromPopularMoviesDB("popular"),
    fetchFromPopularMoviesDB("top_rated"),
  ]);

  return (
    <div className="pb-20">
      <MovieSection title="Upcoming" movies={upcoming} />
      <MovieSection title="Popular" movies={popular} />
      <MovieSection title="Top Rated" movies={topRated} />
    </div>
  );
};

export default MovieList;
