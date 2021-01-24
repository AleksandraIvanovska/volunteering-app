import { Component, OnInit } from '@angular/core';
import { VolunteeringEventsService } from '../volunteering-events/volunteering-events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  volunteering_events:[];

  constructor(private eventsService: VolunteeringEventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getEvents().subscribe(
            (data) => {
              this.volunteering_events =  data.slice(0, 3);
              //console.log(this.volunteering_events);
         }
    )
  }

}
