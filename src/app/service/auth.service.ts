import { HttpClient, HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../model/auth-request';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthResponse } from '../model/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`


  constructor(private http: HttpClient) {  }

  

  public signup(request: AuthRequest){
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request);
  }

  public signin(request: AuthRequest){
    console.log("auth.serice.signin");
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, request);
    // this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, request)
    // .subscribe(res => {
    //   console.log(res)
    //   return 200;
    // }, error => {return this.handleError(error)})
  }
}
