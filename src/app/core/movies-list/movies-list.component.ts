import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Search} from "../../shared/models/search-movie";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {selectAllMovies, selectStateMovie} from "../../shared/store/selectors/movie.selectors";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit{
  movies$: Observable<Search[]> = of([]);
  constructor(private store: Store<AppState>, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.movies$ = this.store.pipe(
      select(selectStateMovie),
      select(selectAllMovies)
    );
  }

}
