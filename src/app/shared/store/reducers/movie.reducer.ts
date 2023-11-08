import { Movie } from '../../models/movie';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Search } from '../../models/search-movie';
import * as MovieActions from '../actions/movie.actions';
import { HttpErrorResponse } from '@angular/common/http';
export const movieFeatureKey = 'movie';

export interface StateMovie extends EntityState<Search> {
  totalResults: string | undefined;
  movieSelected: Movie | null;
  errorSearchMovies: HttpErrorResponse | null;
  errorSelectedMovies: HttpErrorResponse | null;
}
export const adapterMovie: EntityAdapter<Search> = createEntityAdapter<Search>({
  selectId: (search) => search.imdbID,
});
export const initialState: StateMovie = adapterMovie.getInitialState({
  totalResults: '0',
  movieSelected: null,
  errorSearchMovies: null,
  errorSelectedMovies: null,
});

export const reducer = createReducer(
  initialState,
  on(MovieActions.loadMovies, (state) => state),
  on(MovieActions.loadMoviesSuccess, (state, { movies, totalResults }) => {
    return { ...adapterMovie.setAll(movies as Search[], state), totalResults };
  }),
  on(MovieActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    errorSearchMovies: error,
  })),
  on(MovieActions.loadMovieDetail, (state) => state),
  on(MovieActions.loadMovieDetailSuccess, (state, { movie }) => ({
    ...state,
    movieSelected: movie,
  })),
  on(MovieActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    errorSelectedMovies: error,
  }))
);
