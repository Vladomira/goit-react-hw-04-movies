import { useState, useEffect } from 'react';
import * as movieFetchApi from '../../services/FetchMovies';
import scroll from '../../techBox/scroll';

export default function Cast({ id }) {
  const [movieCast, setMovieCast] = useState('');
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    movieFetchApi.fetchForMovieCast(id).then(result => {
      const dataCast = result.cast.map(
        ({ id, name, character, profile_path }) => {
          return {
            id,
            name,
            character,
            profile_path,
          };
        },
      );
      setMovieCast(dataCast);
      setStatus('pending');
      scroll();
    });
  }, [id]);
  const IMG_URL = 'https://image.tmdb.org/t/p/original';
  return (
    <>
      <ul className="movie-list">
        {status === 'pending' &&
          movieCast.map(el => {
            return (
              <li key={el.id} className="movie-list__item">
                {el.profile_path ? (
                  <img
                    className="movie-list__img"
                    src={`${IMG_URL}${el.profile_path}`}
                    alt=""
                  />
                ) : (
                  <img
                    className="movie-list__img"
                    src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
                    alt=""
                  />
                )}
                <ul className="movie-list__cast-box">
                  <li className="movie-list__cast--name">{el.name}</li>
                  <li className="movie-list__cast--character">
                    {el.character}
                  </li>
                </ul>
              </li>
            );
          })}
      </ul>
    </>
  );
}
