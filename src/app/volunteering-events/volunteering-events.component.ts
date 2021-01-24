import { Component, OnInit } from '@angular/core';
import { VolunteeringEventsService } from './volunteering-events.service';
import { Router } from '@angular/router';
import { OrganizationsService } from '../organizations/organizations.service';
import { VolunteeringEventService } from '../volunteering-event/volunteering-event.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-volunteering-events',
  templateUrl: './volunteering-events.component.html',
  styleUrls: ['./volunteering-events.component.css']
})
export class VolunteeringEventsComponent implements OnInit {

  volunteering_events:[];
  search: null;
  selectedCategory: null;
  selectedCity: null;
  selectedCountry: null;
  selectedOrganization: null;
  organizations: any = [];
  cities : any = [];
  countries : any = [];
  categories : any = [];
  selectVirtial = null;
  start_date : any = null;
  greatFor: any = [];
  durations: any = [];
  selectedGreatFor: null;
  selectedDuration: null;
  event = null;
  eventHeaderData: any = {};
  

  constructor(private eventsService: VolunteeringEventsService, private router: Router, private organizationsService: OrganizationsService,
    private voluneeringEventService: VolunteeringEventService, public toastr: ToastrService) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.getAllEvents();
    console.log(this.getAllEvents());

  }

  getAllEvents() {
    this.eventsService.getEvents().subscribe(
            (data) => {
              this.volunteering_events = data;
              //console.log(this.volunteering_events);
         }
    )
  }

  applySearch(applySearch) {
    this.eventsService.getEvents(applySearch, null, null, null, null, null, null, null, null).subscribe(
      (data) =>
      {
        this.volunteering_events = data;
      }
   )
 }


 clearFilters() {
  this.getAllEvents();
 }



getAllCities() {
  this.organizationsService.getcities().subscribe(
    (data) => {
      this.cities = data.slice(0, 1000);
     // this.cities = data;
    }
  )
}

getAllCountries() {
  this.organizationsService.getCountries().subscribe(
    (data) => {
      this.countries = data;
    }
  )
}

getAllCategories() {
  this.organizationsService.getCategories().subscribe(
    (data) => {
      this.categories = data;
      console.log(this.categories);
    }
  )
}

getAllOrganizations() {
  this.organizationsService.getOrganizations().subscribe(
    (data) => {
      this.organizations = data;
     // console.log(this.organizations);
     // this.organizations = data.slice(0, 6);

    }
  )
}

getAllDurations() {
  this.eventsService.getDurations().subscribe(
    (data) => {
      this.durations = data;
    }
  )
}

getAllGreatFor() {
  this.eventsService.getGreatFor().subscribe(
    (data) => {
      this.greatFor = data;
    }
  )
}

applyFilter(selectedCategory, selectedCity, selectedCountry, selectedOrganization, selectVirtial, start_date, selectedDuration, selectedGreatFor) {
  this.eventsService.getEvents(null, selectedCity, selectedCountry, selectedCategory, selectedOrganization, selectVirtial, start_date, selectedDuration, selectedGreatFor).subscribe(
    (ev) => 
    {
      this.volunteering_events = ev;
    }
  )
}

openEventByUuid(uuid) {

  this.router.navigate(['/volunteeringEvent'],
            {
                queryParams: {
                    uuid: uuid
                }
            });
}

}
