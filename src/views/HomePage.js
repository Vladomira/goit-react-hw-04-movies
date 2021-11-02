import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import * as movieFetchApi from '../services/FetchMovies';
import makeSlug from '../techBox/makeSlug';
import Loader from 'react-loader-spinner';
import PageHeading from '../components/PageHeading';

const HomeComponent = lazy(() =>
  import(
    '../components/HomeComponent' /* webpackChunkName: "home-component" */
  ),
);
export default function HomePage() {
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
      <PageHeading text="Trending movies" />
      {status === 'pending' && (
        <Suspense fallback={<Loader />} className="additional__title">
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
