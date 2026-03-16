"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

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
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  const [trailerKey, setTrailerKey] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleWatchTrailer = async (movieId: number) => {
    const key = await getMovieTrailer(movieId);
    setTrailerKey(key);
    setOpen(true);

    if (!key) {
      alert("Trailer not available");
      return;
    }
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
      <section className="h-150 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </section>
    );
  }

  return (
    <>
      <section className="relative w-full h-150">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full h-full"
        >
          <CarouselContent>
            {movies.slice(0, 20).map((movie) => {
              return (
                <CarouselItem key={movie.id} className="relative h-150 group">
                  {/* Background Image */}

                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="absolute -z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/75" />

                  {/* Content */}
                  <div className="relative max-w-6xl mx-auto px-8 h-full flex items-center">
                    <div
                      className="text-white max-w-xl
                    translate-y-6 opacity-0
                    group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-500"
                    >
                      <p className="text-sm mb-2">Now Playing</p>

                      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

                      <p className="text-sm mb-4 line-clamp-3">
                        {movie.overview}
                      </p>

                      <div className="flex items-center gap-4">
                        <span className="text-yellow-400">
                          ⭐ {movie.vote_average.toFixed(1)}
                        </span>

                        <button
                          onClick={() => handleWatchTrailer(movie.id)}
                          className="bg-white text-black px-4 py-2 rounded-md font-medium
                     flex items-center gap-2
                     hover:bg-black hover:text-white
                     transition-all duration-300
                     hover:scale-105"
                        >
                          ▶ Watch Trailer
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      {open && trailerKey && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className=" relative w-[80%] max-w-4xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              X
            </button>
            <iframe
              className="w-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PlayingNowCarousel;
