import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { SearchMovieService } from './search-movie.service';
import { environment } from '../../../environments/environment';

describe('SearchMovieService', () => {
  let service: SearchMovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchMovieService]
    });
    service = TestBed.inject(SearchMovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a movie by its IMDb ID with full plot details', () => {
    const dummyMovie = {};
    const imdbId = 'tt0120338';

    service.getMovieByIMDb(imdbId).subscribe((resp: HttpResponse<any>) => {
      expect(resp.body).toEqual(dummyMovie);
    });

    const req = httpMock.expectOne(`${environment.endPoint}?apiKey=${environment.apiKey}&i=${imdbId}&plot=full`);
    expect(req.request.method).toBe('GET');
    req.flush(new HttpResponse({ body: dummyMovie }));
  });

  it('should search for movies by title, year, and genre', () => {
    const dummySearchResult = { /* ... your search movie data structure ... */ };
    const title = 'Titanic';
    const year = '1997';
    const genre = 'Drama';

    service.searchMovies(title, year, genre).subscribe((resp: HttpResponse<any>) => {
      expect(resp.body).toEqual(dummySearchResult);
    });

    const req = httpMock.expectOne(`${environment.endPoint}?apiKey=${environment.apiKey}&s=${title}&y=${year}&type=${genre}&plot=full`);
    expect(req.request.method).toBe('GET');
    req.flush(new HttpResponse({ body: dummySearchResult }));
  });

});
