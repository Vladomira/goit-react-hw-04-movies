import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Container from './Container';
// import HomePage from '../views/HomePage';
// import MoviesPage from '../views/MoviesPage';
// import MovieDetailsPage from '../views/MovieDetailsPage';
// import NotFound from '../views/NotFound';
import NavigationBox from './NavigationBox';

//
import '../styles/Container.scss';
import '../styles/HomePage.scss';
import '../styles/Navigation.scss';
import '../styles/Input.scss';
import '../styles/MovieDetailsPage.scss';
import '../styles/Reviews.scss';
//
const HomePage = lazy(() =>
  import('../views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('../views/MoviesPage' /* webpackChunkName: "movie-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../views/MovieDetailsPage' /* webpackChunkName: "details-of-movie" */
  ),
);
const NotFound = lazy(() =>
  import('../views/NotFound' /* webpackChunkName: "not-found" */),
);

function App() {
  return (
    <Container>
      <NavigationBox />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact component={HomePage}>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            {/* посик по ключевому слову */}
            <MoviesPage />
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
export default App;
