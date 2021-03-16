import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { VolunteeringEventsService } from '../volunteering-events/volunteering-events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  volunteering_events:[];


  constructor(private eventsService: VolunteeringEventsService, private globals: AppComponent) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getEvents(this.globals.user.accessToken).subscribe(
            (data) => {
              this.volunteering_events =  data.slice(0, 3);
              //console.log(this.volunteering_events);
         }
    )
  }

}
