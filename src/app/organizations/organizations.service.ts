import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private http: HttpClient) { }

  getOrganizations(categoryDesc?, cityName?, countryName?, search?): Observable<any> {
    if (search) {
        return this.http.get(environment.backendURL + '/api/organizations' + '?search=' + search);
    }

    if(categoryDesc && cityName && countryName) {
        return this.http.get(environment.backendURL + '/api/organizations' + '?category=' + categoryDesc + '&country=' + countryName + '&city=' + cityName);
    }
    else if(!categoryDesc && cityName && countryName) {
      
      return this.http.get(environment.backendURL + '/api/organizations' + '?country=' + countryName  + '&city=' + cityName);
    }
    else if(categoryDesc && cityName && !countryName) {
      
      return this.http.get(environment.backendURL + '/api/organizations' + '?category=' + categoryDesc  + '&city=' + cityName);
    }
    else if(categoryDesc && !cityName && countryName) {
     
      return this.http.get(environment.backendURL + '/api/organizations' + '?category=' + categoryDesc  + '&country=' + countryName);
    }
    else if(!categoryDesc && !cityName && countryName) {
     
      return this.http.get(environment.backendURL + '/api/organizations' + '?country=' + countryName);
    }
    else if(categoryDesc && !cityName && !countryName) {
      
      return this.http.get(environment.backendURL + '/api/organizations' + '?category=' + categoryDesc);
    }
    else if(!categoryDesc && cityName && !countryName) {
      
      return this.http.get(environment.backendURL + '/api/organizations' + '?city=' + cityName);
    }
    else {
      
      return this.http.get(environment.backendURL + '/api/organizations');

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

  getCategories(): Observable<any>
  {
    return this.http.get(environment.backendURL + '/api/resources/categories');
  }

}
