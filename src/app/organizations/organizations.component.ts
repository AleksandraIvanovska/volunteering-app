import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from './organizations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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


  constructor(private organizationService: OrganizationsService) { }

  ngOnInit(): void {
    this.getAllOrganizations();
  }

  getAllOrganizations() {
      this.organizationService.getOrganizations().subscribe(
        (data) => {
          this.organizations = data;
         // console.log(this.organizations);
         // this.organizations = data.slice(0, 6);

        }
      )
  }

  getAllCities() {
    this.organizationService.getcities().subscribe(
      (data) => {
        this.cities = data.slice(0, 1000);
       // this.cities = data;
      }
    )
  }

  getAllCountries() {
    this.organizationService.getCountries().subscribe(
      (data) => {
        this.countries = data;
      }
    )
  }

  getAllCategories() {
    this.organizationService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      }
    )
  }

  applyFilter(selectedCategoryy, selectedCityy, selectedCountryy) {
        this.organizationService.getOrganizations(selectedCategoryy, selectedCityy, selectedCountryy).subscribe(
          (org) =>
          {
            this.organizations = org;
          }
        )
  }

  clearFilters() {
    this.getAllOrganizations();
   // this.event_type = this.eventType[0];
  
  }

  applySearch(applySearch) {
     this.organizationService.getOrganizations(null,null,null,applySearch).subscribe(
       (org) =>
       {
         this.organizations = org;
       }
    )
  }

}
