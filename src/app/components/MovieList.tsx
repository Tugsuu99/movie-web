import { Movie } from "@/app/index";
import MovieCard from "./MovieCard"; // Ensure you have this component
import { ChevronRight } from "lucide-react";

interface MovieListProps {
  title: string;
  movies: Movie[];
}

export const MovieList = ({ title, movies }: MovieListProps) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="w-full py-6">
      {/* Header Container */}
      <div className="flex items-center justify-between mb-6 px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight">
          {title}
        </h2>
        <button className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-black transition group">
          See more
          <ChevronRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-[150px] md:w-[200px]">
            <MovieCard movie={movie} />
          </div>
        ))}

        <div className="flex-shrink-0 w-1 md:hidden" />
      </div>
    </section>
  );
};

export default MovieList;
