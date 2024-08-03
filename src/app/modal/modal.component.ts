import {
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalConfig } from '../model/modal.config';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Review } from '../model/review';
import { Movie } from '../model/movie';
import { ReviewRequest } from '../model/review.request';
import { AuthService } from '../service/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { UserService } from '../service/user.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-movie-review-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
@Injectable()
export class ModalComponent implements OnInit{
  // @Input() modalConfig!: ModalConfig;
  // @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>
  // private modalRef!: NgbModalRef

  @Input() movie!: Movie;

  review: Review = {rating:null, review: null}

  // @Output() closeEvent = new EventEmitter();
  // @Output() submitEvent = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private movieService: MovieService,
    private userService: UserService,
    private router: Router,
  ){}

  ngOnInit(): void {
    // console.log(this.movie + " emit")
  }

  onSubmit() {
    // console.log(this.review);
    if (this.movie == null || this.review.rating == null || this.review.review == null){
      this.activeModal.close("You cannot submit!");
      return;
    }

    var request: ReviewRequest = {
      username: this.authService.currentUser(),
      movieId: this.movie.movie_code,
      rating: this.review.rating,
      review: this.review.review,
    }

    this.movieService.addMovie(this.movie).pipe(catchError((error) => {
      this.handleError(error);
      return of()
    })).subscribe(()=>{
      this.movieService.addReview(request).pipe(catchError((err ) => {
        this.handleError(err)
        return of()
      })).subscribe(res => {
        console.log("Submitted: "+ res.review);
        this.userService.addId(this.movie.movie_code)
        this.activeModal.close();
      })
    })
  }

  onClose() {
    this.activeModal.close();
  }

  private handleError(error: HttpErrorResponse) {
    console.log("movie.search.error");

    // TODO: display different messages based on differnt error
    if (error.status == HttpStatusCode.Unauthorized){
      console.error("Unauthorized: ", error);
    } else if (error.status == HttpStatusCode.Forbidden){
      console.error("Forbidden: ", error);
    } 
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error);
    }

  }

  private redirectTo(path: string){
    if (path == "login"){
      alert("Your session expired. Please login. ")
      setTimeout(()=>{this.router.navigateByUrl("/login");}, 200);
    }
  }

}
