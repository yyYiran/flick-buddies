import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie.details/movie.details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  // {path: 'movie/:title', component: MovieDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
