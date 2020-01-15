const S = 1000;

export function padNumber(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

export function parseTime(msTime) {
  const min = (msTime - msTime%(60*S)) / (60*S);
  const sec = ( msTime%(60*S) - msTime%S )/ S;

  return `${padNumber(min)}:${padNumber(sec)}`;
}