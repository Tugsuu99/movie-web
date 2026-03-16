"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import MovieCard from "@/app/components/MovieCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function GenrePage() {
  const { id } = useParams();

  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const fetchGenres = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
        },
      },
    );

    const data = await res.json();
    setGenres(data.genres);
  };

  const fetchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${id}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
        },
      },
    );

    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [id, page]);

  return (
    <div className="bg-white min-h-screen w-full flex flex-col">
      <Header />

      <div className="max-w-7xl mx-auto flex gap-10 mt-10">
        {/* LEFT GENRE FILTER */}
        <div className="w-[250px]">
          <h2 className="text-xl font-semibold">Search filter</h2>

          <div className="mt-6">
            <h3 className="font-medium">Genres</h3>
            <p className="text-sm text-gray-500">
              See lists of movies by genre
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {genres.map((genre) => (
                <a
                  key={genre.id}
                  href={`/genre/${genre.id}`}
                  className={`px-3 py-1 border rounded-full text-sm hover:bg-gray-100 ${
                    Number(id) === genre.id ? "bg-black text-white" : ""
                  }`}
                >
                  {genre.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* MOVIE LIST */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-6">Movies</h2>

          <div className="grid grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-center gap-2 mt-10 text-sm">
            {/* Previous */}
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              ← Previous
            </button>

            {/* Page 1 */}
            <button
              onClick={() => setPage(1)}
              className={`px-3 py-1 rounded-md ${page === 1 ? "border bg-gray-100" : "hover:bg-gray-100"}`}
            >
              1
            </button>

            {/* Page 2 */}
            <button
              onClick={() => setPage(2)}
              className={`px-3 py-1 rounded-md ${page === 2 ? "border bg-gray-100" : "hover:bg-gray-100"}`}
            >
              2
            </button>

            {/* Page 3 */}
            <button
              onClick={() => setPage(3)}
              className={`px-3 py-1 rounded-md ${page === 3 ? "border bg-gray-100" : "hover:bg-gray-100"}`}
            >
              3
            </button>

            {/* Dots */}
            <span className="px-2">...</span>

            {/* Last Page */}
            <button
              onClick={() => setPage(7)}
              className={`px-3 py-1 rounded-md ${page === 7 ? "border bg-gray-100" : "hover:bg-gray-100"}`}
            >
              7
            </button>

            {/* Next */}
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
