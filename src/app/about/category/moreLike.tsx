import MovieCard from "@/app/components/MovieCard";
import { ChevronRight } from "lucide-react";

export const LikeMovie = ({ movies }: { movies: any[] }) => {
  if (!movies.length) return null;

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">More like this</h2>
        <button className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-black">
          See all <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
