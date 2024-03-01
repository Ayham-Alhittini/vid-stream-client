import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.css']
})
export class NavSearchComponent{
  searchContent: '';

  constructor(private router: Router){}

  submit() {
    this.router.navigateByUrl('/results?search_query=' + this.searchContent);
  }
}
