import { useRouteMatch, Link } from 'react-router-dom';

export default function MovieList({ entriesMovie, query }) {
  const { url } = useRouteMatch();
  console.log(entriesMovie, 'entriesMovie from mivieList');
  return (
    <>
      <p>Hi</p>
      <ul>
        {entriesMovie.results.map(movie => {
          return (
            <li key={movie.id}>
              {movie.title}
              <Link to={`${url}/${query}`}>{movie.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

// {el.poster_path === null || undefined ? (
//   // <div>
//   <img
//     src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
//     alt=""
//     width="200"
//   />
// ) : (
//   // {/* </div> */}
//   // <div>
//   <img
//     className="movie-list__img"
//     src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
//     alt=""
//     width="200"
//   />
//   // </div>
// )}
