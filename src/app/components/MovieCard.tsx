"use client";

import Image from "next/image";
import { Movie } from "@/app/index";
import { useRouter } from "next/navigation";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/about/${movie.id}`)}
      className="w-45 shrink-0 cursor-pointer"
    >
      <div className="w-45 shrink-0 ">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={180}
          height={270}
          className="rounded-xl hover:scale-105 transition-all duration-300"
        />

        <div className="mt-2 ">
          <p className="text-sm text-black font-medium line-clamp-1">
            {movie.title}
          </p>
          <p className="text-xs text-black flex items-center gap-1">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
