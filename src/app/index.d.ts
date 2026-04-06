export type Movie = {
  id: number;
  overview: string;
  vote_count: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  original_title: string;
  title: string;
  runtime?: number;
  genres: {
    id: number;
    name: string;
  }[];
};
export type Credits = {
  cast: {
    id: number;
    name: string;
    character: string;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
  }[];
};
