import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import generateVote from '../techBox/VoteAverage';
import defaultImg from '../img/netflix.jpg';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export default function MovieList({ entriesMovie, url, makeSlug, location }) {
  // console.log(location, '  location');
  return (
    <>
      <ul className="movie-list">
        {entriesMovie.map(el => {
          return (
            <li key={el.id} className="movie-list__item">
              <Link
                to={{
                  pathname: `${url}/${makeSlug(`${el.title} ${el.id}`)}`,
                  state: { from: { location, label: 'To movies search' } },
                }}
                className="movie-list__title"
              >
                {el.title}
              </Link>
              <div className="movie-list__desc--box">
                <span className="movie-list__desc">
                  Vote: {generateVote(el)}
                </span>
                <span className="movie-list__desc">
                  Year: {Number(el.release_date.slice(0, 4))}
                </span>
              </div>

              {el.poster_path === null || undefined ? (
                // <div>
                <img className="movie-list__img" src={defaultImg} alt="" />
              ) : (
                <img
                  className="movie-list__img"
                  src={`${IMG_URL}${el.poster_path}`}
                  alt=""
                />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
MovieList.propTypes = {
  entriesMovie: PropTypes.arrayOf(
    PropTypes.shape({
      release_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  url: PropTypes.string.isRequired,
  makeSlug: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
