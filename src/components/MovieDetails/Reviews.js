import { useState, useEffect } from 'react';
import * as movieFetchApi from '../../services/FetchMovies';
import scroll from '../../techBox/scroll';

export default function Reviews({ id }) {
  const [reviews, setReviews] = useState();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    movieFetchApi.fetchForMovieReviews(id).then(({ results }) => {
      const dataReviews = results.map(({ author, content, id }) => {
        return { author, content, id };
      });
      setReviews(dataReviews);
      setStatus('pending');
      scroll();
    });
  }, [id]);
  return (
    <>
      {status === 'pending' &&
        (reviews.length === 0 ? (
          <p className="reviews__name">
            Sorry, we don't have any reviews for this movie.
          </p>
        ) : (
          <ul className="reviews__list">
            {reviews.map(el => {
              return (
                <li key={el.id} className="reviews__item">
                  <h3 className="reviews__name">{el.author}</h3>
                  <p className="reviews__article">{el.content}</p>
                </li>
              );
            })}
          </ul>
        ))}
    </>
  );
}
