import { Movie } from '../../models/movie';
import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Search } from '../../models/search-movie';

export const loadMovies = createAction(
  '[Movie] Load Movies',
  props<{ titleMovie: string, year: any, genre: string }>()
);

export const loadMoviesSuccess = createAction(
  '[Movie] Load Movies Success',
  props<{ movies: Search[] | undefined; totalResults: string | undefined }>()
);

export const loadMoviesFailure = createAction(
  '[Movie] Load Movies Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadMovieDetail = createAction(
  '[Movie] Load Movie Detail',
  props<{ imdbID: string | null }>()
);

export const loadMovieDetailSuccess = createAction(
  '[Movie] Load Movie Detail Success',
  props<{ movie: Movie | null }>()
);

export const loadMovieDetailFailure = createAction(
  '[Movie] Load Movie Detail Failure',
  props<{ error: HttpErrorResponse }>()
);
