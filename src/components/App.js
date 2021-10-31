import { Route, Switch } from 'react-router-dom';
import Container from './Container';
import HomePage from '../views/HomePage';
import MoviesPage from '../views/MoviesPage';
import MovieDetailsPage from '../views/MovieDetailsPage';
import NavigationBox from './NavigationBox';
import NotFound from '../views/NotFound';
//
import '../styles/Container.scss';
import '../styles/HomePage.scss';
import '../styles/Navigation.scss';
import '../styles/Input.scss';

//
function App() {
  return (
    <Container>
      <NavigationBox />

      <Switch>
        <Route path="/" exact component={HomePage}>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          {/* посик по ключевому слову */}
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}
export default App;
