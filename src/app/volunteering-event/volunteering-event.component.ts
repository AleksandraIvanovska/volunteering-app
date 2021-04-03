import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { NavbarService } from '../navbar/navbar.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { VolunteeringEventsService } from '../volunteering-events/volunteering-events.service';
import { VolunteersService } from '../volunteers/volunteers.service';
import { VolunteeringEventService } from './volunteering-event.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';



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
  addInvitation: any = {};
  fullName: any = {};

  location_uuid = null;
  requirements_uuid = null;
  organization_uuid = null;


  eventHeaderLocationData: any = {};
  eventHeaderRequirementsData: any = {};
  eventHeaderAssets: any = [];
  eventHeaderContacts: any = [];

  isOrganization = null;
  volunteers:any = [];
  public uploader: FileUploader;
  public hasBaseDropZoneOver;
  loading: boolean = false;
  tmpFiles: any = {};

  applicationStatuses: any = [];
  selectedApplication: any = {};
  applicationStatus = null;
  isInvited = false;
  
   


  constructor(private voluneeringEventService: VolunteeringEventService, public toastr: ToastrService, public globals: AppComponent, 
    private activatedRoute: ActivatedRoute, private router: Router, private eventsService: VolunteeringEventsService,
    private navbarService: NavbarService, private organizationsService: OrganizationsService, private volunteersService: VolunteersService) {

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

    const URL = environment.backendURL + '/assets';
    this.uploader = new FileUploader({
      url: URL,
      isHTML5: true,
      method: 'POST',
      itemAlias: 'file',
      authTokenHeader: 'authorization',
      authToken: 'Bearer ' + localStorage.getItem('access-token'),
    });


    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) =>
    {
        this.loading = false;
        const obj = JSON.parse(response);
        if (status === 201) {
            let name = ""
            this.tmpFiles.uuid = obj.uuid;
            this.tmpFiles.url = obj.file_url;
          
              name = obj.original_name;
            
          
            this.tmpFiles.file = obj;
            // this.tmpFiles.file.name = name;
            this.tmpFiles.original_name = name;
            //this.job.files.push(this.tmpFiles);
            this.tmpFiles = {};
        } else {
            this.toastr.error('Something went wrong');
        }

        this.hasBaseDropZoneOver = false;
    };
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
     
        file.file.name =  file.file.name;
      
    };
    this.uploader.uploadAll();

   }

  ngOnInit(): void {
    //this.getEvent(this.globals.volunteeringEvent);
    this.isUserOrganization();
    this.uploader.onAfterAddingFile = (file: any) =>
    {
      file.withCredentials = false;
    };
  }


    // Angular2 File Upload
   public fileOverBase(e: any)
    {
        this.hasBaseDropZoneOver = e;
        this.uploader.uploadAll();
    }


    OnContentChangeFile(event)
    {
      this.uploader.uploadAll()
    }

    // OnContentChange(event)
    // {
    //     if (event.target.value) {
    //         this.loading = true;
    //         this.uploader.uploadAll();
    //     } else {
    //         this.loading = false;
    //     }
    // }

    afterFileisDrop()
    {
        this.loading = true;
    }

  getEvent(uuid) {
    this.voluneeringEventService.getEvent(this.globals.user.accessToken,uuid).subscribe(
      (data) => {
        console.log(data);
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
            this.volunteerApplicationExists();
            this.isVolunteerApplicationSTatusInvited();
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
        this.router.navigate(['']);
        this.globals.volunteeringEvent = null;
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
      var data: any = {};
      var status:any = {};
      status.value = 'request_sent';

      data.event_uuid = this.globals.volunteeringEvent;
      data.volunteer_id = this.globals.user.id;
      data.status = status ;

      this.voluneeringEventService.createApplication(this.globals.user.accessToken, data).subscribe(
        (data) => {
          this.toastr.success(data.message);
        },
        (error) => {
          this.toastr.error(error.message)
        })
  }

  inviteVolunteerToEvent(volunteer) {

    console.log(this.addInvitation.volunteer);
    
    var data: any = {};
    var status:any = {};
    status.value = 'invitation_sent';

    data.event_uuid = this.globals.volunteeringEvent;
    data.volunteer_id = volunteer;
    data.status = status ;

    this.voluneeringEventService.createApplication(this.globals.user.accessToken, data).subscribe(
      (data) => {
        this.toastr.success(data.message);
        this.getEvent(this.globals.volunteeringEvent)
        this.addInvitation = {};
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  getAllVolunteers() {
    this.volunteersService.getVolunteers(this.globals.user.accessToken).subscribe(
      (data) => {
        this.volunteers = data;
      }
    )
  }

  deleteAsset(asset_uuid) {
      this.voluneeringEventService.deleteAsset(this.globals.user.accessToken, this.globals.volunteeringEvent, asset_uuid).subscribe(
        (data) => {
          this.toastr.success(data.message);
        },
        (error) => {
          this.toastr.error(error.message)
        })
  }

  fileInputFile() {

  }

  createAsset() {

  }

  getApplicationStatuses() {
    this.voluneeringEventService.getApplicationStatuses(this.globals.user.accessToken).subscribe(
      (data) => {
        this.applicationStatuses = data;
      }
    )
  }

  editApplicationSelected(application) {
    this.selectedApplication =  application;
    console.log(this.selectedApplication)
  }


  editApplicationStatus(value, key) {
    let body;
    body = this.recreateJobObject(key, value)
    this.updateApplicationStatus(body);
  }

  updateApplicationStatus(body) {
    this.voluneeringEventService.updateApplicationStatus(this.globals.user.accessToken, body, this.selectedApplication.application_uuid).subscribe(
      (data) => {
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  approveApplication(application_uuid) {
    let status: any = {};
    status.status = 'request_approved';
    
    this.voluneeringEventService.updateApplicationStatus(this.globals.user.accessToken, status, application_uuid).subscribe(
      (data) => {
        this.getEvent(this.globals.volunteeringEvent);
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })

  }

  rejectApplication(application_uuid) {
    let status: any = {};
    status.status = 'request_rejected';

    this.voluneeringEventService.updateApplicationStatus(this.globals.user.accessToken, status, application_uuid).subscribe(
      (data) => {
        this.getEvent(this.globals.volunteeringEvent);
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  isVolunteerApplicationSTatusInvited() {
     this.isInvited = false;
     if(!this.isOrganization){
        this.eventHeaderData.volunteer_invitations.forEach(element => {
            if (element.user_id == this.globals.user.id) {
                if (element.status == 'Invitation sent') {
                    this.isInvited = true;
                }
            }
        });
        console.log(this.isInvited)
      return this.isInvited;
     }
  }

  volunteerApplicationExists() {
     this.applicationStatus = null;

     if (!this.isOrganization) {
      this.eventHeaderData.volunteer_invitations.forEach(element => {
          if (element.user_id == this.globals.user.id) {
              this.applicationStatus = element.status;
          }
      });
    }

    console.log(this.applicationStatus)
    return this.applicationStatus;
  }

  approveApplicationInvitation() {

    let application_uuid = null;
    let status: any = {};
    status.status = 'invitation_approved';

    this.eventHeaderData.volunteer_invitations.forEach(element => {
        if (element.user_id == this.globals.user.id) {
          application_uuid = element.application_uuid;
        }
     });


    this.voluneeringEventService.updateApplicationStatus(this.globals.user.accessToken, status, application_uuid).subscribe(
      (data) => {
        this.getEvent(this.globals.volunteeringEvent);
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })

  }

  rejectApplicationInvitation() {
    let application_uuid = null;
    let status: any = {};
    status.status = 'invitation_rejected';

    this.eventHeaderData.volunteer_invitations.forEach(element => {
      if (element.user_id == this.globals.user.id) {
        application_uuid = element.application_uuid;
      }
   });

    this.voluneeringEventService.updateApplicationStatus(this.globals.user.accessToken, status, application_uuid).subscribe(
      (data) => {
        this.getEvent(this.globals.volunteeringEvent);
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  addEeventToFavorites() {
    let body: any = {};

    body.volunteer_uuid = this.globals.user.uuid;
    body.event_uuid = this.globals.volunteeringEvent;

    console.log(body)

    this.voluneeringEventService.addEventToFavorite(this.globals.user.accessToken, body).subscribe(
      (data) => {
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }


  
}
