import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { OrganizationService } from '../organization/organization.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { VolunteerService } from './volunteer.service';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {

  volunteerData: any = {};
  volunteerComments: any = [];
  educations: any = [];
  languages: any = [];
  experiences: any = [];
  eventAttendance: any = [];
  eventInvitations: any = [];
  nationalities: any = [];
  cities: any = [];
  addEducation: any = {}
  addExperience: any = {}
  addLanguage: any = {};
  allLanguages: any = [];
  languageLevels: any = [];
  cdkVirtualScrollViewport: any = {};

  initNewEducation() {
    this.addEducation = {
      volunteer_uuid: this.globals.volunteer,
      institution_name: null,
      degree_name: null,
      major: null,
      start_date: null,
      graduation_date: null
    }
  }

  initNewExperience() {
      this.addExperience = {
        volunteer_uuid: this.globals.volunteer,
        job_title: null,
        company_name: null,
        city: null,
        start_date: null,
        end_date: null
      }
  }

  initNewLanguage() {
    this.addLanguage = {
      volunteer_uuid: this.globals.volunteer,
      language: null,
      level: null
    }
  }

  selectedEducation: any = {};
  selectedExperience: any = {};
  selectedLanguage: any = {};


  pagination: any = {
    current: 1,
    max: []
  }
  resources: any = {
    comments: []
  }

  comment: any = {
    body: null
  }
  newComment:any = {
    description: null,
    volunteer_uuid: null
  }

  showAddComment = false;
  genders: any = [];



  constructor(private volunteerService: VolunteerService,public toastr: ToastrService, 
    public globals: AppComponent, private activatedRoute: ActivatedRoute, private router: Router,
    private organizationsService: OrganizationsService) { 

      router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        let checkURL = this.router.parseUrl(this.router.url).root.children.primary
      //  if (checkURL && checkURL.segments[0].toString() == 'volunteer') {
          this.activatedRoute.queryParams.subscribe(params => {
            if (params.uuid) {
              this.globals.volunteer = params.uuid            
              this.getVolunteer(params.uuid)
            }
          })
      });

    }

  ngOnInit(): void {
    this.initNewEducation();
    this.initNewExperience();
    this.initNewLanguage();
  }

  getVolunteer(uuid) {
    this.volunteerService.getVolunteer(this.globals.user.accessToken,uuid).subscribe(
      (data) => {
        console.log(data); 
          this.volunteerData = data;   
          
          // if (data.volunteeringEvents) {
          //   this.organizationEvents =  data.volunteeringEvents;
          // }

          if (data.comments) {
            this.volunteerComments = data.comments;

            if (this.volunteerComments.length) {
              this.pagination.max = Array(Math.ceil(this.volunteerComments.length / 2)).fill(1).map((x, i) => i + 1);
              this.resources.comments = this.volunteerComments.slice(0, 2);
            }
          }

          if (data.educations) {
            this.educations =  data.educations;
          }

          if (data.languages) {
            this.languages =  data.languages;
          }

          if(data.experiences) {
            this.experiences = data.experiences;
          }

          if (data.eventAttendance) {
            this.eventAttendance =  data.eventAttendance;
          }

          if (data.eventInvitations) {
            this.eventInvitations = data.eventInvitations;
          }


      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

 
  downloadCV(file)
  {
    window.open(file, '_blank');
  }

  addComment() {
    if (this.comment.body) {

      this.newComment.description = this.comment.body;
      this.newComment.volunteer_uuid = this.globals.volunteer;

      this.volunteerService.createVolunteerComment(this.globals.user.accessToken,this.newComment).subscribe(
            (data) => {
              if (data) {
                this.volunteerComments.unshift(data);
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

  paggination(i) {
    this.pagination.max = Array(Math.ceil(this.volunteerComments.length / 2)).fill(1).map((x, i) => i + 1);
    this.resources.comments = this.volunteerComments.slice((i - 1) * 2, i * 2);
    this.pagination.current = i;
  }

  addCommentBar() {
    this.showAddComment = true;
  }

  closeAddComment() {
    this.showAddComment = false;
  }

  deleteComment(i, uuid) {
    this.volunteerService.deleteComment(this.globals.user.accessToken,uuid).subscribe(
        (data) => {
          if (data) {
            this.volunteerComments.splice(this.volunteerComments.findIndex(comment => comment.uuid == uuid), 1);
                  this.resources.comments.splice(this.resources.comments.findIndex(comment => comment.uuid == uuid), 1);
                  if(this.volunteerComments.length){
                    this.paggination(1);
                  }

            this.toastr.success(data.message)

          }
        },
        (error) => {
              this.toastr.error(error.message)
        })  
  }

  deleteVolunteer() {
    this.volunteerService.deleteVolunteer(this.globals.user.accessToken,this.globals.volunteer).subscribe(
      (data) => {
        this.volunteerData = {}
        this.globals.volunteer = null;
        this.router.navigate(['']);
        document.getElementById('closeDelete').click();
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  editVolunteer(value, key) {
    let body;
    body = this.recreateJobObject(key, value)
    console.log(this.volunteerData);
    this.updateVolunteer(body);
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

  updateVolunteer(body) {
    this.volunteerService.updateVolunteer(this.globals.user.accessToken, body, this.globals.volunteer).subscribe(
      (data) => {
        this.toastr.success(data.message);  
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  getGenders() {
    this.volunteerService.getGenders(this.globals.user.accessToken).subscribe(
      (data) => {
        this.genders = data;
      }
    )
  }

  getNationalities() {
      this.volunteerService.getNationalities(this.globals.user.accessToken).subscribe(
        (data) => {
          this.nationalities = data;
        }
      )
      console.log(this.nationalities);
  }

  getAllCities() {
    this.organizationsService.getcities(this.globals.user.accessToken).subscribe(
      (data) => {
       // this.cities = data.slice(0, 50);
        this.cities = data;
       console.log(this.cities);
      }
    )
  }

  getAllLanguages() {
    this.volunteerService.getAllLanguages(this.globals.user.accessToken).subscribe(
      (data) => {
        console.log(data);
        this.allLanguages = data;
      }
    )
  }

  getLanguageLevels() {
    this.volunteerService.getLanguageLevels(this.globals.user.accessToken).subscribe(
      (data) => {
        this.languageLevels = data;
      }
    )
  }

  newEducation() {
    this.addEducation.volunteer_uuid = this.globals.volunteer;
    this.volunteerService.addVolunteerEducation(this.globals.user.accessToken,this.addEducation)
      .subscribe(
        (data) => {
          this.initNewEducation();
            this.toastr.success(data.message);
            document.getElementById("add-education-modal").click();
            this.getVolunteer(this.globals.volunteer);

        }
      ,
      (error) => {
        document.getElementById("add-education-modal").click();
        this.toastr.error(error.message)
      })
  }

  deleteEducation(education_uuid) {
    this.volunteerService.deleteEducation(this.globals.user.accessToken, education_uuid).subscribe(
      (data) => {
        if (data) {
          
          this.getVolunteer(this.globals.volunteer);
          this.toastr.success(data.message)

        }
      },
      (error) => {
            this.toastr.error(error.message)
      })  
  }


  editEducation(value, key) {
    let body;
    body = this.recreateJobObject(key, value)
    this.updateEducation(body);
  }

  updateEducation(body) {
    console.log(this.selectedEducation);
    this.volunteerService.updateEducation(this.globals.user.accessToken,body, this.selectedEducation.uuid).subscribe(
      (data) => {
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  editEducationSelected(education) {
    this.selectedEducation =  education;
  }

  newExperience() {
    this.addExperience.volunteer_uuid = this.globals.volunteer;
    this.volunteerService.addVolunteerExperience(this.globals.user.accessToken,this.addExperience)
      .subscribe(
        (data) => {
          this.initNewExperience();
            this.toastr.success(data.message);
            document.getElementById("add-experience-modal").click();
            this.getVolunteer(this.globals.volunteer);
        }
      ,
      (error) => {
        document.getElementById("closeNewEvent").click();
        this.toastr.error(error.message)
      })
  }


  deleteExperience(experience_uuid) {
    this.volunteerService.deleteExperience(this.globals.user.accessToken, experience_uuid).subscribe(
      (data) => {
        if (data) {
          
          this.getVolunteer(this.globals.volunteer);
          this.toastr.success(data.message)

        }
      },
      (error) => {
            this.toastr.error(error.message)
      })  
  }


  editExperience(value, key) {
    let body;
    body = this.recreateJobObject(key, value)
    this.updateExperience(body);
  }

  updateExperience(body) {
    this.volunteerService.updateExperience(this.globals.user.accessToken,body, this.selectedExperience.uuid).subscribe(
      (data) => {
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  editExperienceSelected(experience) {
    this.selectedExperience =  experience;
  }


  newLanguage() {
    this.addLanguage.volunteer_uuid = this.globals.volunteer;
    this.volunteerService.addVolunteerLanguage(this.globals.user.accessToken,this.addLanguage)
      .subscribe(
        (data) => {
          this.initNewLanguage();
            this.toastr.success(data.message);
            document.getElementById("add-language-modal").click();
            this.getVolunteer(this.globals.volunteer);

        }
      ,
      (error) => {
        document.getElementById("add-language-modal").click();
        this.toastr.error(error.message)
      })
  }

  deleteLanguage(language_uuid) {
    this.volunteerService.deleteLanguage(this.globals.user.accessToken, language_uuid).subscribe(
      (data) => {
        if (data) {
          
          this.getVolunteer(this.globals.volunteer);
          this.toastr.success(data.message)

        }
      },
      (error) => {
            this.toastr.error(error.message)
      })  
  }


  editLanguage(value, key) {
    let body;
    body = this.recreateJobObject(key, value)
    this.updateLanguage(body);
  }

  updateLanguage(body) {
    this.volunteerService.updateLanguage(this.globals.user.accessToken, body, this.selectedLanguage.language_uuid).subscribe(
      (data) => {
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  editLanguageSelected(language) {
    this.selectedLanguage =  language;
  }

  removeFavoriteEvent(favorite_event_uuid) {
    this.volunteerService.removeEventFromFavorite(this.globals.user.accessToken, favorite_event_uuid).subscribe(
      (data) => {
        this.toastr.success(data.message);
        this.getVolunteer(this.globals.volunteer);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

  removeFavoriteOrganization(remove_favorite_organization) {
    this.volunteerService.removeOrganizationFromFavorite(this.globals.user.accessToken, remove_favorite_organization).subscribe(
      (data) => {
        this.toastr.success(data.message);
        this.getVolunteer(this.globals.volunteer);
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }


}
