export const getMovieTrailer = async (movieId: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  console.log("TMDB videos:", data.results);

  if (!data.results || data.results.length === 0) return null;

  // 1️⃣ Official YouTube Trailer
  let trailer =
    data.results.find(
      (v: any) => v.site === "YouTube" && v.type === "Trailer"
    ) ||
    // 2️⃣ Teaser fallback
    data.results.find(
      (v: any) => v.site === "YouTube" && v.type === "Teaser"
    ) ||
    // 3️⃣ Any YouTube video
    data.results.find((v: any) => v.site === "YouTube");

  console.log("Selected trailer:", trailer);
  return trailer?.key || null;
};
