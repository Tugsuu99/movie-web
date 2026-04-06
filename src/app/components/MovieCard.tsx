"use client";

import Image from "next/image";
import { Movie } from "@/app/index";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/about/${movie.id}`)}
      className="w-[150px] md:w-[180px] shrink-0 cursor-pointer group"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 px-1">
        <div className="flex items-center gap-1 mb-1">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-gray-700">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">
          {movie.title}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
