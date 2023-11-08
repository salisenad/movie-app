import { Movie } from '../../../shared/models/movie';
import { AppState } from './../../../reducers/index';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { loadMovieDetail } from '../../../shared/store/actions/movie.actions';
import { Observable, of } from 'rxjs';
import { selectMovieSelected } from '../../../shared/store/selectors/movie.selectors';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent implements OnInit {
  movie$: Observable<Movie | null> = of();
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const imdbID = params.get('id');
      this.store.dispatch(loadMovieDetail({ imdbID }));
      this.movie$ = this.store.pipe(select(selectMovieSelected));
    });
  }

  openImdbUrl(imdbID: string): void {
    window.open('https://www.imdb.com/title/' + imdbID, '_blank');
  }
}
