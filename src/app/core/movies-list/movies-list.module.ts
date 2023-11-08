import { MovieEffects } from '../../shared/store/effects/movie.effects';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { MoviesListRoutingModule } from './movies-list-routing.module';
import { MoviesListComponent } from './movies-list.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';
import * as fromMovie from '../../shared/store/reducers/movie.reducer';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    MoviesListComponent,
    SearchMovieComponent,
    MovieItemComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MoviesListRoutingModule,
    StoreModule.forFeature(fromMovie.movieFeatureKey, fromMovie.reducer),
    EffectsModule.forFeature([MovieEffects]),
    MatTabsModule,
    MatSelectModule,
  ],
  exports: [
    MoviesListComponent
  ]
})
export class MoviesListModule {}
