import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Movie } from '../model/movie';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../model/review';
import { ReviewRequest } from '../model/review.request';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}/movie`;
  
  constructor(private http: HttpClient) { }

  public addMovie(movie: Movie):Observable<Movie>{
    console.log("add movie called");
    console.log(movie);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const requestOptions = { headers: headers };
    return this.http.post<Movie>(this.apiUrl, movie, requestOptions);
  }

  public addReview(request: ReviewRequest): Observable<Review>{
    console.log("add review called with request: ");
    console.log(request);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const requestOptions = { headers: headers };
    return this.http.post<Review>(`${this.apiUrl}/${request.movieId}/review`, request, requestOptions);
  }
  
  public searchByTitle(query: string): Observable<Movie[]> {
    console.log("searchByTitle called")
    if (!query.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const requestOptions = { headers: headers };
    // console.log(localStorage.getItem("token"));
    return this.http.get<Movie[]>(`${this.apiUrl}?q=${query}`, requestOptions);
  }

  // private handleError(error: HttpErrorResponse): Observable<any> {
  //   console.log("search: serice.error");

  //   if (error.status == HttpStatusCode.Unauthorized){
  //     console.error("Unauthorized: ", error);
  //   } else if (error.status == HttpStatusCode.Forbidden){
  //     console.error("Forbidden: ", error);
  //   }
  //   else {
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }
  

  // public test(){
  //   console.log("auth.serice.signin");
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin':'*',
  //     'Authorization': `Bearer ${localStorage.getItem("token")}`
  //   });
  //   console.log(this.http.get(`${this.apiUrl}/1/watchers`))
  // }
}
