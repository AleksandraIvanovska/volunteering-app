import { Component, OnInit } from '@angular/core';
import { VolunteeringEventsService } from './volunteering-events.service';
import { Router } from '@angular/router';
import { OrganizationsService } from '../organizations/organizations.service';
import { VolunteeringEventService } from '../volunteering-event/volunteering-event.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-volunteering-events',
  templateUrl: './volunteering-events.component.html',
  styleUrls: ['./volunteering-events.component.css']
})
export class VolunteeringEventsComponent implements OnInit {

  volunteering_events: [];
  search: null;
  selectedCategory: null;
  selectedCity: null;
  selectedCountry: null;
  selectedOrganization: null;
  organizations: any = [];
  cities: any = [];
  countries: any = [];
  categories: any = [];
  selectVirtial = null;
  start_date: any = null;
  greatFor: any = [];
  durations: any = [];
  selectedGreatFor: null;
  selectedDuration: null;
  event = null;
  eventHeaderData: any = {};


  constructor(private eventsService: VolunteeringEventsService, private router: Router, private organizationsService: OrganizationsService,
    private voluneeringEventService: VolunteeringEventService, public toastr: ToastrService, public globals: AppComponent) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.getAllEvents();
    console.log(this.getAllEvents());

  }

  getAllEvents() {
    this.eventsService.getEvents(this.globals.user.accessToken).subscribe(
      (data) => {
        this.volunteering_events = data;
        //console.log(this.volunteering_events);
      }
    )
  }

  applySearch(applySearch) {
    this.eventsService.getEvents(this.globals.user.accessToken,applySearch, null, null, null, null, null, null, null, null).subscribe(
      (data) => {
        this.volunteering_events = data;
      }
    )
  }


  clearFilters() {
    this.getAllEvents();
    this.selectedGreatFor = null;
    this.selectedDuration = null;
    this.start_date = null;
    this.selectVirtial = null;
    this.selectedOrganization = null;
    this.selectedCategory = null;
    this.selectedCity = null;
    this.selectedCountry = null;
    this.search = null;
  }
  



  getAllCities() {
    this.organizationsService.getcities(this.globals.user.accessToken).subscribe(
      (data) => {
        this.cities = data.slice(0, 1000);
        // this.cities = data;
      }
    )
  }

  getAllCountries() {
    this.organizationsService.getCountries(this.globals.user.accessToken).subscribe(
      (data) => {
        this.countries = data;
      }
    )
  }

  getAllCategories() {
    this.organizationsService.getCategories(this.globals.user.accessToken).subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      }
    )
  }

  getAllOrganizations() {
    this.organizationsService.getOrganizations(this.globals.user.accessToken).subscribe(
      (data) => {
        this.organizations = data;
        // console.log(this.organizations);
        // this.organizations = data.slice(0, 6);

      }
    )
  }

  getAllDurations() {
    this.eventsService.getDurations(this.globals.user.accessToken).subscribe(
      (data) => {
        this.durations = data;
      }
    )
  }

  getAllGreatFor() {
    this.eventsService.getGreatFor(this.globals.user.accessToken).subscribe(
      (data) => {
        this.greatFor = data;
      }
    )
  }

  applyFilter(selectedCategory, selectedCity, selectedCountry, selectedOrganization, selectVirtial, start_date, selectedDuration, selectedGreatFor) {
    this.eventsService.getEvents(this.globals.user.accessToken,null, selectedCity, selectedCountry, selectedCategory, selectedOrganization, selectVirtial, start_date, selectedDuration, selectedGreatFor).subscribe(
      (ev) => {
        this.volunteering_events = ev;
      }
    )
  }

  openEventByUuid(uuid) {
    this.globals.volunteeringEvent = uuid;
    this.router.navigate(['/volunteeringEvent'],
      {
        queryParams: {
          uuid: uuid
        }
      });
  }

}
