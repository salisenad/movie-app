import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import {MoviesListModule} from "./movies-list/movies-list.module";

@NgModule({
  declarations: [ CoreComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MoviesListModule,
  ],
  exports: [CoreComponent],
})
export class CoreModule { }
