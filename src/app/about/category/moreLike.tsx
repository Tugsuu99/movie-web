import { Movie } from "@/app/index";
import MovieCard from "@/app/components/MovieCard";
import { ChevronRight } from "lucide-react";

export const LikeMovie = async ({ id }: { id: number }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
      next: { revalidate: 3600 }, // Optional: Cache for 1 hour
    },
  );

  const data = await response.json();
  // Increased slice to 10 for better horizontal scrolling experience
  const movies: Movie[] = (data.results || []).slice(0, 10);

  if (movies.length === 0) return null;

  return (
    <section className="mt-12 mb-10 w-full">
      {/* Header - Aligns with the rest of your site's container */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight">
          More like this
        </h2>
        <button className="text-sm font-semibold text-gray-500 hover:text-black transition flex items-center gap-1 group">
          See all
          <ChevronRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Movies Row: Horizontal Scroll */}
      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {/* Spacer to maintain padding at the end of the scroll */}
        <div className="shrink-0 w-4 md:hidden" />
      </div>
    </section>
  );
};
