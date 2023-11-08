import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieItemComponent } from './movie-item.component';
import { Search } from '../../../shared/models/search-movie';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;
  let mockMovie: { Year: string; imdbID: string; Poster: string; Title: string; imdbRating: string };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MovieItemComponent],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustUrl: (url: string) => url
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA] // to ignore elements and attributes that Angular doesn't recognize
    }).compileComponents();

    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;
    mockMovie = {
      imdbID: 'tt0120338',
      Title: 'Titanic',
      Poster: 'url_to_poster',
      imdbRating: '7.8',
      Year: '1997-01-01T00:00:00Z'
    };

    // Input to the component
    component.movie = mockMovie;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie title', () => {
    const titleElement = fixture.debugElement.query(By.css('h6')).nativeElement;
    expect(titleElement.textContent).toContain(mockMovie.Title);
  });

  it('should display movie rating', () => {
    const ratingElement = fixture.debugElement.query(By.css('.rate')).nativeElement;
    expect(ratingElement.textContent).toContain(mockMovie.imdbRating);
  });

  it('should display the correct year', () => {
    const yearElement = fixture.debugElement.query(By.css('.year')).nativeElement;
    expect(yearElement.textContent).toContain(new Date(mockMovie.Year).getFullYear().toString());
  });

  it('should open IMDb URL when clicked', () => {
    spyOn(window, 'open');
    const hoverElement = fixture.debugElement.query(By.css('.hover'));
    hoverElement.triggerEventHandler('click', null);
    expect(window.open).toHaveBeenCalledWith('https://www.imdb.com/title/' + mockMovie.imdbID, '_blank');
  });
});

