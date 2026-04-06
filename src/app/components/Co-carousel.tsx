"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Play, X, Star } from "lucide-react"; // Using icons for a cleaner look

import { fetchFromPopularMoviesDB } from "@/app/page";
import { Movie } from "@/app/index";
import { getMovieTrailer } from "@/app/components/Trailer";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PlayingNowCarousel = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [trailerKey, setTrailerKey] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

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

  React.useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchFromPopularMoviesDB("now_playing");
      setMovies(data);
    };
    loadMovies();
  }, []);

  if (!movies.length) {
    return (
      <section className="h-[400px] md:h-[600px] flex items-center justify-center bg-black">
        <div className="animate-pulse text-gray-400">
          Loading blockbusters...
        </div>
      </section>
    );
  }

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
                {/* Background Image - responsive object-fit */}
                <div className="absolute inset-0 -z-10">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover object-center md:object-[center_20%]"
                  />
                  {/* Gradient Overlay: Darker at bottom for mobile readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-black/50" />
                </div>

                {/* Content Container */}
                <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex items-end md:items-center pb-12 md:pb-0">
                  <div className="text-white max-w-2xl space-y-3 md:space-y-5">
                    <div className="inline-block px-3 py-1 rounded-full bg-red-600 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      Now Playing
                    </div>

                    <h1 className="text-3xl md:text-6xl font-black leading-tight drop-shadow-lg">
                      {movie.title}
                    </h1>

                    <p className="text-sm md:text-lg text-gray-200 line-clamp-2 md:line-clamp-3 max-w-lg font-light">
                      {movie.overview}
                    </p>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5">
                        <Star
                          className="text-yellow-400 fill-yellow-400"
                          size={20}
                        />
                        <span className="font-bold md:text-xl">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleWatchTrailer(movie.id)}
                        className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm md:text-base hover:bg-red-600 hover:text-white transition-all active:scale-95"
                      >
                        <Play size={18} className="fill-current" />
                        Watch Trailer
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows - hidden on small mobile screens to prevent clutter */}
          <div className="hidden sm:block">
            <CarouselPrevious className="left-4 bg-white/20 border-none text-white hover:bg-white/40" />
            <CarouselNext className="right-4 bg-white/20 border-none text-white hover:bg-white/40" />
          </div>
        </Carousel>
      </section>

      {/* Video Modal */}
      {open && trailerKey && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-red-500 transition"
          >
            <X size={40} />
          </button>
          <div className="w-full max-w-5xl aspect-video shadow-2xl">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PlayingNowCarousel;
