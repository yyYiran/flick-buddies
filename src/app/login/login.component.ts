import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }


    get form(){return this.loginForm.controls}
  private getField(field: string){ return this.form[field].value }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: "peter",
      password: "Peter123!"
    })
    
    // this.authService.register({username: "!!!Boubdusvbsd", password:"AliceLove&Bob1212"});
  }

  private handleError(error: HttpErrorResponse) {
    console.log("login: auth.serice.error");

    // console.log(this.form["username"].errors);
    // TODO: display different messages based on differnt error
    // Hidden field
    if (error.status === HttpStatusCode.BadRequest) {
      console.error('Bad request: ', error.error);
    } else if (error.status === HttpStatusCode.Conflict){
      console.error('Conflict: ', error.error);
    } else if (error.status == HttpStatusCode.Unauthorized){
      console.error("Unauthorized: ", error.error["message"]);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  onSignin(){
    // console.log("signing in"+ this.getField("username"));
    this.authService.signin({
      username: this.getField("username"),
      password: this.getField("password"),
    }).subscribe(res => {
      // console.log("signin: " + res);
      localStorage.setItem("token", res["access_token"]);
      this.router.navigateByUrl("/");
      // TODO: router navigate to main page
    }, error => this.handleError(error))
  }


  // .subscribe( res => {
  //   console.log(res["access_token"]);
  //   localStorage.setItem("token", res["access_token"]);
  // })

  onSignup() {
    this.authService.signup({
      username: this.getField("username"),
      password: this.getField("password"),
    }).subscribe(res => {
      console.log("signup: " + res);
      // localStorage.setItem("token", res["access_token"]);
    }, error => this.handleError(error))
  }

}
