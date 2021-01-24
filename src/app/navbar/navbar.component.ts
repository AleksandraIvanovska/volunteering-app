import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrganizationsService } from '../organizations/organizations.service';
import { VolunteeringEventsService } from '../volunteering-events/volunteering-events.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  show: any = {
    user: false,
  }
  resources: any = {
    category: [],
    places: [],
    priceLevel: [],
    agendas: []
  }

  addEvent: any = {}
  initNewEvent() {
    this.addEvent = {
      title: null,
	    description: null,
	    organization: null,
	    category: {
		    value: null,
		    description: null
	    },
	    is_virtual: false,
	    ongoing: false,
	    start_date: null,
	    end_date: null,
	    estimated_hours: null,
	    average_hours_per_day: null,
	    duration: {
		    value: null,
		    description: null
	    },
	    deadline: null,
	    expired: {
		    value: null,
		    description: null
	    },
	    status: {
		    value: null,
		    description: null
	    },
	    volunteers_needed: null,
	    spaces_available : null,
	    great_for: {
		    value: null,
		    description: null
	    },
	    group_size: {
		    value: null,
		    description: null
	    },
	    sleeping: null,
	    food: null,
	    transport: null,
	    benefits: null,
	    skills_needed: [],
	    tags: [],
      notes: null,
      location: {
        city: null,
        address: null,
        postal_code: null
      },
      requirements: {
        driving_license: null,
        min_age: null,
        other: null
      }
    }
  }
  categories : any = [];
  cities : any = [];
  countries : any = [];
  durations : any = [];
  eventStatuses : any = [];
  seletedCountry: null;
  greatFor: any = [];
  groupSize: any = [];
  vol_event: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private navbarService: NavbarService, 
    public toastr: ToastrService, private organizationsService: OrganizationsService,
    private eventsService: VolunteeringEventsService,) { }

  ngOnInit(): void {
    this.initNewEvent();
    this.show.user = true;
    // if (localStorage.getItem('access-token')) {
    //   this.show.user = true;
    //   this.globals.user = {
    //     emailVerifiedAt: localStorage.getItem('email_verified_at'),
    //     accessToken: localStorage.getItem('access-token'),
    //     name: localStorage.getItem('name'),
    //     email: localStorage.getItem('email'),
    //     id: localStorage.getItem('id')
    //   }
    //   console.log(this.globals)
    //   this.getAgendas();
  }

  onNewEvent() {

    console.log(this.addEvent);
    if(this.addEvent.title) { //organizacijata se zima sama od Auth:usero id to
      this.navbarService.addEvent(this.addEvent,null)
      .subscribe(
        (data) => {
          this.initNewEvent();
            this.toastr.success(data.message);
            document.getElementById("closeNewPlace").click();
        }
      ,
      (error) => {
        this.initNewEvent();
        this.toastr.success('Place successfully created!');
        document.getElementById("closeNewPlace").click();
        this.toastr.error(error.message)
      })
    }
    else {
      this.toastr.warning('Please fill the mandatory fields');
    }
}

getAllCategories() {
  this.organizationsService.getCategories().subscribe(
    (data) => {
      this.categories = data;
    }
  )
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

getAllDurations() {
  this.eventsService.getDurations().subscribe(
    (data) => {
      this.durations = data;
    }
  )
}

getAllStatuses() {
  this.navbarService.getStatuses().subscribe(
    (data) => {
      this.eventStatuses = data;
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

getAllGroupSize() {
  this.navbarService.getGroupSize().subscribe(
    (data) => {
      this.groupSize = data;
    }
  )
} 



}
