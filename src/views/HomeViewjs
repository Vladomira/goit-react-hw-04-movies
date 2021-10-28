import { useState, useEffect } from "react ";
import * as movieFetchApi from "../services/FetchMovies";
import PageHeading from "../components/PageHeading";

export default function HomePage() {
  const [trendMovie, setTrendMovie] = useState(null);
  useEffect(() => {
    movieFetchApi.fetchTrendingMovies().then(setTrendMovie);
  }, []);

  return (
    <>
      <PageHeading>Home</PageHeading>
      {/* <ul> */}
      {/* <li>{trendMovie}</li> */}
      {/* </ul> */}
    </>
  );
}
