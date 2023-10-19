import { HttpClient, HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../model/auth.request';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { AuthResponse } from '../model/auth.response';
import jwtDecode from 'jwt-decode';


interface jwt {
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {    }

  public currentUser(){
    return jwtDecode<jwt>(localStorage.getItem("token")+'').sub;
    
  }

  public signup(request: AuthRequest){
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request);
  }

  public signin(request: AuthRequest){
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, request);
  }
}
