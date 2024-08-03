import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../model/movie';
import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  first,
  flatMap,
  map,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Review } from '../model/review';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig } from '../model/modal.config';
import { ReviewRequest } from '../model/review.request';
import { UserService } from '../service/user.service';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
})
export class MovieSearchComponent implements OnInit {
  // modalComponent!: ModalComponent;

  // @ViewChild('searchBox', { static: true })
  // searchBox!: ElementRef;
  public movies$!: Observable<Movie[]>;

  private searchTerms = new Subject<string>();
  currentMovie!: Movie | null;
  searching = false;
  focusOnList = true;
  // public myReview: Review = {
  //   rating: null,
  //   review: null,
  // }

  navigateTo(dest: string) {
    this.router.navigateByUrl('/movie/' + dest);
  }

  // public modalConfig: ModalConfig = {
  //   size: 'sm',
  //   title: 'Hello',
  //   // submitButtonLabel: "Save",
  //   closeButtonLabel: "Cancel",
  // }

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // INIT already added movies

    console.log('movie search component init');
    const currentUser = this.authService.currentUser();
    if (currentUser == '') {
      this.redirectTo('login');
      return;
    }
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(100),
      tap((term) => console.log('!!searchTerm changed')),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) =>
        this.movieService.searchByTitle(term).pipe(
          catchError((error) => {
            // Handle the error here, e.g., log it or display an error message.
            this.handleError(error);
            // You can also return an empty observable or throw a new error if needed.
            return of([]); // Replace with your error handling logic.
          })
        )
      )
    );
  }
  // Push a search term into the observable stream.
  search(term: string): void {
    // console.log("search: " + term)
    this.searchTerms.next(term);
  }

  onOpenModal(movie: Movie) {
    console.log('onOpenModal: ' + movie.title);
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
      size: 'sm',
    }); // Open modal with component
    modalRef.componentInstance.movie = movie;
  }

  // isMovieAdded(movieId: number): boolean{
  //   return this.addedMovies.has(movieId)
  // }

  // closeModal(){
  //   this.modalService.dismissAll()
  // }

  // Triggered when onsubmit emmitted
  // onSubmitReview(review: Review){
  //   console.log("Submit: " + review)
  // }

  // private reset(){
  //   review.rating = null;
  //   review.review = null;
  // }

  // TODO: bug fix
  // TODO: recall

  private redirectTo(path: string) {
    if (path == 'login') {
      alert('Your session expired. Please login. ');
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 200);
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.log('movie.search.error');

    // console.log(this.form["username"].errors);
    // TODO: display different messages based on differnt error
    // Hidden field
    if (error.status == HttpStatusCode.Unauthorized) {
      console.error('Unauthorized: ', error);
      this.redirectTo('login');
      // this.modalComponent.onClose()
    } else if (error.status == HttpStatusCode.Forbidden) {
      console.error('Forbidden: ', error);
      this.redirectTo('login');
      // this.modalComponent.onClose()
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error);
      // this.redirectTo("login");
    }
  }
}
