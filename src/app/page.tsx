import { Header } from "@/app/components/Header";
import PlayingNowCarousel from "@/app/components/Co-carousel";
import MovieList from "@/app/components/MovieList";
import { Footer } from "@/app/components/Footer";

// Your shared fetch function
export async function fetchFromPopularMoviesDB(endpoint: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
      next: { revalidate: 3600 },
    },
  );
  const data = await res.json();
  return data.results || [];
}

export default async function Page() {
  // Fetch everything on the server
  const [upcoming, popular, topRated, nowPlaying] = await Promise.all([
    fetchFromPopularMoviesDB("upcoming"),
    fetchFromPopularMoviesDB("popular"),
    fetchFromPopularMoviesDB("top_rated"),
    fetchFromPopularMoviesDB("now_playing"),
  ]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <PlayingNowCarousel movies={nowPlaying} />

      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col gap-10 mt-10">
        {/* No errors now because MovieList is expecting these props! */}
        <MovieList title="Upcoming" movies={upcoming} />
        <MovieList title="Popular" movies={popular} />
        <MovieList title="Top Rated" movies={topRated} />
      </main>

      <Footer />
    </div>
  );
}

// {
// import { Header } from "@/app/components/Header";
// import MovieList from "@/app/components/MovieList";
// import { Footer } from "@/app/components/Footer";
// import PlayingNowCarousel from "@/app/components/Co-carousel";}
