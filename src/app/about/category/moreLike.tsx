import { Movie } from "@/app/index";
import MovieCard from "@/app/components/MovieCard";

export const LikeMovie = async ({ id }: { id: number }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
    },
  );

  const data = await response.json();
  const movies: Movie[] = (data.results || []).slice(0, 5);

  return (
    <section className="p-[10px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">More like this</h2>
        <button className="text-sm text-black hover:text-gray-500 flex items-center gap-1">
          See more →
        </button>
      </div>

      {/* Movies */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
