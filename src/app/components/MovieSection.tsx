"use client";

import MovieCard from "@/app/components/MovieCard";
import { Movie } from "@/app/index";
import { ChevronRight } from "lucide-react";

type Props = {
  title: string;
  movies: Movie[];
};

const MovieSection = ({ title, movies }: Props) => {
  return (
    <section className="mt-8 md:mt-12">
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        <button className="text-sm font-medium text-gray-500 hover:text-black transition flex items-center gap-1">
          See all <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 px-4 md:px-8 no-scrollbar">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        <div className="shrink-0 w-1 md:w-4" />
      </div>
    </section>
  );
};

export default MovieSection;
