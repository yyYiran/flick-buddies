import { Component, OnInit } from '@angular/core';
import { MovieSearchComponent } from '../movie-search/movie-search.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // console.log('!!navbar ngOnInit')
  }

}
