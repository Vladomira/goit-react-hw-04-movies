import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import * as movieFetchApi from '../services/FetchMovies';
import makeSlug from '../techBox/makeSlug';
import SpinLoader from '../components/Loader';

const HomeComponent = lazy(() =>
  import(
    '../components/HomeComponent' /* webpackChunkName: "home-component" */
  ),
);
export default function HomePageView() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const location = useLocation();
  useEffect(() => {
    movieFetchApi.fetchTrendingMovies().then(movies => {
      const data = movies.results.map(
        ({ id, title, vote_average, release_date, poster_path }) => {
          return {
            id,
            title,
            vote_average,
            release_date,
            poster_path,
          };
        },
      );
      setStatus('pending');
      return setTrendMovies(data);
    });
  }, []);
  return (
    <>
      {status === 'pending' && (
        <Suspense fallback={<SpinLoader />}>
          {/* // <Route> */}
          <HomeComponent
            trendMovies={trendMovies}
            makeSlug={makeSlug}
            location={location}
          />
          {/* // </Route> */}
        </Suspense>
      )}
    </>
  );
}
