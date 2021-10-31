import { useState, useEffect } from 'react';
import * as movieFetchApi from '../services/FetchMovies';

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
    });
  }, [id]);
  // console.log(reviews.length, 'reviews');
  return (
    <>
      {status === 'pending' &&
        (reviews.length === 0 ? (
          <p>Sorry, we don't have any reviews for this movie.</p>
        ) : (
          <ul>
            {reviews.map(el => {
              return (
                <li key={el.id}>
                  <h3>{el.author}</h3>
                  <p>{el.content}</p>
                </li>
              );
            })}
          </ul>
        ))}
    </>
  );
}
