import { useState } from "react ";
import * as movieFetchApi from "../services/FetchMovies";

//
export default function MoviesPage() {
  const [movie, setMovie] = useState("");
  return (
    <>
      <h2>Movies</h2>
    </>
  );
}
