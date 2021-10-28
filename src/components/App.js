import { Switch, Route } from 'react-router-dom';
import Container from './Container';
// import HomePage from '../views/HomeView.js';
// import MoviesPage from '../views/MoviesPage';
// import MovieDetailsPage from '../views/HomePage';
import NavigationBox from './NavigationBox';
// import NotFound from '../views/NotFound';

function App() {
  return (
    <Container>
      <h1>hello</h1>
      <NavigationBox />

      <Switch>
        {/* <Route path="/" exact>
          <HomePage />
        </Route> */}
        {/* <Route path="/" exact>
          <HomePage />
        </Route> */}

        {/* <Route path="/movies" exact>
          <MoviesPage />
        </Route> */}

        {/* <Route path="/movies/:movieId" exact>
          <MovieDetailsPage />
        </Route> */}

        {/* <Route>
          <NotFound />
        </Route> */}
      </Switch>
    </Container>
  );
}
export default App;
