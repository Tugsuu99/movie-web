"use client";

import React, { useState } from "react";
import { Star, Play, X } from "lucide-react";
import { getMovieTrailer } from "@/app/components/Trailer";

export const Selected = ({ movie, credits }: { movie: any; credits: any }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const director = credits?.crew?.find((p: any) => p.job === "Director");
  const writers =
    credits?.crew?.filter((p: any) =>
      ["Writer", "Screenplay"].includes(p.job),
    ) || [];
  const stars = credits?.cast?.slice(0, 3) || [];

  const handleWatchTrailer = async () => {
    const key = await getMovieTrailer(movie.id);
    if (key) {
      setTrailerKey(key);
      setOpen(true);
    } else {
      alert("Trailer not available");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      {/* Title & Rating Row */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
          <p className="text-gray-500">
            {movie.release_date} • {movie.runtime}m
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-500 fill-yellow-500" />
          <span className="text-xl font-bold">
            {movie.vote_average?.toFixed(1)}
          </span>
          <span className="text-gray-400">/10</span>
        </div>
      </div>

      {/* Poster & Backdrop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="hidden md:block rounded-xl shadow-lg w-full object-cover"
          alt=""
        />
        <div className="md:col-span-2 relative aspect-video rounded-xl overflow-hidden group">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            alt=""
          />
          <div className="absolute inset-0 bg-black/20" />
          <button
            onClick={handleWatchTrailer}
            className="absolute bottom-6 left-6 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95"
          >
            <Play size={20} fill="currentColor" /> WATCH TRAILER
          </button>
        </div>
      </div>

      {/* Overview & Credits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((g: any) => (
              <span
                key={g.id}
                className="px-3 py-1 border rounded-full text-sm font-medium"
              >
                {g.name}
              </span>
            ))}
          </div>
          <p className="text-lg leading-relaxed text-gray-800">
            {movie.overview}
          </p>
        </div>

        <div className="space-y-4 border-t lg:border-t-0 pt-6 lg:pt-0">
          <div className="border-b pb-2">
            <span className="font-bold mr-4">Director</span>{" "}
            {director?.name || "N/A"}
          </div>
          <div className="border-b pb-2">
            <span className="font-bold mr-4">Writers</span>{" "}
            {writers.map((w: any) => w.name).join(", ") || "N/A"}
          </div>
          <div className="border-b pb-2">
            <span className="font-bold mr-4">Stars</span>{" "}
            {stars.map((s: any) => s.name).join(", ") || "N/A"}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 text-white"
            >
              <X size={32} />
            </button>
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
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
