"use client";

import MovieCard from "@/app/components/MovieCard";
import { Movie } from "@/app/index";

type Props = {
  title: string;
  movies: Movie[];
};

const MovieSection = ({ title, movies }: Props) => {
  return (
    <section className="px-20 mt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-sm text-black hover:text-gray-500 flex items-center gap-1">
          See more →
        </button>
      </div>

      {/* Movie Row */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
