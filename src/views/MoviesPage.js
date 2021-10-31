import { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as movieFetchApi from '../services/FetchMovies';
import InputMarkup from '../components/InputMarkup';
import generateVote from '../techBox/VoteAverage';
import defaultImg from '../img/netflix.jpg';
//
export default function MoviesPage({ onSubmit }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [entriesMovie, setEntriesMovie] = useState(null);
  const [status, setStatus] = useState('idle');
  const { url } = useRouteMatch();

  const handleFormSubmit = query => {
    setQuery(query);
    setEntriesMovie([]);
  };
  useEffect(() => {
    if (!query) {
      return;
    }
    movieFetchApi
      .fetchByWord(query)
      .then(({ results }) => {
        const data = results.map(
          ({
            title,
            vote_average,
            overview,
            id,
            poster_path,
            genres,
            release_date,
          }) => {
            return {
              release_date,
              title,
              vote_average,
              overview,
              id,
              poster_path,
              genres,
            };
          },
        );
        setEntriesMovie(data);
        setStatus('pending');
      })
      .catch(error => {
        setError(`It is an ${error}, please try again`);
        setStatus('rejected');
      });
  }, [query]);

  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  return (
    <>
      <Route path={`${url}`}>
        <InputMarkup onSubmit={handleFormSubmit} query={query} />
      </Route>

      {status === 'pending' && (
        <ul className="movie-list">
          {entriesMovie.map(el => {
            return (
              <li key={el.id} className="movie-list__item">
                <Link to={`${url}/${el.id}`} className="movie-list__title">
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
      )}
    </>
  );
}
