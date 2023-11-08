import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Search } from '../../shared/models/search-movie';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { selectAllMovies, selectStateMovie } from '../../shared/store/selectors/movie.selectors';
import { AppState } from '../../reducers';
import {ActivatedRoute, Router} from "@angular/router";

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let store: Store<AppState>;
  let mockStore: { pipe: jasmine.Spy };
  let mockRouter: { navigate: jasmine.Spy };
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Mock the store
    mockStore = jasmine.createSpyObj('Store', ['pipe']);
    mockStore.pipe.and.returnValue(of([])); // Mock the movies$ observable to return an empty array

    // Setup the testing environment
    await TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: Store, useValue: mockStore }
      ],
      schemas: [NO_ERRORS_SCHEMA] // This allows us to ignore any other components that we're not testing here
    })
      .compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    // Mock Router and ActivatedRoute
    mockRouter = TestBed.inject(Router) as any;
    spyOn(mockRouter, 'navigate');
    mockActivatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an Observable of movies', () => {
    component.movies$.subscribe((movies) => {
      expect(movies).toEqual([]);
    });
  });

});

