import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as movieFetchApi from '../services/FetchMovies';
import generateVote from '../techBox/VoteAverage';

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    movieFetchApi.fetchTrendingMovies().then(movies => {
      const data = movies.results.map(
        ({ id, title, vote_average, release_date, poster_path }) => {
          return {
            id,
            title,
            vote_average,
            release_date,
            poster_path: poster_path ? poster_path : 'no picture',
          };
        },
      );
      setStatus('pending');
      return setTrendMovies(data);
    });
  }, []);
  return (
    <>
      {/* <PageHeading text="Home" /> */}
      {status === 'pending' && (
        <ul className="movie-list">
          {trendMovies.map(movie => {
            return (
              <li key={movie.id} className="movie-list__item">
                <Link to={`movies/${movie.id}`} className="movie-list__title">
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
                <img
                  className="movie-list__img"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
                {/* </div> */}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
