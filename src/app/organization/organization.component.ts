import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrganizationService } from './organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizationData: any = {};
  organizationCategories: any = [];
  organizationComments: any = [];
  organizationContacts: any = [];
  organizationEvents: any = [];


  categories : any = [];
  
  pagination: any = {
    current: 1,
    max: []
  }
  resources: any = {
    comments: [],
    category: []
  }

  comment: any = {
    body: null
  }
  newComment:any = {
    description: null,
    organization_uuid: null
  }

  showAddComment = false;
  showAddContact = false;
  cities : any = [];

  addContact: any = {}
  initNewContact() {
    this.addContact = {
      organization_uuid: this.globals.organization,
      first_name: null,
      middle_name: null,
      last_name: null,
      photo: null,
      phone_number: null,
      email: null,
      facebook: null,
      twitter: null,
      linkedIn: null,
      skype: null,
      dob: null
    }
  }



  constructor(private organizationService: OrganizationService, private organizationsService: OrganizationsService,
    public toastr: ToastrService, public globals: AppComponent, private activatedRoute: ActivatedRoute, private router: Router) { 

      router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        let checkURL = this.router.parseUrl(this.router.url).root.children.primary
          this.activatedRoute.queryParams.subscribe(params => {
            if (params.uuid) {
              console.log(params.uuid);
              this.globals.organization = params.uuid            
              this.getOrganization(params.uuid)
            }
          })
      });
    }

  ngOnInit(): void {

    this.initNewContact();
  }

  getOrganization(uuid) {
    this.organizationService.getOrganization(this.globals.user.accessToken,uuid).subscribe(
      (data) => {
        console.log(data); 
          this.organizationData = data;   
          if (data.categories) {
              this.organizationCategories = data.categories;
          }    
          if (data.comments) {
            this.organizationComments = data.comments;

            if (this.organizationComments.length) {
              this.pagination.max = Array(Math.ceil(this.organizationComments.length / 2)).fill(1).map((x, i) => i + 1);
              this.resources.comments = this.organizationComments.slice(0, 2);
            }
          }

          if (data.contacts) {
            this.organizationContacts = data.contacts;
          }

          if (data.volunteeringEvents) {
            this.organizationEvents =  data.volunteeringEvents;
          }

         

      },
      (error) => {
        this.toastr.error(error.message)
      })
  }


  paggination(i) {
    this.pagination.max = Array(Math.ceil(this.organizationComments.length / 2)).fill(1).map((x, i) => i + 1);
    this.resources.comments = this.organizationComments.slice((i - 1) * 2, i * 2);
    this.pagination.current = i;
  }

  addCommentBar() {
    this.showAddComment = true;
  }

  addContactBar() {
    this.showAddContact = true;
  }

  closeAddComment() {
    this.showAddComment = false;
  }

  closeAddContactt() {
    this.showAddContact = false;
  }


  addComment() {
    if (this.comment.body) {

      this.newComment.description = this.comment.body;
      this.newComment.organization_uuid = this.globals.organization;

      this.organizationService.createOrganizationComment(this.globals.user.accessToken,this.newComment).subscribe(
            (data) => {
              if (data) {
                this.organizationComments.unshift(data);
                this.resources.comments.unshift(data);
                this.paggination(1);
                this.toastr.success("Successfully added comment")
                this.comment = {
                  body: null,
                  user_id: null,
                }
              }
            },
            (error) => {
              this.toastr.error(error.message)
            })
        } else {
          this.toastr.error('The message is mandatory')
    }
  }


  deleteComment(i, uuid) {
    this.organizationService.deleteComment(this.globals.user.accessToken,uuid).subscribe(
        (data) => {
          if (data) {
            this.organizationComments.splice(this.organizationComments.findIndex(comment => comment.uuid == uuid), 1);
                  this.resources.comments.splice(this.resources.comments.findIndex(comment => comment.uuid == uuid), 1);
                  if(this.organizationComments.length){
                    this.paggination(1);
                  }

            this.toastr.success(data.message)

          }
        },
        (error) => {
              this.toastr.error(error.message)
        })  
  }

  deleteOrganization() {
    this.organizationService.deleteOrganization(this.globals.user.accessToken,this.globals.organization).subscribe(
      (data) => {
        this.organizationData = {}
        this.globals.organization = null;
        this.router.navigate(['']);
        document.getElementById('closeDelete').click();
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }


  editOrganization(value, key) {
    let body;
    body = this.recreateJobObject(key, value)
    console.log(this.organizationData);
    this.updateOrganization(body);
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

  updateOrganization(body) {
    this.organizationService.updateOrganization(this.globals.user.accessToken,body, this.globals.organization).subscribe(
      (data) => {
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  getAllCities() {
    this.organizationsService.getcities(this.globals.user.accessToken).subscribe(
      (data) => {
        this.cities = data.slice(0, 100);
       // this.cities = data;
      }
    )
  }

  getAllCategories() {
    this.organizationsService.getCategories(this.globals.user.accessToken).subscribe(
      (data) => {
        this.resources.category = data;
      }
    )
  }

  editCategories() {
    let body;
    let categories = []
    this.organizationData.categories.forEach(element => {
      categories.push(element.value)
    });

    body = this.recreateJobObject('category', categories)
    console.log(body);
    this.updateOrganization(body);
   // this.getOrganization(this.globals.organization);
  }

  deleteContact(uuid) {
    this.organizationService.deleteContact(this.globals.user.accessToken,uuid).subscribe(
      (data) => {
        if (data) {
          
          this.getOrganization(this.globals.organization);
          this.toastr.success(data.message)

        }
      },
      (error) => {
            this.toastr.error(error.message)
      })  
  }


  newContact() {
    console.log(this.addContact);
    if(this.addContact.first_name && this.addContact.email) {
      this.organizationService.addContact(this.globals.user.accessToken,this.addContact)
      .subscribe(
        (data) => {
          this.initNewContact();
            this.toastr.success(data.message);
            document.getElementById("closeNewEvent").click();
            this.getOrganization(this.globals.organization);

        }
      ,
      (error) => {
        document.getElementById("closeNewEvent").click();
        this.toastr.error(error.message)
      })
    }
    else {
      this.toastr.warning('Please fill the mandatory fields');
    }

  }


  


}
