"use client";

import { Header } from "@/app/components/Header";
import MovieList from "@/app/components/MovieList";
import { Footer } from "@/app/components/Footer";
import PlayingNowCarousel from "@/app/components/Co-carousel";

// Separated the data fetching logic for clarity
export const fetchFromPopularMoviesDB = async (category: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
    },
  );
  const data = await response.json();
  return data.results;
};

export default function Home() {
  return (
    // Changed to a standard block layout to let children handle their own padding/widths
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header stays sticky at the top */}
      <Header />

      {/* Main content wrapper */}
      <main className="flex-grow w-full">
        {/* Full-width Carousel */}
        <section className="w-full">
          <PlayingNowCarousel />
        </section>

        {/* Movie List with responsive horizontal padding */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <MovieList />
        </section>
      </main>

      <Footer />
    </div>
  );
}
