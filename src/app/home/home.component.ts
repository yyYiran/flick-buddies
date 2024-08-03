import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { UserService } from '../service/user.service';
import { Movie } from '../model/movie';
import { Observable, catchError, of } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public recMovies$!: Observable<Movie[]>;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private movieService: MovieService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('!!home ngOnInit');
    const currentUser = this.authService.currentUser();
    if (currentUser == '') {
      this.redirectTo('login');
      return;
    }
    this.userService.loadInitialData().then(() => {
      this.userService.addedMovies
        .pipe(
          catchError((err) => {
            this.handleError(err);
            return of();
          })
        )
        .subscribe((ids) => {
          console.log('refresh recommendatation list');
          this.refreshRecMovies(currentUser);
        });
    });
  }

  onOpenModal(movie: Movie) {
    console.log('onOpenModal: ' + movie.title);
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
      size: 'sm',
    }); // Open modal with component
    modalRef.componentInstance.movie = movie;
  }

  private handleError(error: HttpErrorResponse) {
    console.log('movie.search.error');

    // console.log(this.form["username"].errors);
    // TODO: display different messages based on differnt error
    // Hidden field
    if (error.status == HttpStatusCode.Unauthorized) {
      console.error('Unauthorized: ', error);
      this.redirectTo('login');
    } else if (error.status == HttpStatusCode.Forbidden) {
      console.error('Forbidden: ', error);
      this.redirectTo('login');
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error);
      // this.redirectTo("login");
    }
  }

  private refreshRecMovies(currentUser: string) {
    this.recMovies$ = this.userService
      .getRecommendedMoviesFor(currentUser)
      .pipe(
        catchError((err) => {
          this.handleError(err);
          return of();
        })
      );
  }
  private redirectTo(path: string) {
    if (path == 'login') {
      alert('Your session expired. Please login. ');
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 200);
    }
  }
}
