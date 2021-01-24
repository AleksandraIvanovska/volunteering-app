import { Component, OnInit } from '@angular/core';
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

  constructor(private volunteersService: VolunteersService) { }

  ngOnInit(): void {
    this.getAllVolunteers();

  }

  getAllVolunteers() {
    this.volunteersService.getVolunteers().subscribe(
      (data) => {
        this.volunteers = data;
        console.log(this.volunteers);
      }
    )
  }

  getAllCities() {
    this.volunteersService.getcities().subscribe(
      (data) => {
        this.cities = data.slice(0, 1000);
       // this.cities = data;
      }
    )
  }

  getAllCountries() {
    this.volunteersService.getCountries().subscribe(
      (data) => {
        this.countries = data;
      }
    )
  }

  applyFilter(selectedCityy, selectedCountryy) {
    this.volunteersService.getVolunteers(selectedCityy, selectedCountryy).subscribe(
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
  this.volunteersService.getVolunteers(null,null,applySearch).subscribe(
    (vol) =>
    {
      this.volunteers = vol;
    }
 )
}


}
