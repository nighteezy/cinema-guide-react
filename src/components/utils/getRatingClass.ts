export function getRatingClass(rating: number): string {
  switch (true) {
    case rating >= 8:
      return '--gold';
    case rating >= 7:
      return '--green';
    case rating >= 5:
      return '--grey';
    case rating < 5:
      return '--red';
    default:
      return 'movie__rating';
  }
}
