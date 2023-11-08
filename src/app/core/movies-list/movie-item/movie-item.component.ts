import { Search } from '../../../shared/models/search-movie';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieItemComponent {
  @Input() movie!: { Year: string; imdbID: string; Poster: string; Title: string; imdbRating: string };

  constructor(private sanitizer: DomSanitizer) {}

  openImdbUrl(imdbID: string): void {
    window.open('https://www.imdb.com/title/' + imdbID, '_blank');
  }
}
