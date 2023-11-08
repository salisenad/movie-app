import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  adapterMovie,
  movieFeatureKey,
  StateMovie,
} from '../reducers/movie.reducer';
export const selectStateMovie = createFeatureSelector<StateMovie>(
  movieFeatureKey
);
export const selectMovieSelected = createSelector(
  selectStateMovie, state => state.movieSelected
);
const { selectAll } = adapterMovie.getSelectors();
export const selectAllMovies = selectAll;
