import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from './organizations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

organizations:[];
cities : any = [];
countries : any = [];
categories : any = [];
selectedCategory: null;
selectedCity: null;
seletedCountry: null;
search: null;


  constructor(private organizationService: OrganizationsService, public globals: AppComponent, 
    private router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllOrganizations();
  }

  getAllOrganizations() {
      this.organizationService.getOrganizations(this.globals.user.accessToken).subscribe(
        (data) => {
          this.organizations = data;
          console.log(this.organizations);
         // this.organizations = data.slice(0, 6);

        }
      )
  }

  getAllCities() {
    this.organizationService.getcities(this.globals.user.accessToken).subscribe(
      (data) => {
        this.cities = data.slice(0, 1000);
       // this.cities = data;
      }
    )
  }

  getAllCountries() {
    this.organizationService.getCountries(this.globals.user.accessToken).subscribe(
      (data) => {
        this.countries = data;
      }
    )
  }

  getAllCategories() {
    this.organizationService.getCategories(this.globals.user.accessToken).subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      }
    )
  }

  applyFilter(selectedCategoryy, selectedCityy, selectedCountryy) {
        this.organizationService.getOrganizations(this.globals.user.accessToken,selectedCategoryy, selectedCityy, selectedCountryy).subscribe(
          (org) =>
          {
            this.organizations = org;
          }
        )
  }

  clearFilters() {
    this.getAllOrganizations();
    this.selectedCategory = null;
    this.selectedCity = null;
    this.seletedCountry = null;
    this.search = null
   // this.vent_type = this.eventType[0];
  
  }

  applySearch(applySearch) {
     this.organizationService.getOrganizations(this.globals.user.accessToken,null,null,null,applySearch).subscribe(
       (org) =>
       {
         this.organizations = org;
       }
    )
  }

  openOrganizationByUuid(uuid) {
    this.globals.organization = uuid;
    this.router.navigate(['/organization'],
      {
        queryParams: {
          uuid: uuid
        }
      });
  }

}
