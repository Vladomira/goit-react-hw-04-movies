import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dataNormalize from '../techBox/DataNormalize';
import generateVote from '../techBox/VoteAverage';
import defaultImg from '../img/netflix.jpg';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export default function MovieList({ entriesMovie, url, makeSlug, location }) {
  return (
    <>
      <ul className="movie-list">
        {entriesMovie.map(el => {
          return (
            <li key={el.id} className="movie-list__item">
              <Link
                className="movie-list__link"
                to={{
                  pathname: `${url}/${makeSlug(`${el.title} ${el.id}`)}`,
                  state: { from: { location, label: 'To movies search' } },
                }}
              >
                <span className="movie-list__title"> {el.title}</span>
                <div className="movie-list__desc--box">
                  {el.vote_average ? (
                    <span className="movie-list__desc">
                      Vote: {generateVote(el.vote_average)}
                    </span>
                  ) : (
                    <span className="movie-list__desc">Vote: ??</span>
                  )}

                  {el.release_date ? (
                    <span className="movie-list__desc">
                      Year: {dataNormalize(el.release_date)}
                    </span>
                  ) : (
                    <span className="movie-list__desc">Year: Unknown</span>
                  )}
                </div>

                {el.poster_path === null || undefined ? (
                  <img className="movie-list__img" src={defaultImg} alt="" />
                ) : (
                  <img
                    className="movie-list__img"
                    src={`${IMG_URL}${el.poster_path}`}
                    alt=""
                  />
                )}
              </Link>
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
      release_date: PropTypes.string,
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
  // location: PropTypes.object.isRequired,
};
