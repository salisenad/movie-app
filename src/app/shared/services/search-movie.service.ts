import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie } from '../models/movie';
import { SearchMovie } from '../models/search-movie';
@Injectable({
  providedIn: 'root',
})
export class SearchMovieService {
  movieGenres = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'TV Movie',
    'Thriller',
    'War',
    'Western'
  ];
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieves a movie by its IMDb ID with full plot details.
   * @param IMDb The IMDb ID of the movie.
   * @returns Observable containing the movie details.
   */
  getMovieByIMDb(IMDb: string | null): Observable<HttpResponse<Movie>> {
    return this.httpClient.get<Movie>(
      `${environment.endPoint}?apiKey=${environment.apiKey}&i=${IMDb}&plot=full`,
      { observe: 'response', responseType: 'json' }
    );
  }

  /**
   * Searches for movies by title.
   * @param title The title of the movie to search for.
   * @param year
   * @returns Observable containing the search results.
   */
  searchMovies(title: string, year: string, genre: string): Observable<HttpResponse<SearchMovie>> {
    return this.httpClient.get<SearchMovie>(
      `${environment.endPoint}?apiKey=${environment.apiKey}&s=${title}&y=${year}&type=${genre}&plot=full`,
      { observe: 'response', responseType: 'json' }
    );
  }
}
