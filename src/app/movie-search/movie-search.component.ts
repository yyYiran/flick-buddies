import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../model/movie';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, take, throwError } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import jwt_decode from "jwt-decode";
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  public movies$!: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  @ViewChild('modal') private modalComponent!: ModalComponent
  public modalConfig = {
    modalTitle: "nini",
    dismissButtonLabel: "Cancel",
    closeButtonLabel: "Save",
    onDismiss: ()=>true,
  }
  
  constructor(
    private authService: AuthService, 
    private movieService: MovieService, 
    private router: Router) {}
    
    ngOnInit(): void {
      console.log(this.authService.currentUser())
      // console.log(this.authService.currentUser);
      this.movies$ = this.movieService.searchByTitle("1984");
      // this.movies$ = this.searchTerms.pipe(
      //   // wait 300ms after each keystroke before considering the term
      //   debounceTime(300),
    
      //   // ignore new term if same as previous term
      //   distinctUntilChanged(),
    
      //   // switch to new search observable each time the term changes
      //   switchMap((term: string) => this.movieService.searchByTitle(term).pipe(
      //     catchError(error => {
      //       // Handle the error here, e.g., log it or display an error message.
      //       this.handleError(error)
      //       // You can also return an empty observable or throw a new error if needed.
      //       return of([]); // Replace with your error handling logic.
      //     })
      //   )),
      // );
    }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  async openModal() {
    return await this.modalComponent.open()
  }

  private handleError(error: HttpErrorResponse) {
    console.log("auth.serice.error");

    // console.log(this.form["username"].errors);
    // TODO: display different messages based on differnt error
    // Hidden field
    if (error.status == HttpStatusCode.Unauthorized){
      console.error("Unauthorized: ", error);
      this.router.navigateByUrl("");
    } else if (error.status == HttpStatusCode.Forbidden){
      console.error("Forbidden: ", error);
      alert("Your session expired. Please login. ")
      setTimeout(()=>{this.router.navigateByUrl("");}, 500);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error);
    }

  }

}

