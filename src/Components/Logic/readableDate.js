export default function readableDate(date) {
  date = new Date(date); // We reconvert it into an object
  return  (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() +
    ':' +
    (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
  );
}