import { Route, NavLink } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import defaultImg from '../../img/netflix.jpg';
import dataNormalize from '../../techBox/DataNormalize';
const URL = 'https://image.tmdb.org/t/p/w500';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "movie-cast" */));
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "movie-reviews" */),
);

function MovieRender({ movie, url, onGoBack, location }) {
  return (
    <>
      <button type="button" onClick={onGoBack} className="back__btn">
        &#8592; {location?.state?.from?.label ?? 'To trending movies'}
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
                to={`${url}/cast`}
                className="additional__item"
                activeClassName="additional__active"
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to={`${url}/reviews`}
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
          <Reviews id={movie.id} />
        </Route>
      </Suspense>
    </>
  );
}
MovieRender.propTypes = {
  url: PropTypes.string.isRequired,
  onGoBack: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.object),
  }),
};
export default MovieRender;
// style={{
//   backgroundImage: `url("${URL}${movie.poster_path}")`,
// }}
