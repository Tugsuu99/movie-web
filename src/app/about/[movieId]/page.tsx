import { Header } from "@/app/components/Header";
import { Selected } from "../category/Selected";
import { Movie } from "@/app/index";
import { LikeMovie } from "../category/moreLike";
import { Footer } from "@/app/components/Footer";

async function getMovie(movieId: string): Promise<Movie> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
    },
  });
  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  const movie = await getMovie(movieId);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Main content area */}
      <main className="flex-grow w-full flex flex-col gap-8 md:gap-16 pb-20">
        {/* The Movie Detail Hero Section */}
        <section className="w-full">
          <Selected movie={movie} />
        </section>

        {/* More Like This / Recommendations */}
        <section className="max-w-7xl mx-auto w-full px-4 md:px-8">
          <LikeMovie id={Number(movieId)} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
