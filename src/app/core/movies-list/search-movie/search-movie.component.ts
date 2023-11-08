import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { loadMovies } from '../../../shared/store/actions/movie.actions';
import { SearchMovieService } from "../../../shared/services/search-movie.service";
@Component({
  selector: 'search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMovieComponent implements OnInit {
  listOfYears: number[] = [];
  formSearchMovie: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public searchMovieService: SearchMovieService
  ) {}

  ngOnInit(): void {
    this.buildFormSearchMovie();
    this.onSearchMovie()
    this.generateListOfYears()
  }

  private buildFormSearchMovie(): void {
    this.formSearchMovie = this.fb.group({
      titleMovie: new FormControl('Titanic'),
      year: new FormControl(''),
      genre: new FormControl('')
    });
  }
  onSearchMovie(): void {
    if (this.formSearchMovie.valid) {
      this.store.dispatch(loadMovies(this.formSearchMovie.value));
    }
  }

  private generateListOfYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1970; year--) {
      this.listOfYears.push(year);
    }
  }

}
