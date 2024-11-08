export interface Film {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  releaseDate: Date;
  genres: string[];
  plot: string;
  runtime: number;
  budget: string;
  revenue: string;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYoutubeId: string;
  tmdbRating: number;
  searchL: string;
  keywortds: string[];
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string;
  production: string;
  awardsSummary: string;
}

export type Movies = Film[];
export type Movie = Film | null;
