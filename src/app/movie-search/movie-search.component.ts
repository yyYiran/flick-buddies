import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../model/movie';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, take, throwError } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import jwt_decode from "jwt-decode";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Review } from '../model/review';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig } from '../model/modal.config';
import { ReviewRequest } from '../model/review.request';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  @ViewChild('searchBox', { static: true }) searchBox!: ElementRef;
  public movies$!: Observable<Movie[]>;
  private searchTerms = new Subject<string>();
  currentMovie!: Movie|null
  searching = false; 
  focusOnList = true; 
  public myReview: Review = {
    rating: null,
    review: null,
  }

  // public onBlur() {
  //   console.log("You are not center of universe")
  //   this.searchBox.nativeElement.value = '';
  // }

  @ViewChild('modal') private modalComponent!: ModalComponent;
  public modalConfig: ModalConfig = {
    size: 'sm',
    title: 'Hello',
    // submitButtonLabel: "Save",
    closeButtonLabel: "Cancel",
  }


  
  
  constructor(
    private authService: AuthService, 
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private router: Router) {}
    
    
    

    ngOnInit(): void {
      // this.reviewForm = this.formBuilder.group({
      //   rating: [null],
      //   review: [null],
      //   status: [0]
      // });
      // console.log("this.reviewForm.value: ");
      // console.log(this.reviewForm.value);
      console.log(this.authService.currentUser())
      // console.log(this.authService.currentUser);
      // this.movies$ = this.movieService.searchByTitle("1984");
      this.movies$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),
    
        // ignore new term if same as previous term
        distinctUntilChanged(),
    
        // switch to new search observable each time the term changes
        switchMap((term: string) => this.movieService.searchByTitle(term).pipe(
          catchError(error => {
            // Handle the error here, e.g., log it or display an error message.
            this.handleError(error)
            // You can also return an empty observable or throw a new error if needed.
            return of([]); // Replace with your error handling logic.
          })
        )),
      );
    }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  async openModal(m: Movie) {
    console.log(m)
    this.modalConfig.title = `Review ${m.title}`;
    this.currentMovie = m; 
    this.reset();
    this.modalComponent.open();
  }

  

  onSubmit(){
    console.log(this.currentMovie)
    if (this.currentMovie == null || this.myReview.rating == null || this.myReview.review == null){
      console.error("You cannot submit!");
      this.modalComponent.close();
      return;
    }

    var request: ReviewRequest = {
      username: this.authService.currentUser(),
      movieId: this.currentMovie.movie_code,
      rating: this.myReview.rating,
      review: this.myReview.review,
    }

    this.movieService.addMovie(this.currentMovie).pipe(catchError((err ) => {
      this.handleError(err)
      return of()
    })).subscribe((res) => {
      console.log("successfully added movie");
      console.log(res);
    
      console.log(request)
    
      this.movieService.addReview(request).pipe(catchError((err ) => {
        this.handleError(err)
        return of()
      })).subscribe((res) => {
        console.log("successfully added review");
        console.log(res);
      });
    
    });

    // this.reset()
    return this.modalComponent.close()
  }

  private reset(){
    // this.currentMovie = null;
    this.myReview.rating = null;
    this.myReview.review = null;
  }


  private handleError(error: HttpErrorResponse) {
    console.log("movie.search.error");

    // console.log(this.form["username"].errors);
    // TODO: display different messages based on differnt error
    // Hidden field
    if (error.status == HttpStatusCode.Unauthorized){
      console.error("Unauthorized: ", error);
      alert("Your session expired. Please login. ")
      setTimeout(()=>{this.router.navigateByUrl("/login");}, 200);
      this.modalComponent.close()
    } else if (error.status == HttpStatusCode.Forbidden){
      console.error("Forbidden: ", error);
      alert("Your session expired. Please login. ")
      setTimeout(()=>{this.router.navigateByUrl("/login");}, 200);
      this.modalComponent.close()
    } 
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error);
    }

  }

}

