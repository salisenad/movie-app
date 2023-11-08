import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {SearchMovieService} from "../../services/search-movie.service";

describe('SearchMovieService', () => {
  let service: SearchMovieService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchMovieService],
    });
    service = TestBed.inject(SearchMovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a movie by its IMDb ID with full plot details', () => {
    const testIMDb = 'tt0120338';
    const dummyMovieResponse = { /* ...mock movie data... */ };
    const requestUrl = `${environment.endPoint}?apiKey=${environment.apiKey}&i=${testIMDb}&plot=full`;

    service.getMovieByIMDb(testIMDb).subscribe((resp: HttpResponse<any>) => {
      expect(resp.body).toEqual(dummyMovieResponse);
    });

    const req = httpTestingController.expectOne(requestUrl);
    expect(req.request.method).toBe('GET');
    req.flush(new HttpResponse({ body: dummyMovieResponse }));
  });

  it('should search for movies by title', () => {
    const testTitle = 'Inception';
    const testYear = '2010';
    const testGenre = 'Drama';
    const dummySearchResponse = { /* ...mock search data... */ };
    const requestUrl = `${environment.endPoint}?apiKey=${environment.apiKey}&s=${testTitle}&y=${testYear}&type=${testGenre}&plot=full`;

    service.searchMovies(testTitle, testYear, testGenre).subscribe((resp: HttpResponse<any>) => {
      expect(resp.body).toEqual(dummySearchResponse);
    });

    const req = httpTestingController.expectOne(requestUrl);
    expect(req.request.method).toBe('GET');
    req.flush(new HttpResponse({ body: dummySearchResponse }));
  });
});
