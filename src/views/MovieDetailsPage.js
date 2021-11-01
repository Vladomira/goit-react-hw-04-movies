import { Route, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import * as movieFetchApi from '../services/FetchMovies';
import Loader from 'react-loader-spinner';

//
const Cast = lazy(() =>
  import('../components/Cast' /* webpackChunkName: "movie-cast" */),
);
const Reviews = lazy(() =>
  import('../components/Reviews' /* webpackChunkName: "movie-reviews" */),
);
const MovieComponent = lazy(() =>
  import(
    '../components/MovieComponent' /* webpackChunkName: "movie-reviews" */
  ),
);
export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const { url } = useRouteMatch();
  const movieId = slug.match(/[a-zA-Z0-9]+$/)[0];

  useEffect(() => {
    movieFetchApi.fetchForMovie(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };
  return (
    <>
      {movie && (
        <>
          <Suspense fallback={<Loader />} className="additional__title">
            <MovieComponent
              movie={movie}
              url={url}
              location={location}
              onGoBack={onGoBack}
            />

            <Route exact path={`${url}/cast`}>
              <Cast id={movie.id} />
            </Route>
            <Route exact path={`${url}/reviews`}>
              <Reviews id={movie.id} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
