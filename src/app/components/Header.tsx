"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Moon, X, ChevronRight, LayoutGrid } from "lucide-react";

export const Header = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Search Logic ---
  const searchMovies = async (searchValue: string) => {
    if (!searchValue) {
      setMovies([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
          },
        },
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 5));
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => searchMovies(query), 300);
    return () => clearTimeout(delay);
  }, [query]);

  // --- Genre Logic ---
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}` },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between flex-row-reverse md:flex-row gap-4">
        {/* LOGO */}
        <button onClick={() => router.push("/")} className="shrink-0">
          <img
            className="w-24 h-auto cursor-pointer"
            src="/Logo.png"
            alt="logo"
          />
        </button>

        {/* DESKTOP SEARCH & GENRE (Hidden on Mobile) */}
        <div className="hidden md:flex flex-1 max-w-xl items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowGenres(!showGenres)}
              className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
            >
              <LayoutGrid size={16} /> Genre
            </button>
            {showGenres && (
              <div className="absolute top-12 left-0 bg-white border rounded-lg shadow-xl w-[500px] p-6 z-50">
                <h3 className="text-lg font-bold mb-1">Genres</h3>
                <p className="text-sm text-gray-500 mb-4 pb-4 border-b">
                  Browse movies by category
                </p>
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        router.push(`/genre/${g.id}`);
                        setShowGenres(false);
                      }}
                      className="px-3 py-1 text-sm border rounded-full hover:bg-black hover:text-white transition"
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-gray-50 focus-within:bg-white focus-within:ring-2 ring-blue-500 transition">
              <Search size={18} className="text-gray-400" />
              <input
                className="w-full bg-transparent outline-none text-sm"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {/* Desktop Search Results */}
            {movies.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-2xl z-50">
                {movies.map((movie: any) => (
                  <div
                    key={movie.id}
                    onClick={() => {
                      router.push(`/about/${movie.id}`);
                      setQuery("");
                    }}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-0"
                  >
                    <img
                      className="w-10 h-14 object-cover rounded"
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt=""
                    />
                    <div className="text-sm">
                      <p className="font-bold line-clamp-1">{movie.title}</p>
                      <p className="text-gray-500">
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LEFT CONTROLS (Mobile) / RIGHT CONTROLS (Desktop) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <Search size={22} />
          </button>

          <button className="p-2 border rounded-md hover:bg-gray-50 transition">
            <Moon size={20} />
          </button>
        </div>
      </div>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[70] overflow-y-auto p-5 flex flex-col md:hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Search</h2>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setQuery("");
              }}
              className="p-2"
            >
              <X size={28} />
            </button>
          </div>

          <div className="relative flex items-center border rounded-xl px-4 py-3 bg-gray-50 mb-8">
            <Search size={20} className="text-gray-400 mr-3" />
            <input
              autoFocus
              className="w-full bg-transparent outline-none text-lg"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Mobile Results */}
          {movies.length > 0 && (
            <div className="mb-8 space-y-4">
              {movies.map((movie: any) => (
                <div
                  key={movie.id}
                  onClick={() => {
                    router.push(`/about/${movie.id}`);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex gap-4 items-center border-b pb-4"
                >
                  <img
                    className="w-14 h-20 object-cover rounded"
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt=""
                  />
                  <div>
                    <p className="font-bold">{movie.title}</p>
                    <p className="text-sm text-gray-500">
                      ⭐ {movie.vote_average?.toFixed(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Genres */}
          <div className="mt-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Genres
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    router.push(`/genre/${g.id}`);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg text-left active:bg-gray-200 transition"
                >
                  <span className="font-medium text-sm">{g.name}</span>
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
