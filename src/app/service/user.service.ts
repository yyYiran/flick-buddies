import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../model/review';
import jwtDecode from 'jwt-decode';
import { Movie } from '../model/movie';

interface jwt {
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/account`;

  private _addedMovies: BehaviorSubject<Set<number>> = new BehaviorSubject(new Set());
  public readonly addedMovies = this._addedMovies.asObservable();
  

  constructor(private http: HttpClient) { 
    // this.loadInitialData();
    console.log(this._addedMovies)
  }

  async loadInitialData() {
    console.log("loadInitialData")
    this.getReviewedMovieIds(this.currentUser())
    .pipe(catchError(err => throwError(err)))
    .subscribe(
            res => {
              this._addedMovies.next(new Set(res));
            }
        );

  }
  


  public getReviews(username: string): Observable<Review[]>{
    const requestOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    })};
    return this.http.get<Review[]>(`${this.apiUrl}/${username}/reviews`, requestOptions);
  }

  private currentUser(){
    const token = localStorage.getItem("token")+''
    try {
      return jwtDecode<jwt>(token).sub;
    } catch(error){
      return ''
    }
    
  }

  public addId(movieId: number){
    this._addedMovies
    .next(this._addedMovies.getValue().add(movieId));
  }

  public getReviewedMovieIds(username:string): Observable<number[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<number[]>(`${this.apiUrl}/${username}/movies`, requestOptions);
  }

  public isMovieAdded(movieId: number): boolean{
    // console.log("isMovieAdded called");
    return this._addedMovies.getValue().has(movieId);
  }

  /**
   * getRecommendedMoviesFor
   * @param username 
   * @returns recommended movies for current user
   */
  public getRecommendedMoviesFor(username: string): Observable<Movie[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<Movie[]>(`${this.apiUrl}/${username}/recommendation/movies`, requestOptions);
  }


}
