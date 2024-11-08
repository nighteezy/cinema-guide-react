export function getFormattedRating(rating?: number): string {
  if (rating === undefined || rating === null) {
    return 'N/A';
  }

  if (Number.isInteger(rating)) {
    return String(Math.trunc(rating));
  } else {
    return rating.toFixed(1);
  }
}
