import { useLocation, NavLink, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import * as movieFetchApi from '../services/FetchMovies';
import SpinLoader from '../components/Loader';
import defaultImg from '../img/netflix.jpg';
import dataNormalize from '../techBox/DataNormalize';
const Cast = lazy(() =>
  import(
    '../components/MovieDetails/Cast' /* webpackChunkName: "movie-cast" */
  ),
);
const Reviews = lazy(() =>
  import(
    '../components/MovieDetails/Reviews' /* webpackChunkName: "movie-reviews" */
  ),
);
const URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsPageView() {
  const location = useLocation();
  const history = useHistory();
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const { url } = useRouteMatch();
  const movieId = slug.match(/[a-zA-Z0-9]+$/)[0];

  useEffect(() => {
    movieFetchApi.fetchForMovie(movieId).then(setMovie);
  }, [movieId]);
  //
  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };
  return (
    <>
      {movie && (
        <>
          <Suspense fallback={<SpinLoader />}>
            <button type="button" onClick={onGoBack} className="back__btn">
              &#8592; {location?.state?.from?.label ?? 'Go back'}
            </button>
            <div className="movie-details__box">
              {movie.poster_path ? (
                <img src={`${URL}${movie.poster_path}`} alt="" />
              ) : (
                <img src={defaultImg} alt="" />
              )}

              <div className="movie-details__info">
                <h2 className="movie-details__title">
                  {movie.title}
                  {movie.release_date ? (
                    <span> ({dataNormalize(movie.release_date)})</span>
                  ) : (
                    <span> (year: ????)</span>
                  )}
                </h2>
                <p className="movie-details__desc">
                  User Score:
                  <span className="movie-details__vote">
                    {movie.vote_average * 10}%
                  </span>
                </p>
                <div className="movie-details__desc">
                  Owerview
                  <p className="movie-details__paragraph">{movie.overview}</p>
                </div>

                <ul className="genres__list">
                  Genres:
                  {movie.genres.map(el => {
                    return (
                      <li key={el.id} className="genres__item">
                        {el.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div>
              <div className="additional__box">
                <ul className="additional__list">
                  <h3 className="additional__title">Additional information:</h3>
                  <li>
                    <NavLink
                      exact
                      to={{
                        pathname: `${url}/cast`,
                        state: { from: location?.state?.from },
                      }}
                      className="additional__item"
                      activeClassName="additional__active"
                    >
                      Cast
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to={{
                        pathname: `${url}/reviews`,
                        state: { from: location?.state?.from },
                      }}
                      className="additional__item"
                      activeClassName="additional__active"
                    >
                      Reviews
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <Suspense>
              <Route exact path={`${url}/cast`}>
                <Cast id={movie.id} url={url} location={location} />
              </Route>
              <Route exact path={`${url}/reviews`}>
                <Reviews id={movie.id} location={location} />
              </Route>
            </Suspense>
          </Suspense>
        </>
      )}
    </>
  );
}

