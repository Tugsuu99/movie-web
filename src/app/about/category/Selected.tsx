"use client";

import * as React from "react";
import { Movie } from "@/app/index";
import Image from "next/image"; // Using standard next/image for better performance
import { useEffect, useState } from "react";
import { getMovieTrailer } from "@/app/components/Trailer";
import { Play, Star, X } from "lucide-react";

type CastMember = { id: number; name: string; character: string };
type CrewMember = { id: number; name: string; job: string };
type Credits = { cast: CastMember[]; crew: CrewMember[] };

export const Selected = ({ movie }: { movie: Movie }) => {
  const [credits, setCredits] = useState<Credits | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCredits = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
          },
        },
      );
      const data: Credits = await res.json();
      setCredits(data);
    };
    fetchCredits();
  }, [movie.id]);

  const handleWatchTrailer = async () => {
    const key = await getMovieTrailer(movie.id);
    if (!key) {
      alert("Trailer not available");
      return;
    }
    setTrailerKey(key);
    setOpen(true);
  };

  const director = credits?.crew?.find((p) => p.job === "Director");
  const writers =
    credits?.crew?.filter((p) =>
      ["Writer", "Screenplay", "Story"].includes(p.job),
    ) || [];
  const stars = credits?.cast?.slice(0, 3) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-black leading-tight">
            {movie.title}
          </h1>
          <p className="text-sm md:text-base text-gray-600 font-medium">
            {movie.release_date} • {movie.runtime ? `${movie.runtime}m` : "N/A"}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="text-right">
            <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">
              Rating
            </p>
            <p className="text-lg font-semibold flex items-center gap-1">
              <Star className="text-yellow-500 fill-yellow-500" size={18} />
              {movie.vote_average?.toFixed(1)}{" "}
              <span className="text-gray-400 text-sm">/ 10</span>
            </p>
          </div>
        </div>
      </div>

      {/* Visuals Section (Poster + Backdrop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 h-auto">
        {/* Poster - Hidden on very small screens or made smaller */}
        <div className="hidden md:block md:col-span-1">
          <img
            className="w-full h-full object-cover rounded-xl shadow-lg"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        {/* Backdrop / Trailer Section */}
        <div className="relative col-span-1 md:col-span-2 aspect-video md:aspect-auto h-full overflow-hidden rounded-xl group">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30" />

          <button
            onClick={handleWatchTrailer}
            className="absolute bottom-4 left-4 z-10 flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all"
          >
            <div className="bg-white text-black rounded-full p-2 flex items-center justify-center">
              <Play size={16} fill="currentColor" />
            </div>
            <span className="font-bold text-sm uppercase tracking-wide">
              Watch Trailer
            </span>
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8 md:mt-12">
        {/* Left Side: Genres and Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 text-xs font-bold border border-gray-200 rounded-full hover:bg-gray-100 transition cursor-default"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-base md:text-lg leading-relaxed text-gray-800">
            {movie.overview}
          </p>
        </div>

        {/* Right Side: Credits Info */}
        <div className="lg:col-span-1 border-t md:border-t-0 pt-6 md:pt-0">
          <div className="space-y-4">
            {/* Director */}
            <div className="flex flex-col border-b pb-3">
              <span className="text-xs font-bold text-gray-400 uppercase">
                Director
              </span>
              <span className="font-medium">{director?.name || "N/A"}</span>
            </div>

            {/* Writers */}
            <div className="flex flex-col border-b pb-3">
              <span className="text-xs font-bold text-gray-400 uppercase">
                Writers
              </span>
              <span className="font-medium">
                {writers.length > 0
                  ? writers.map((w) => w.name).join(", ")
                  : "N/A"}
              </span>
            </div>

            {/* Stars */}
            <div className="flex flex-col border-b pb-3">
              <span className="text-xs font-bold text-gray-400 uppercase">
                Stars
              </span>
              <span className="font-medium">
                {stars.length > 0 ? stars.map((s) => s.name).join(", ") : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Trailer Modal */}
      {open && trailerKey && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 text-white flex items-center gap-2 hover:text-red-500 transition"
            >
              <X size={32} />
            </button>
            <iframe
              className="w-full h-full rounded-xl shadow-2xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

// "use client";

// import * as React from "react";
// import { Movie } from "@/app/index";
// import Image from "next/legacy/image";
// import { useEffect, useState } from "react";
// import { getMovieTrailer } from "@/app/components/Trailer";

// type CastMember = { id: number; name: string; character: string };
// type CrewMember = { id: number; name: string; job: string };
// type Credits = { cast: CastMember[]; crew: CrewMember[] };

// export const Selected = ({ movie }: { movie: Movie }) => {
//   const [credits, setCredits] = useState<Credits | null>(null);
//   const [trailerKey, setTrailerKey] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const fetchCredits = async () => {
//       const res = await fetch(
//         `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
//           },
//         },
//       );
//       const data: Credits = await res.json();
//       setCredits(data);
//     };
//     fetchCredits();
//   }, [movie.id]);

//   const handleWatchTrailer = async () => {
//     const key = await getMovieTrailer(movie.id);
//     if (!key) {
//       alert("Trailer not available");
//       return;
//     }
//     setTrailerKey(key);
//     setOpen(true);
//   };

//   const director: CrewMember | undefined = credits?.crew?.find(
//     (p) => p.job === "Director",
//   );

//   const writers: CrewMember[] =
//     credits?.crew?.filter(
//       (p) => p.job === "Writer" || p.job === "Screenplay" || p.job === "Story",
//     ) || [];

//   const stars: CastMember[] = credits?.cast?.slice(0, 3) || [];

//   return (
//     <div className="w-[1080px] h-[800px]">
//       {/* Header */}
//       <div className="w-[1080px] h-18 flex flex-row justify-between">
//         <div className="flex flex-col">
//           <h1 className="text-black font-bold text-3xl">{movie.title}</h1>
//           <p className="text-sm text-black font-medium text-4.5">
//             {movie.release_date}
//           </p>
//         </div>
//         <div className="w-[83px] h-[64px]">
//           <p className="font-medium t-3">Rating</p>
//           <p>
//             ⭐{" "}
//             {typeof movie.vote_average === "number"
//               ? movie.vote_average.toFixed(1)
//               : "N/A"}{" "}
//             / 10
//           </p>
//         </div>
//       </div>

//       {/* Poster + Backdrop */}
//       <div className="w-[1080px] h-[428px] flex flex-row gap-8">
//         <img
//           className="w-[290px] h-[428px] rounded-md"
//           src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
//           alt={movie.title}
//         />
//         <div className="relative w-[760px] h-[428px]">
//           <Image
//             src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//             alt={movie.title}
//             width={760}
//             height={428}
//             className="bg-black/60 transition-opacity duration-500 rounded-md"
//           />

//           {/* Play Trailer button at bottom-left */}
//           <button
//             onClick={handleWatchTrailer}
//             className="absolute bottom-4 left-4 z-10 flex items-center gap-3 p-2 rounded-md transition"
//           >
//             <div className="h-[40px] w-[40px] rounded-full bg-white flex justify-center items-center text-black">
//               ▶
//             </div>
//             <span className="text-white text-[16px]">Play trailer</span>
//           </button>
//         </div>
//       </div>

//       {/* Genres, Overview, Credits (same as before) */}
//       <div className="flex flex-col gap-5 w-270 h-[271px] pt-10">
//         <div className="flex flex-row gap-3 w-auto h-5">
//           {movie.genres?.map((genre) => (
//             <span
//               key={genre.id}
//               className="text-black text-3 font-semibold leading-4 border border-solid border-[#E4E4E7] rounded-md h-5 flex justify-center items-center px-2"
//             >
//               {genre.name}
//             </span>
//           ))}
//         </div>

//         <div className="h-auto w-auto">
//           <p className="text-[16px] font-normal">{movie.overview}</p>
//         </div>

//         <div className="w-270 h-[163px] flex flex-col gap-5">
//           {/* Director */}
//           <div className="flex flex-col gap-1">
//             <div className="flex flex-row gap-[53px]">
//               <span className="font-bold w-26">Director</span>
//               <span>{director?.name || "Loading..."}</span>
//             </div>
//             <div className="w-full h-[9px] p-1">
//               <div className="border border-[#E4E4E7] w-full"></div>
//             </div>
//           </div>

//           {/* Writers */}
//           <div className="flex flex-col gap-1">
//             <div className="flex flex-row gap-[53px]">
//               <span className="font-bold  w-26">Writers</span>
//               <span>
//                 {writers.length > 0
//                   ? writers.map((w) => w.name).join(", ")
//                   : "Loading..."}
//               </span>
//             </div>
//             <div className="w-full h-[9px] p-1">
//               <div className="border border-[#E4E4E7] w-full"></div>
//             </div>
//           </div>

//           {/* Stars */}
//           <div className="flex flex-col gap-1">
//             <div className="flex flex-row gap-[53px]">
//               <span className="font-bold  w-26">Stars</span>
//               <span>
//                 {stars.length > 0
//                   ? stars.map((s) => s.name).join(", ")
//                   : "Loading..."}
//               </span>
//             </div>
//             <div className="w-full h-[9px] p-1">
//               <div className="border border-[#E4E4E7] w-full"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Trailer Modal */}
//       {open && trailerKey && (
//         <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
//           <div className="relative w-[80%] max-w-4xl">
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute -top-10 right-0 text-white text-xl"
//             >
//               X
//             </button>
//             <iframe
//               className="w-full aspect-video rounded-lg"
//               src={`https://www.youtube.com/embed/${trailerKey}`}
//               allowFullScreen
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
