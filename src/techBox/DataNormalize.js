export default function dataNormalize(data) {
  const result = Number(data.release_date.slice(0, 4));
  return result;
}
