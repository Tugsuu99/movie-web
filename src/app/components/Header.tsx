"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [showGenres, setShowGenres] = useState(false);

  const searchMovies = async (searchValue: string) => {
    if (!searchValue) {
      setMovies([]);
      return;
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
        },
      },
    );

    const data = await response.json();
    setMovies(data.results.slice(0, 5));
  };

  useEffect(() => {
    searchMovies(query);
  }, [query]);

  const fetchGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
        },
      },
    );

    const data = await response.json();
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  return (
    <div className="w-360 h-14.75 flex items-center justify-center">
      <div className="h-9 w-7xl flex flex-row items-center justify-between">
        <img className="w-23 h-5" src="/Logo.png" alt="" />

        <div className="w-122 h-9 flex gap-3">
          <div>
            <button
              onClick={() => setShowGenres(!showGenres)}
              className="w-24.25 h-9 border rounded-md text-[#18181B]"
            >
              Genre
            </button>
            {showGenres && (
              <div className="absolute bg-white border rounded-md shadow-lg mt-2 w-[577px] h-[333px] z-50 p-5">
                <div className="h-15 w-[213px] flex flex-col gap-1 ">
                  <div className="h-8 text-2xl font-semibold">Genres</div>
                  <div className="h-7 text-[16px]">
                    See lists of movies by genre
                  </div>
                </div>
                <div className="h-[33px] w-full flex gap-2.5 pt-4 pb-4 ">
                  <div className="w-full border border-[#E4E4E7]"></div>
                </div>
                <div className="w-[537px] h-50 flex flex-wrap gap-4">
                  {genres.map((genre) => (
                    <div
                      key={genre.id}
                      onClick={() => router.push(`/genre/${genre.id}`)}
                      className=" hover:bg-gray-100 font-semibold text-[] cursor-pointer h-auto w-auto rounded-full border-[1px] pt-0.5 pr-1 pb-0.5 pl-2.5 flex items-center justify-center"
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative flex gap-2.5 border rounded-md w-[379px] h-9 items-center p-3">
            <img className="w-4 h-4" src="/search.png" alt="" />

            <input
              className="h-9 w-full text-[#71717A] outline-none"
              type="text"
              placeholder="Search.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {/* SEARCH RESULTS */}
            {movies.length > 0 && (
              <div
                className="absolute top-10 left-0
                bg-white border rounded-md shadow-lg z-50"
              >
                {movies.map((movie: any) => (
                  <div
                    key={movie.id}
                    onClick={() => router.push(`/about/${movie.id}`)}
                    className="p-2 flex flex-row gap-4 w-[553px] h-[116px] rounded-l-lg gap- hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      className="w-[67px] h-[100px] rounded-md"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="">
                      {movie.title}
                      <p className="w-[434px] h-[23px] text-[12px] font-normal">
                        ⭐{" "}
                        {typeof movie.vote_average === "number"
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}{" "}
                        / 10
                      </p>
                      <p className="text-sm text-black pt-4 font-normal text-3">
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="w-9 h-9 rounded-md border bg-white flex items-center justify-center">
          <img className="w-4 h-4" src="/moon.png" alt="" />
        </button>
      </div>
    </div>
  );
};
