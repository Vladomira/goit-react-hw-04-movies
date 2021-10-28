const KEY = "23824187957955af0aa1cb82b26c80b5";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchForMovies(url, config = {}) {
  const response = await fetch(url, (config = {}));
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found, sorry"));
}
//trend
//https://api.themoviedb.org/3/trending/movie/day?api_key=<<api_key>>
export function fetchTrendingMovies() {
  return fetchForMovies(`${BASE_URL}/trending/movie/week?api_key=${KEY}`);
}

//byWord
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
export function fetchByWord() {
  return fetchForMovies(
    `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false`
  );
}

//movie
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
export function fetchForMovie({ id }) {
  return fetchForMovies(`${BASE_URL}/${id}?api_key=${KEY}&language=en-US`);
}

//cast
//https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
export function fetchForMovieCast({ id }) {
  return fetchForMovies(
    `${BASE_URL}/movie/${id}/credits?api_key=${KEY}&language=en-US`
  );
}

//reviews
//https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
export function fetchForMovieReviews({ id }) {
  return fetchForMovies(
    `${BASE_URL}/movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`
  );
}
