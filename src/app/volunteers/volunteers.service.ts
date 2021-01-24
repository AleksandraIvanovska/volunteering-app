import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  constructor(private http: HttpClient) { }

  getVolunteers(cityName?, countryName?, search?): Observable<any> {

    if (search) {
      return this.http.get(environment.backendURL + '/api/volunteers' + '?search=' + search);
  }

    if(cityName && countryName) {
      return this.http.get(environment.backendURL + '/api/volunteers' + '?country=' + countryName + '&city=' + cityName);
    }
    else if(!cityName && countryName) {
      console.log('Vleze vo contru');
      return this.http.get(environment.backendURL + '/api/volunteers' + '?country=' + countryName);  
    }
    else if(cityName && !countryName) {
      return this.http.get(environment.backendURL + '/api/volunteers' + '?city=' + cityName);
    }
    else {
      return this.http.get(environment.backendURL + '/api/volunteers');
    }

  }

  getcities(): Observable<any>
  {
    return this.http.get(environment.backendURL + '/api/resources/cities');
  }

  getCountries(): Observable<any>
  {
    return this.http.get(environment.backendURL + '/api/resources/countries');
  }

}

