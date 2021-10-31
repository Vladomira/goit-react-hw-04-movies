import { useState, useEffect } from 'react';
import * as movieFetchApi from '../services/FetchMovies';

export default function Cast({ id }) {
  const [movieCast, setMovieCast] = useState('');
  const [status, setStatus] = useState('idle');
  // console.log(id, 'id');
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
    });
  }, [id]);
  const IMG_URL = 'https://image.tmdb.org/t/p/original';
  return (
    <>
      <ul>
        {status === 'pending' &&
          movieCast.map(el => {
            return (
              <li key={el.id}>
                <div>
                  {el.profile_path ? (
                    <img
                      src={`${IMG_URL}${el.profile_path}`}
                      alt=""
                      width="200"
                    />
                  ) : (
                    <img
                      src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
                      alt=""
                      width="200"
                    />
                  )}
                </div>
                <p>{el.name}</p>
                <p>{el.character}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
}
