import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/account`;
  constructor(private http: HttpClient) { 

  }

  public getReviews(username: string): Observable<Review[]>{
    const requestOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    })};
    return this.http.get<Review[]>(`${this.apiUrl}/${username}/reviews`, requestOptions);
  }


}
