import { fetchFromPopularMoviesDB } from "@/app/page";
import { Movie } from "@/app/index";
import MovieSection from "./MovieSection";

const MovieList = async () => {
  const upcoming: Movie[] = await fetchFromPopularMoviesDB("upcoming");
  const popular: Movie[] = await fetchFromPopularMoviesDB("popular");
  const topRated: Movie[] = await fetchFromPopularMoviesDB("top_rated");

  return (
    <div className="text-black ">
      <>
        <MovieSection title="Upcoming" movies={upcoming} />
        <MovieSection title="Popular" movies={popular} />
        <MovieSection title="Top Rated" movies={topRated} />
      </>
    </div>
  );
};

export default MovieList;
