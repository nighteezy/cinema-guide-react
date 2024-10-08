export interface Genre {
  eu: string;
  ru: string;
}

export type Genres = Genre | null;

export const genres = [
  { en: 'drama', ru: 'Драма' },
  { en: 'comedy', ru: 'Комедия' },
  { en: 'crime', ru: 'Детектив' },
  { en: 'family', ru: 'Семейное' },
  { en: 'history', ru: 'Историческое' },
  { en: 'thriller', ru: 'Триллер' },
  { en: 'scifi', ru: 'Фантастика' },
  { en: 'adventure', ru: 'Приключения' },
];
