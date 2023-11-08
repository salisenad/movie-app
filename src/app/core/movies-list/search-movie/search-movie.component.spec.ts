import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchMovieComponent } from './search-movie.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppState } from 'src/app/reducers';
import { SearchMovieService } from '../../../shared/services/search-movie.service';
import { of } from 'rxjs';
import { loadMovies } from '../../../shared/store/actions/movie.actions';

describe('SearchMovieComponent', () => {
  let component: SearchMovieComponent;
  let fixture: ComponentFixture<SearchMovieComponent>;
  let store: Store<AppState>;
  let mockStore: { dispatch: jasmine.Spy };
  let mockSearchMovieService: Partial<SearchMovieService>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    mockSearchMovieService = {
      movieGenres: ['Action', 'Drama', 'Comedy']
    };

    await TestBed.configureTestingModule({
      declarations: [SearchMovieComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      providers: [
        FormBuilder,
        { provide: Store, useValue: mockStore },
        { provide: SearchMovieService, useValue: mockSearchMovieService }
      ],
      schemas: [NO_ERRORS_SCHEMA] // This ignores any unknown elements or attributes
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMovieComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined form group', () => {
    expect(component.formSearchMovie instanceof FormGroup).toBe(true);
  });

  it('should fill listOfYears with years from current to 1970 on init', () => {
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i);
    expect(component.listOfYears).toEqual(yearsArray);
  });

  it('should dispatch an action to load movies when the form is submitted and valid', () => {
    const formValues = { titleMovie: 'titanic', year: '1997', genre: 'Drama' };
    component.formSearchMovie.setValue(formValues);

    component.onSearchMovie();

    expect(mockStore.dispatch).toHaveBeenCalledWith(loadMovies(formValues));
  });

});
