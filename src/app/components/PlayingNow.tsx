"use client";

import Image from "next/image";
import { Movie } from "@/app/index";
import { getMovieTrailer } from "@/app/components/Trailer";

const PlayingNowClient = ({ movie }: { movie: Movie }) => {
  const handleWatchTrailer = async () => {
    const key = await getMovieTrailer(movie.id);

    if (!key) {
      alert("Trailer not available");
      return;
    }

    window.open(`https://www.youtube.com/watch?v=${key}`, "_blank");
  };

  return (
    <section className="relative w-full h-250 p-4">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 h-full flex items-center px-8">
        <div className="text-white max-w-xl">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-4">{movie.overview}</p>

          <button
            onClick={handleWatchTrailer}
            className="bg-white text-black px-4 py-2 rounded-md"
          >
            ▶ Watch Trailer
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlayingNowClient;
