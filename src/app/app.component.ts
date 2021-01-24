import { Component } from '@angular/core';
//import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
//import { TestService } from './test.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'volunteering-app';
  products: null

  constructor(
   // private route: ActivatedRoute,
   // private testService: TestService,
  ) { }
}
