import { Header } from "@/app/components/Header";
import { Selected } from "../category/Selected";
import { LikeMovie } from "../category/moreLike";
import { Footer } from "@/app/components/Footer";

async function getMovieData(movieId: string, endpoint: string = "") {
  const url = `https://api.themoviedb.org/3/movie/${movieId}${endpoint ? `/${endpoint}` : ""}?language=en-US`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;

  const [movie, credits, similar] = await Promise.all([
    getMovieData(movieId),
    getMovieData(movieId, "credits"),
    getMovieData(movieId, "similar"),
  ]);

  if (!movie) return <div className="text-center py-20">Movie not found</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col gap-10">
        <Selected movie={movie} credits={credits} />

        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
          <LikeMovie movies={similar?.results?.slice(0, 10) || []} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
