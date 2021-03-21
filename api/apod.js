export default async function getApod() {
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
  const apod = await res.json();
  return apod;
}