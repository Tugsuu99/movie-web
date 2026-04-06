"use client";

import React, { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Play, X, Star } from "lucide-react";
import { getMovieTrailer } from "@/app/components/Trailer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PlayingNowCarousel = ({ movies }: { movies: any[] }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  const handleWatchTrailer = async (movieId: number) => {
    const key = await getMovieTrailer(movieId);
    if (!key) {
      alert("Trailer not available");
      return;
    }
    setTrailerKey(key);
    setOpen(true);
  };

  if (!movies?.length) return null;

  return (
    <>
      <section className="relative w-full h-[450px] md:h-[600px] overflow-hidden">
        <Carousel plugins={[plugin.current]} className="w-full h-full">
          <CarouselContent className="ml-0">
            {movies.slice(0, 10).map((movie) => (
              <CarouselItem
                key={movie.id}
                className="relative p-0 h-[450px] md:h-[600px] basis-full"
              >
                {/* Background Image */}
                <div className="absolute inset-0 -z-10">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                  <div className="text-white max-w-2xl space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black">
                      {movie.title}
                    </h1>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        <Star
                          className="text-yellow-400 fill-yellow-400"
                          size={20}
                        />
                        <span className="font-bold text-xl">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>

                      {/* This button will now work because the overlay above is 'pointer-events-none' */}
                      <button
                        onClick={() => handleWatchTrailer(movie.id)}
                        className="z-20 flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95"
                      >
                        <Play size={18} fill="currentColor" />
                        Watch Trailer
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Video Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={40} />
          </button>
          <iframe
            className="w-full max-w-5xl aspect-video rounded-xl"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            allowFullScreen
          />
        </div>
      )}
    </>
  );
};

export default PlayingNowCarousel;
