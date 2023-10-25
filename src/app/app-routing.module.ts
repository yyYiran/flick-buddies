import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'account', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
