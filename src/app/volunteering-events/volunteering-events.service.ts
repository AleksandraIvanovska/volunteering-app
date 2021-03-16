import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VolunteeringEventsService {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  getEvents(accessToken,search?, city?, country?, category?, organization?, virtual?, start_date?, duration?, great_for?): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    console.log(category);
    if (search) {
      return this.http.get(environment.backendURL + '/api/volunteeringEvents' + '?search=' + search, { headers: headers });
    }

    if (city) {
      return this.http.get(environment.backendURL + '/api/volunteeringEvents' + '?city=' + city + (country ? '&country=' + country : '') + (category ? '&category=' + category : '')
      + (organization ? '&organization=' + organization : '') + (virtual ? '&virtual=' + virtual : '') + (start_date ? '&start_date=' + start_date : '')
      + (duration ? '&duration=' + duration : '') + (great_for ? '&great_for=' + great_for : ''));
    }

    if (country) {
      return this.http.get(environment.backendURL + '/api/volunteeringEvents' + '?country=' + country + (category ? '&category=' + category : '')
      + (organization ? '&organization=' + organization : '') + (virtual ? '&virtual=' + virtual : '') + (start_date ? '&start_date=' + start_date : '')
      + (duration ? '&duration=' + duration : '') + (great_for ? '&great_for=' + great_for : ''));
    }

    if (category) {
      console.log("Vleze vo category");
      return this.http.get(environment.backendURL + '/api/volunteeringEvents' + '?category=' + category
      + (organization ? '&organization=' + organization : '') + (virtual ? '&virtual=' + virtual : '') + (start_date ? '&start_date=' + start_date : '')
      + (duration ? '&duration=' + duration : '') + (great_for ? '&great_for=' + great_for : ''));
    }

    if (organization) {
      return this.http.get(environment.backendURL + '/api/volunteeringEvents' + '?organization=' + organization
      + (virtual ? '&virtual=' + virtual : '') + (start_date ? '&start_date=' + start_date : '')
      + (duration ? '&duration=' + duration : '') + (great_for ? '&great_for=' + great_for : ''));
    }

    if (virtual) {
      return this.http.get(environment.backendURL + '/api/volunteeringEvents' + '?virtual=' + virtual
      + (start_date ? '&start_date=' + start_date : '')
      + (duration ? '&duration=' + duration : '') + (great_for ? '&great_for=' + great_for : ''));
    }

    if (start_date) {
      return this.http.get(environment.backendURL + '/api/volunteeringEvents' + '?start_date=' + start_date
      + (duration ? '&duration=' + duration : '') + (great_for ? '&great_for=' + great_for : ''));
    }

    if (duration) {
      return this.http.get(environment.backendURL + '/api/volunteeringEvents' + '?duration=' + duration
      + (great_for ? '&great_for=' + great_for : ''));
    }

    if (great_for) {
      return this.http.get(environment.backendURL + '/api/volunteeringEvents' + '?great_for=' + great_for);
    }

    return this.http.get(environment.backendURL + '/api/volunteeringEvents', { headers: headers });
  }

  getGreatFor(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.get(environment.backendURL + '/api/resources/greatFor', { headers: headers });
  }

  getDurations(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.get(environment.backendURL + '/api/resources/durations', { headers: headers });
  }

}
