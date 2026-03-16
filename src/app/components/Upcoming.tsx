import Image from "next/image";
import { fetchFromPopularMoviesDB } from "@/app/page";
import { Movie } from "@/app/index";

// export const Upcoming = () => {
//   return (
//     <div>Upcoming</div>
//   )
// }

const Upcoming = async () => {
  return (
    <div className="w-359.25 h-244.5 flex pr-20 pl-20 gap-8">
      <div className="w-319.25 h-9 flex justify-between">
        <div>Upcoming</div>
        <div>See more</div>
      </div>
      <div className="w-319.25 h-227.5"></div>
    </div>
  );
};
