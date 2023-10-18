import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../model/movie';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  public movies$!: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.movies$ = this.movieService.searchByTitle("1984");
    // this.movieService.test();
    // this.movies$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.movieService.searchByTitle(term)),
    // );
  }
}

