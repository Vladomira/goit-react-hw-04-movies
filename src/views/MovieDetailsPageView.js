import { useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import * as movieFetchApi from '../services/FetchMovies';
import SpinLoader from '../components/Loader';

// const Cast = lazy(() =>
//   import('../components/Cast' /* webpackChunkName: "movie-cast" */),
// );
// const Reviews = lazy(() =>
//   import('../components/Reviews' /* webpackChunkName: "movie-reviews" */),
// );
const MovieComponent = lazy(() =>
  import(
    '../components/MovieDetails/MovieComponent' /* webpackChunkName: "movie-reviews" */
  ),
);
export default function MovieDetailsPageView() {
  const location = useLocation();
  const history = useHistory();
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const { url } = useRouteMatch();
  const movieId = slug.match(/[a-zA-Z0-9]+$/)[0];
  //
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
          <Suspense fallback={<SpinLoader />}>
            <MovieComponent
              movie={movie}
              url={url}
              location={location}
              onGoBack={onGoBack}
            />
            {/* <NavLink
              exact
              to={`${url}/cast`}
              className="additional__item"
              activeClassName="additional__active"
            >
              Cast
            </NavLink>
            <NavLink
              exact
              to={`${url}/reviews`}
              className="additional__item"
              activeClassName="additional__active"
            >
              Reviews
            </NavLink>
            <Route exact path={`${url}/cast`}>
              <Cast id={movie.id} url={url} location={location} />
            </Route>
            <Route exact path={`${url}/reviews`}>
              <Reviews id={movie.id} />
            </Route> */}
          </Suspense>
        </>
      )}
    </>
  );
}
