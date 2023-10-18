import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: MovieSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
