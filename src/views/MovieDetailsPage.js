import { Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import * as movieFetchApi from '../services/FetchMovies';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';
import PageHeading from '../components/PageHeading';
import dataNormalize from '../techBox/DataNormalize';
//

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url } = useRouteMatch();
  useEffect(() => {
    movieFetchApi.fetchForMovie(movieId).then(setMovie);
  }, [movieId]);
  return (
    <>
      <PageHeading text={`Movie ${movieId}`} />

      {movie && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
          <h2>
            {movie.title}
            <span> ({dataNormalize(movie)})</span>
          </h2>
          <p>User Score: {movie.vote_average * 10}%</p>
          <p>Owerview</p>
          <p>{movie.overview}</p>
          <ul>
            Genres
            {movie.genres.map(el => {
              return <li key={el.id}>{el.name}</li>;
            })}
          </ul>
          <div>
            <p>Addditional information</p>
            <ul>
              <li>
                <NavLink to={`${url}/cast`}>Cast</NavLink>
              </li>
              <li>
                <NavLink to={`${url}/reviews`}>Reviews</NavLink>
              </li>
            </ul>
            <Route exact path={`${url}/cast`}>
              <Cast id={movie.id} />
            </Route>
            <Route exact path={`${url}/reviews`}>
              <Reviews id={movie.id} />
            </Route>
          </div>
        </>
      )}
    </>
  );
}

// {/* <NavForAddInfo /> */}

// {/* <Route path={`${url}/cast`} component={Cast}>
//   {/* <Cast id={movie.id} /> */}
// {/* </Route> */}
// {/* <Route path="/movies/:movieId/reviews">
//   <Reviews id={movie.id} />
// </Route> */}
//  {/* <NavLink to={`${url}/cast`}>
//                 <Cast id={movie.id} />
//               </NavLink> */}

//             {/* <NavLink to={`${url}/reviews`}>reviews</NavLink> */}

//         {/* <Route path="/movies/:movieId/cast" exact>
//           <Cast />
//         </Route> */}
