import { Switch, Route } from "react-router-dom";
import Cast from "./Cast";
import Reviews from "./Reviews";

export default function MovieDetailsPage() {
  return (
    <>
      <h3>Movie</h3>
      <Switch>
        <Route path="/movies/:movieId/cast" exact>
          <Cast />
        </Route>

        <Route path="/movies/:movieId/reviews" exact>
          <Reviews />
        </Route>
      </Switch>
    </>
  );
}
