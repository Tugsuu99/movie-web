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
//           <button className="absolute inset-0 flex items-baseline-last justify-baseline z-10 p-[24px]">
//             <div className="flex flex-row items-center gap-3">
//               <div className="h-[40px] w-[40px] rounded-3xl bg-white flex justify-center items-center text-black">
//                 ▶
//               </div>
//               <span className="text-white text-[16px]">Play trailer</span>
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Genres, overview, credits */}
//       <div className="flex flex-col gap-5 w-270 h-[271px] pt-10">
//         {/* Genres */}
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

//         {/* Overview */}
//         <div className="h-auto w-auto">
//           <p className="text-[16px] font-normal">{movie.overview}</p>
//         </div>

//         {/* Director, Writers, Stars */}
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
//     </div>
//   );
// };

"use client";

import * as React from "react";
import { Movie } from "@/app/index";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { getMovieTrailer } from "@/app/components/Trailer";

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
            "Content-Type": "application/json",
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

  const director: CrewMember | undefined = credits?.crew?.find(
    (p) => p.job === "Director",
  );

  const writers: CrewMember[] =
    credits?.crew?.filter(
      (p) => p.job === "Writer" || p.job === "Screenplay" || p.job === "Story",
    ) || [];

  const stars: CastMember[] = credits?.cast?.slice(0, 3) || [];

  return (
    <div className="w-[1080px] h-[800px]">
      {/* Header */}
      <div className="w-[1080px] h-18 flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-black font-bold text-3xl">{movie.title}</h1>
          <p className="text-sm text-black font-medium text-4.5">
            {movie.release_date}
          </p>
        </div>
        <div className="w-[83px] h-[64px]">
          <p className="font-medium t-3">Rating</p>
          <p>
            ⭐{" "}
            {typeof movie.vote_average === "number"
              ? movie.vote_average.toFixed(1)
              : "N/A"}{" "}
            / 10
          </p>
        </div>
      </div>

      {/* Poster + Backdrop */}
      <div className="w-[1080px] h-[428px] flex flex-row gap-8">
        <img
          className="w-[290px] h-[428px] rounded-md"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="relative w-[760px] h-[428px]">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            width={760}
            height={428}
            className="bg-black/60 transition-opacity duration-500 rounded-md"
          />

          {/* Play Trailer button at bottom-left */}
          <button
            onClick={handleWatchTrailer}
            className="absolute bottom-4 left-4 z-10 flex items-center gap-3 p-2 rounded-md transition"
          >
            <div className="h-[40px] w-[40px] rounded-full bg-white flex justify-center items-center text-black">
              ▶
            </div>
            <span className="text-white text-[16px]">Play trailer</span>
          </button>
        </div>
      </div>

      {/* Genres, Overview, Credits (same as before) */}
      <div className="flex flex-col gap-5 w-270 h-[271px] pt-10">
        <div className="flex flex-row gap-3 w-auto h-5">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="text-black text-3 font-semibold leading-4 border border-solid border-[#E4E4E7] rounded-md h-5 flex justify-center items-center px-2"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <div className="h-auto w-auto">
          <p className="text-[16px] font-normal">{movie.overview}</p>
        </div>

        <div className="w-270 h-[163px] flex flex-col gap-5">
          {/* Director */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-[53px]">
              <span className="font-bold w-26">Director</span>
              <span>{director?.name || "Loading..."}</span>
            </div>
            <div className="w-full h-[9px] p-1">
              <div className="border border-[#E4E4E7] w-full"></div>
            </div>
          </div>

          {/* Writers */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-[53px]">
              <span className="font-bold  w-26">Writers</span>
              <span>
                {writers.length > 0
                  ? writers.map((w) => w.name).join(", ")
                  : "Loading..."}
              </span>
            </div>
            <div className="w-full h-[9px] p-1">
              <div className="border border-[#E4E4E7] w-full"></div>
            </div>
          </div>

          {/* Stars */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-[53px]">
              <span className="font-bold  w-26">Stars</span>
              <span>
                {stars.length > 0
                  ? stars.map((s) => s.name).join(", ")
                  : "Loading..."}
              </span>
            </div>
            <div className="w-full h-[9px] p-1">
              <div className="border border-[#E4E4E7] w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Trailer Modal */}
      {open && trailerKey && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-[80%] max-w-4xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              X
            </button>
            <iframe
              className="w-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};
