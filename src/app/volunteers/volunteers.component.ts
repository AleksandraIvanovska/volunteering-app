import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { VolunteersService } from './volunteers.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent implements OnInit {

  volunteers:[];
  cities : any = [];
  countries : any = [];
  selectedCity: null;
  seletedCountry: null;
  search: null;

  constructor(private volunteersService: VolunteersService, private globals: AppComponent, 
    private router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllVolunteers();

  }

  getAllVolunteers() {
    this.volunteersService.getVolunteers(this.globals.user.accessToken).subscribe(
      (data) => {
        this.volunteers = data;
        console.log(this.volunteers);
      }
    )
  }

  getAllCities() {
    this.volunteersService.getcities(this.globals.user.accessToken).subscribe(
      (data) => {
        this.cities = data.slice(0, 1000);
       // this.cities = data;
      }
    )
  }

  getAllCountries() {
    this.volunteersService.getCountries(this.globals.user.accessToken).subscribe(
      (data) => {
        this.countries = data;
      }
    )
  }

  applyFilter(selectedCityy, selectedCountryy) {
    this.volunteersService.getVolunteers(this.globals.user.accessToken,selectedCityy, selectedCountryy).subscribe(
      (vol) =>
      {
        this.volunteers = vol;
      }
    )
}

clearFilters() {
  this.getAllVolunteers();
}

applySearch(applySearch) {
  this.volunteersService.getVolunteers(this.globals.user.accessToken,null,null,applySearch).subscribe(
    (vol) =>
    {
      this.volunteers = vol;
    }
 )
}

openVolunteerByUuid(uuid) {
  this.globals.volunteer = uuid;
  this.router.navigate(['/volunteer'],
    {
      queryParams: {
        uuid: uuid
      }
    });
}


}
