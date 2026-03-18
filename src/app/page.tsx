import MovieCard from "@/app/components/MovieCard";
import Image from "next/image";
import { Header } from "@/app/components/Header";
import PlayingNow from "@/app/components/PlayingNow";
import MovieList from "@/app/components/MovieList";
import { Footer } from "@/app/components/Footer";
import PlayingNowCarousel from "@/app/components/Co-carousel";

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
    <div className="bg-white  min-h-screen flex flex-col items-center ">
      <Header />

      <PlayingNowCarousel />
      <MovieList />
      <Footer />
    </div>
  );
}
