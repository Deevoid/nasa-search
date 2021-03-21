export default async function searchData(q) {
  const res = await fetch(`https://images-api.nasa.gov/search?q=${q}`);
  const search = await res.json();
  return search;
}