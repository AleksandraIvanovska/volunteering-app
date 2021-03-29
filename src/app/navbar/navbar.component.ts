import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { OrganizationsService } from '../organizations/organizations.service';
import { CommunicationService } from '../service/notification.service';
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
		    
	    },
	    deadline: null,
	    expired: {
		    
	    },
	    status: {
		    
	    },
	    volunteers_needed: null,
	    spaces_available : null,
	    great_for: {
		    
	    },
	    group_size: {
		    
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

  register: any = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    role: null
  }
  login: any = {
    email: null,
    password: null,
  }
  forgotPassword: any = {
    email: null
  }
  resetPassword: any = {
    email: null,
    token: localStorage.getItem('access_token'),
    password: null,
    password_confirmation: null
  }

  selectOrganization: null;
  selectVolunteer: null;

  isOrganization: null;

  notifications: any = [];
  unreadNotification: number;





  constructor(private router: Router, private route: ActivatedRoute, private navbarService: NavbarService, 
    public toastr: ToastrService, private organizationsService: OrganizationsService,
    private eventsService: VolunteeringEventsService, public globals: AppComponent, 
    public communicationService: CommunicationService
    ) { 

      // this.communicationService.onNotificationSelected$.takeWhile(() => this.componentAlive)
      // .subscribe((notificationCounter) =>
      // {
      //   notificationCounter ? this.unreadNotification = 0 : this.unreadNotification -= 1;
      // });
    }

  ngOnInit(): void {
    this.initNewEvent();

    if (localStorage.getItem('access-token')) {
      this.show.user = true;
      this.globals.user = {
        emailVerifiedAt: localStorage.getItem('email_verified_at'),
        accessToken: localStorage.getItem('access-token'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        id: localStorage.getItem('id'),
        uuid: localStorage.getItem('uuid')
      }
      this.isUserOrganization();
      console.log(this.globals)
    }
    
    this.getNotification();
  }

  onNewEvent() {

    console.log(this.addEvent);
    if(this.addEvent.title) { //organizacijata se zima sama od Auth:usero id to
      this.navbarService.addEvent(this.globals.user.accessToken,this.addEvent)
      .subscribe(
        (data) => {
          this.initNewEvent();
            this.toastr.success(data.message);
            //this.toastr.success('Volunteering Event successfully created!');
            document.getElementById("closeNewEvent").click();
        }
      ,
      (error) => {
       // this.initNewEvent();
        //this.toastr.success('Volunteering Event successfully created!');
        document.getElementById("closeNewEvent").click();
        this.toastr.error(error.message)
      })
    }
    else {
      this.toastr.warning('Please fill the mandatory fields');
    }
}

getAllCategories() {
  this.organizationsService.getCategories(this.globals.user.accessToken).subscribe(
    (data) => {
      this.categories = data;
    }
  )
}

getAllCities() {
  if (this.seletedCountry) {
    this.organizationsService.getcities(this.globals.user.accessToken,this.seletedCountry).subscribe(
      (data) => {
        this.cities = data.slice(0, 1000);
       // this.cities = data;
      }
    )
  }
  else {
    this.organizationsService.getcities(this.globals.user.accessToken).subscribe(
      (data) => {
        this.cities = data.slice(0, 1000);
       // this.cities = data;
      }
    )
  }
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


openContact(uuid)
  {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: {
          'volunteer_parent': 'volunteer-drawer', 'type': 'view-volunteer',
          'volunteer_uuid': uuid
        }
      });
  }



  async loginUser() {
    if (this.login.email && this.login.password) {
      if (!this.validateEmail(this.login.email)) {
        this.toastr.error("Invalid email")
      } else {
        this.navbarService.login(this.login).subscribe(
          (response: any) => {
            if (response.access_token) {
              localStorage.setItem('access-token', response.access_token);
              localStorage.setItem('email', response.user.email);
              localStorage.setItem('name', response.user.name);
              localStorage.setItem('id', response.user.id);
              localStorage.setItem('email_verified_at', response.user.email_verified_at);
              this.globals.user = {
                emailVerifiedAt: response.user.email_verified_at,
                accessToken: response.access_token,
                name: response.user.name,
                email: response.user.email,
                id: response.user.id,
                uuid: response.uuid
              }
              this.toastr.success('Welcome ' + response.user.name);
              document.getElementById("close").click();
              this.show.user = true;
              this.show.profile = false;
            }
          },
          (error) => {
            this.toastr.error(error.message)
          })
      }
    } else {
      this.toastr.error("All fields are mandatory")
    }

    if (this.register.name != null &&
      this.register.email != null) {
      await timer(1000).pipe(take(1)).toPromise();

      let body: any = {};
      this.isUserOrganization();
      await timer(1000).pipe(take(1)).toPromise();
  
      if (this.isOrganization) {
  
        body.user_id = this.globals.user.id;
        body.name = this.register.name;
  
        this.navbarService.addOrganization(this.globals.user.accessToken, body).subscribe(
          (data) => {
            this.globals.user.uuid = data.uuid
            this.toastr.success('Successfully registered user');
          },
          (error) => {
            this.toastr.error(error.message)
          })
      
      }
      else {
        body.user_id = this.globals.user.id;
        body.first_name = this.register.name;
  
        console.log(body);
  
        this.navbarService.addVolunteer(this.globals.user.accessToken, body).subscribe(
          (data) => {
            this.globals.user.uuid = data.uuid
            this.toastr.success('Successfully registered user');
          },
          (error) => {
            this.toastr.error(error.message)
          })
      }
  
      this.register.name = null,
      this.register.email = null,
      this.register.password = null,
      this.register.password_confirmation = null,
      this.register.role = null

  
    }

    

  }

  registerUser() {
    if (this.register.name && this.register.email && this.register.password && this.register.password_confirmation && (this.selectVolunteer || this.selectOrganization)) {
      if (this.selectOrganization) {
        this.register.role = "organization";
      }
      if (this.selectVolunteer) {
        this.register.role = "volunteer";
      }

      console.log(this.register);
      
      if (!this.validateEmail(this.register.email)) {
        this.toastr.error("Invalid email")
      } else if (this.register.password != this.register.password_confirmation) {
        this.toastr.error("Passwords don't match")
      } else {
        this.navbarService.register(this.register).subscribe(
          (data) => {
            this.login.email = this.register.email;
            this.login.password = this.register.password
            document.getElementById("login").click();
            this.toastr.success('Successfully registered user');          
          },
          (error) => {
            this.toastr.error(error.message)
          })
      }
    } else {
      this.toastr.error("All fields are mandatory")
    }
  
  }

  validateEmail(email) {
    let validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validEmailRegex.test(email);
  }

  logoutUser() {
    this.show.user = false;
    this.isOrganization = null;

    this.globals.user = {
      emailVerifiedAt: null,
      accessToken: null,
      name: null,
      email: null,
      id: null
    }
    localStorage.clear()
    this.router.navigate(['']);
  }

  // resetPasswordTraveller() {
  //   if (this.resetPassword.old_password && this.resetPassword.password && this.resetPassword.password_confirmation) {
  //     if (this.resetPassword.password != this.resetPassword.password_confirmation) {
  //       this.toastr.error("Passwords don't match")
  //     } else {
  //       this.resetPassword.email = this.globals.user.email;
  //       this.resetPassword.token = localStorage.getItem('access_token');
  //       this.navbarService.resetPassword(this.resetPassword).subscribe(
  //         (data) => {
  //           document.getElementById("closeModal").click();
  //           this.toastr.success('Successfully changed password');
  //         },
  //         (error) => {
  //           this.toastr.error(error.message)
  //         })
  //     }
  //   } else {
  //     this.toastr.error("All fields are mandatory")
  //   }
  // }

  // forgotPasswordTraveller() {
  //   if (this.forgotPassword.email) {
  //     if (!this.validateEmail(this.forgotPassword.email)) {
  //       this.toastr.error("Invalid email")
  //     } else {
  //       this.navbarService.forgotPassword(this.forgotPassword).subscribe(
  //         (data) => {
  //           this.login.email = this.register.email;
  //           document.getElementById("login").click();
  //           this.toastr.success('We have e-mailed your password reset link!');
  //         },
  //         (error) => {
  //           this.toastr.error(error.message)
  //         })
  //     }
  //   } else {
  //     this.toastr.error("All fields are mandatory")
  //   }
  // }

  // verifyEmailTraveller() {
  //   this.navbarService.verifyEmail(this.globals.user.accessToken).subscribe(
  //     (data) => {
  //       this.toastr.success('We have e-mailed you confirmation link!');
  //     },
  //     (error) => {
  //       this.toastr.error(error.message)
  //     })
  // }

  forgotPasswordTraveller() {

  }
  
  resetPasswordTraveller() {
    
  }

  isUserOrganization() {
    this.navbarService.getIsUserOrganization(this.globals.user.accessToken).subscribe(
      (data) => {
        this.isOrganization = data;
      }
    )
  }


  readAllNotification()
  {
    this.navbarService.readAllNotification(this.globals.user.accessToken)
      .subscribe(
        (data) =>
        {
          this.emitToNotification('read_all');
          this.unreadNotification = 0;
        }
      )
  }

  notificationAction(notification, i)
  {
    if (!this.notifications[i].is_read) {
      this.unreadNotification -= 1;
      this.emitToNotification(notification.uuid);
    }
    this.notifications[i].is_read = 1;
    this.navbarService.markAsRead(this.globals.user.accessToken,notification.uuid).subscribe();
    if (notification.navigation_url) {
      if (notification.is_route) {
        window.open(notification.navigation_url);
      } else {
        let params = JSON.parse('{"' + decodeURI(notification.navigation_url.replace(/\?/g, '')).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        this.router.navigate([],
          {
            relativeTo: this.route,
            queryParams: params
          });
      }
    }
  }

  getNotification()
  {
    console.log("Notifications od navbar povikano")
    this.navbarService.getNotifications(this.globals.user.accessToken)
      .subscribe(
        (data) =>
        {
          console.log("Vleze vo data da zeme")
          this.notifications = data.events;
          this.unreadNotification = data.eventsCount;
        }
      )
  }

  emitToNotification(notification: any)
  {
    this.communicationService.emitToNotification(notification);
  }


}
