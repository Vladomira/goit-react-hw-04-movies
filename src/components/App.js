import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Container from './Container';
// import HomePage from '../views/HomePage';
// import MoviesPage from '../views/MoviesPage';
// import MovieDetailsPage from '../views/MovieDetailsPage';
// import NotFound from '../views/NotFound';
import NavigationBox from './NavigationBox';
import SpinLoader from '../components/Loader';

//
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import '../styles/Container.scss';
import '../styles/HomePage.scss';
import '../styles/Navigation.scss';
import '../styles/Input.scss';
import '../styles/MovieDetailsPage.scss';
import '../styles/Reviews.scss';
//
const HomePageView = lazy(() =>
  import('../views/HomePageView' /* webpackChunkName: "home-page" */),
);
const MoviesPageView = lazy(() =>
  import('../views/MoviesPageView' /* webpackChunkName: "movie-page" */),
);
const MovieDetailsPageView = lazy(() =>
  import(
    '../views/MovieDetailsPageView' /* webpackChunkName: "details-of-movie" */
  ),
);
const NotFoundView = lazy(() =>
  import('../views/NotFoundView' /* webpackChunkName: "not-found" */),
);

function App() {
  return (
    <Container>
      <NavigationBox />

      <Suspense fallback={<SpinLoader />}>
        <Switch>
          <Route path="/" exact>
            <HomePageView />
          </Route>

          <Route path="/movies" exact>
            {/*searching by word */}
            <MoviesPageView />
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailsPageView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
export default App;
