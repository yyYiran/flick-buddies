import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../model/movie';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MovieService } from '../service/movie.service';
import { UserService } from '../service/user.service';
import { Review } from '../model/review';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent {
  @Input() movie!: Movie;
  @Input() classNames: string = '';
  @Output() openModal = new EventEmitter<Movie>();

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  isMovieAdded(movieId: number) {
    return this.userService.isMovieAdded(movieId);
  }

  openModalClick() {
    this.openModal.emit(this.movie);
  }
}
