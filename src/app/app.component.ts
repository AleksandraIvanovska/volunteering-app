import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'volunteering-app';
  products: null
  volunteeringEvent: null
  organization: null
  volunteer: null

  loggedUuid: null;

  user: any = {
    emailVerifiedAt: null,
    accessToken: null,
    name: null,
    email: null,
    id: null,
    uuid: null
  }

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }



}
