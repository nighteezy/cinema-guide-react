export function getTimeForMins(runtime: number | undefined): string | null {
  if (runtime) {
    let hours = Math.trunc(runtime / 60);
    let min = runtime % 60;
    return hours + ' ч ' + min + ' мин';
  } else return null;
}
