export function msToTime(msTime) {
  const min = (msTime - msTime%(60*S)) / 60*S;
  const sec = ( msTime%(60*S) - msTime%S )/ S;
  const mil = msTime % S;

  return { min, sec, mil };
}