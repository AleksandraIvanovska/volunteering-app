import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  constructor(private http: HttpClient) { }

  getVolunteers(accessToken,cityName?, countryName?, search?): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    if (search) {
      return this.http.get(environment.backendURL + '/api/volunteers' + '?search=' + search, { headers: headers });
  }

    if(cityName && countryName) {
      return this.http.get(environment.backendURL + '/api/volunteers' + '?country=' + countryName + '&city=' + cityName, { headers: headers });
    }
    else if(!cityName && countryName) {
      return this.http.get(environment.backendURL + '/api/volunteers' + '?country=' + countryName, { headers: headers });  
    }
    else if(cityName && !countryName) {
      return this.http.get(environment.backendURL + '/api/volunteers' + '?city=' + cityName, { headers: headers });
    }
    else {
      return this.http.get(environment.backendURL + '/api/volunteers', { headers: headers });
    }

  }

  getcities(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/resources/cities', { headers: headers });
  }

  getCountries(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/resources/countries', { headers: headers });
  }

}

