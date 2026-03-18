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
    <div className="flex flex-col items-center gap-5 h-auto">
      <Header />
      <Selected movie={movie} /> {/* Credits fetched dynamically inside */}
      <LikeMovie id={Number(movieId)} />
      <Footer />
    </div>
  );
}
