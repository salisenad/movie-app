import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { StoreModule, Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../../../shared/models/movie';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { loadMovies } from '../../../shared/store/actions/movie.actions';

import { By } from '@angular/platform-browser';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let store: Store;
  let mockMovie$: Observable<Movie>;

  beforeEach(async () => {
    const mockActivatedRoute = {
      paramMap: of(new Map([['id', 'tt0120338']])),
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [MovieDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: Store,
          useValue: loadMovies, // Your mock store here
        },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unrecognized elements and attributes
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;

    // Mock the movie$ Observable with a test movie
    mockMovie$ = of({
      imdbID: 'tt0120338',
      Title: 'Test Movie',
      Poster: 'test_movie_poster.jpg',
      imdbRating: '8.5',
      imdbVotes: '500,000',
      Released: new Date('1997-01-01'),
      Plot: 'Test Plot',
      Actors: 'Test Actor',
      Runtime: '120 min',
      Genre: 'Drama',
      Language: 'English',
    } as unknown as Movie);

    // Replace with the appropriate reducer or use a mocked selector
    store = TestBed.inject(Store);
    spyOn(store, 'pipe').and.returnValue(mockMovie$);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie title when movie is loaded', () => {
    component.movie$.subscribe(() => {
      fixture.detectChanges();
      const titleElement = fixture.debugElement.query(By.css('.name')).nativeElement;
      expect(titleElement.textContent).toContain('Test Movie');
    });
  });

  it('should call openImdbUrl() with correct IMDB ID', () => {
    spyOn(component, 'openImdbUrl');
    const button = fixture.debugElement.query(By.css('.button--icon.trailer')).nativeElement;
    button.click();
    expect(component.openImdbUrl).toHaveBeenCalledWith('tt0120338');
  });

});
