import { useState, useEffect, lazy, Suspense } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import makeSlug from '../techBox/makeSlug';
import * as movieFetchApi from '../services/FetchMovies';
import InputMarkup from '../components/InputMarkup';
import SpinLoader from '../components/Loader';

const MovieList = lazy(() =>
  import('../components/MovieList' /* webpackChunkName: "movies-list" */),
);
//
export default function MoviesPageView() {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const [error, setError] = useState('');
  const [entriesMovie, setEntriesMovie] = useState(null);
  const [status, setStatus] = useState('idle');
  const { url } = useRouteMatch();
  const location = useLocation();
  const handleFormSubmit = query => {
    setQuery(query);
    setEntriesMovie([]);
    // history.push(`?query=${query}`);

    history.push({
      ...location,
      search: `query=${query}`,
    });
  };
  const currentQuery = new URLSearchParams(location.search).get('query');
  useEffect(() => {
    if (currentQuery) {
      setQuery(currentQuery);
    }
  }, [currentQuery]);
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

  return (
    <>
      <Route path={`${url}`}>
        <InputMarkup onSubmit={handleFormSubmit} query={query} />
      </Route>

      {status === 'pending' && (
        <>
          <Suspense fallback={<SpinLoader />}>
            {query && (
              <MovieList
                entriesMovie={entriesMovie}
                // query={newUrl}
                makeSlug={makeSlug}
                location={location}
                url={url}
              />
            )}
          </Suspense>
        </>
      )}
    </>
  );
}
