import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private http: HttpClient) { }

  getOrganizations(accessToken,categoryDesc?, cityName?, countryName?, search?): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    if (search) {
        return this.http.get(environment.backendURL + '/api/organizations' + '?search=' + search, { headers: headers });
    }

    if(categoryDesc && cityName && countryName) {
        return this.http.get(environment.backendURL + '/api/organizations' + '?category=' + categoryDesc + '&country=' + countryName + '&city=' + cityName, { headers: headers });
    }
    else if(!categoryDesc && cityName && countryName) {
      
      return this.http.get(environment.backendURL + '/api/organizations' + '?country=' + countryName  + '&city=' + cityName, { headers: headers });
    }
    else if(categoryDesc && cityName && !countryName) {
      
      return this.http.get(environment.backendURL + '/api/organizations' + '?category=' + categoryDesc  + '&city=' + cityName, { headers: headers });
    }
    else if(categoryDesc && !cityName && countryName) {
     
      return this.http.get(environment.backendURL + '/api/organizations' + '?category=' + categoryDesc  + '&country=' + countryName, { headers: headers });
    }
    else if(!categoryDesc && !cityName && countryName) {
     
      return this.http.get(environment.backendURL + '/api/organizations' + '?country=' + countryName, { headers: headers });
    }
    else if(categoryDesc && !cityName && !countryName) {
      
      return this.http.get(environment.backendURL + '/api/organizations' + '?category=' + categoryDesc, { headers: headers });
    }
    else if(!categoryDesc && cityName && !countryName) {
      
      return this.http.get(environment.backendURL + '/api/organizations' + '?city=' + cityName, { headers: headers });
    }
    else {
      
      return this.http.get(environment.backendURL + '/api/organizations', { headers: headers });

    }

  }

  getcities(accessToken,state?): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.get(environment.backendURL + '/api/resources/cities' + (state ? '?state=' + state : ''), { headers: headers });
  }

  getCountries(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.get(environment.backendURL + '/api/resources/countries', { headers: headers });
  }

  getCategories(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.get(environment.backendURL + '/api/resources/categories', { headers: headers });
  }

  getOrganizationContacts(accessToken,org_uuuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/organizations/' + org_uuuid + '/contacts', { headers: headers });

  }

}
