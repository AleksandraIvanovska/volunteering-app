import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { NavbarService } from '../navbar/navbar.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { VolunteeringEventsService } from '../volunteering-events/volunteering-events.service';
import { VolunteeringEventService } from './volunteering-event.service';

@Component({
  selector: 'app-volunteering-event',
  templateUrl: './volunteering-event.component.html',
  styleUrls: ['./volunteering-event.component.css']
})
export class VolunteeringEventComponent implements OnInit {

  eventHeaderData: any = {};
  categories : any = [];
  cities : any = [];
  countries : any = [];
  organization_contacts: any = [];
  durations : any = [];
  eventStatuses : any = [];
  seletedCountry: null;
  greatFor: any = [];
  groupSize: any = [];

  location_uuid = null;
  requirements_uuid = null;
  organization_uuid = null;


  eventHeaderLocationData: any = {};
  eventHeaderRequirementsData: any = {};
  eventHeaderAssets: any = [];
  eventHeaderContacts: any = [];

  isOrganization = null;

  

  constructor(private voluneeringEventService: VolunteeringEventService, public toastr: ToastrService, private globals: AppComponent, 
    private activatedRoute: ActivatedRoute, private router: Router, private eventsService: VolunteeringEventsService,
    private navbarService: NavbarService, private organizationsService: OrganizationsService) {

    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      let checkURL = this.router.parseUrl(this.router.url).root.children.primary
     // if (checkURL && checkURL.segments[0].toString() == 'volunteeringEvent') {
        this.activatedRoute.queryParams.subscribe(params => {
          if (params.uuid) {
            this.globals.volunteeringEvent = params.uuid            
            this.getEvent(params.uuid)
          }
        })
    });

   }

  ngOnInit(): void {
    //this.getEvent(this.globals.volunteeringEvent);
    this.isUserOrganization();
  }


  getEvent(uuid) {
    this.voluneeringEventService.getEvent(this.globals.user.accessToken,uuid).subscribe(
      (data) => {
        console.log(data);
       // if (data.length) { 
          this.eventHeaderData = data;       
          if (data.volunteering_location) {
            this.eventHeaderLocationData = data.volunteering_location;
            this.location_uuid = data.volunteering_location.uuid;   
          }
          if (data.requirements) {
            this.eventHeaderRequirementsData = data.requirements;
            this.requirements_uuid = data.requirements.uuid;
          }
            this.eventHeaderAssets = data.assets;
            this.eventHeaderContacts = data.contacts;
            this.organization_uuid = data.organization.uuid;
          
          
      // }
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  downloadCV(file)
  {
    window.open(file, '_blank');
  }


  editEvent(value, key) {
    let body;
    body = this.recreateJobObject(key, value)
    console.log(this.eventHeaderData);
    this.updateEvent(body);
  }


  editEventLocation(value, key) {
      let body;
      body = this.recreateJobObject(key, value)
      this.updateEventLocation(body);
  }


  editEventRequirements(value, key) {
    let body;
    body = this.recreateJobObject(key, value)
    this.updateEventRequirements(body);
}

  recreateJobObject(key, value) {
    if (key.indexOf('.') > -1) {
      var keyValue = key.substr(0, key.indexOf('.'));
      var obj = {};
      obj[keyValue] = {
        [key.split('.').pop()]: value
      }
      return obj;
    }
    else {
      return {
        [key]: value
      }
    }
  }


  updateEvent(body) {
    this.voluneeringEventService.updateEvent(this.globals.user.accessToken,body, this.globals.volunteeringEvent).subscribe(
      (data) => {
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  updateEventLocation(body) {
    this.voluneeringEventService.updateEventLocation(this.globals.user.accessToken,body, this.location_uuid).subscribe(
      (data) => {
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  updateEventRequirements(body) {
    this.voluneeringEventService.updateEventRequirements(this.globals.user.accessToken,body, this.requirements_uuid).subscribe(
      (data) => {
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }


  deleteEvent(){
    this.voluneeringEventService.deleteEvent(this.globals.user.accessToken,this.globals.volunteeringEvent).subscribe(
      (data) => {
        this.eventHeaderData = {}
        this.globals.volunteeringEvent = null;
        this.router.navigate(['']);
        document.getElementById('closeDelete').click();
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }


  getAllCategories() {
    this.organizationsService.getCategories(this.globals.user.accessToken).subscribe(
      (data) => {
        this.categories = data;
      }
    )
  }
  
  getAllCities() {
    this.organizationsService.getcities(this.globals.user.accessToken).subscribe(
      (data) => {
        this.cities = data.slice(0, 100);
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
  
  getAllDurations() {
    this.eventsService.getDurations(this.globals.user.accessToken).subscribe(
      (data) => {
        this.durations = data;
      }
    )
  }
  
  getAllStatuses() {
    this.navbarService.getStatuses(this.globals.user.accessToken).subscribe(
      (data) => {
        this.eventStatuses = data;
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
  
  getAllGroupSize() {
    this.navbarService.getGroupSize(this.globals.user.accessToken).subscribe(
      (data) => {
        this.groupSize = data;
      }
    )
  } 

  getOrganizationContacts() {
    this.organizationsService.getOrganizationContacts(this.globals.user.accessToken,this.organization_uuid).subscribe(
      (data) => {
        this.organization_contacts = data;
      }
    )
  }

  editEventContacts() {
    let ev_contacts = []
    this.eventHeaderContacts.forEach(element => {
      ev_contacts.push(element.value)
    });
    
    // this.voluneeringEventService.updateEventContacts(ev_contacts, this.).subscribe(
    //   (data) => {
    //     this.toastr.success(data.message);
    //   },
    //   (error) => {
    //     this.toastr.error(error.message)
    //   })

  }

  isUserOrganization() {
    this.navbarService.getIsUserOrganization(this.globals.user.accessToken).subscribe(
      (data) => {
        this.isOrganization = data;
      }
    )
  }

  applyToEvent() {
    
  }
  
}
