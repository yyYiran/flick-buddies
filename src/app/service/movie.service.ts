import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../model/movie';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}/movie`
  

  constructor(private http: HttpClient) { }
  
  public searchByTitle(query: string): Observable<Movie[]> {
    if (!query.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const requestOptions = { headers: headers };
    console.log(localStorage.getItem("token"));
    return this.http.get<Movie[]>(`${this.apiUrl}?q=${query}`, requestOptions);
  }

  public test(){
    console.log("auth.serice.signin");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    console.log(this.http.get(`${this.apiUrl}/1/watchers`))
  }
}
