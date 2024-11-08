export function getRatingClass(rating: number): string {
  const ratingClass =
    rating >= 8
      ? '--gold'
      : rating >= 7
      ? '--green'
      : rating >= 5
      ? '--grey'
      : rating < 5
      ? '--red'
      : '';

  return ratingClass
    ? `movie__rating movie__rating${ratingClass}`
    : 'movie__rating--invisible';
}
