import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import generateVote from '../techBox/VoteAverage';
import defaultImg from '../img/netflix.jpg';

export default function HomeComponent({ trendMovies, makeSlug, location }) {
  return (
    <>
      <ul className="movie-list">
        {trendMovies.map(movie => {
          return (
            <li key={movie.id} className="movie-list__item">
              <Link
                to={{
                  pathname: `movies/${makeSlug(`${movie.title} ${movie.id}`)}`,
                  state: { from: { location, label: 'To home page' } },
                }}
                className="movie-list__title"
              >
                {movie.title}
              </Link>
              <div className="movie-list__desc--box">
                <span className="movie-list__desc">
                  Vote: {generateVote(movie)}
                </span>
                <span className="movie-list__desc">
                  Year: {Number(movie.release_date.slice(0, 4))}
                </span>
              </div>
              {/* <div className="movie-list__thumb"> */}
              {movie.poster_path ? (
                <img
                  className="movie-list__img"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
              ) : (
                <img className="movie-list__img" src={defaultImg} alt="" />
              )}

              {/* </div> */}
            </li>
          );
        })}
      </ul>
    </>
  );
}
HomeComponent.propTypes = {
  trendMovies: PropTypes.arrayOf(
    PropTypes.shape({
      release_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
    }),
  ),
  makeSlug: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
