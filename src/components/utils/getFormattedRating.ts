export function getFormattedRating(rating: number): number {
  if (Number.isInteger(rating)) return Math.trunc(rating);
  else return parseFloat(rating.toFixed(1));
}
