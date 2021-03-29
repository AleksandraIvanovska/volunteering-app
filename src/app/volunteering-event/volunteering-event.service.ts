import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VolunteeringEventService {

  constructor(private http: HttpClient) { }

  getEvent(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.get(environment.backendURL + '/api/volunteeringEvents/' + uuid, { headers: headers });
  }

  updateEvent(accessToken,body, uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.put(environment.backendURL + '/api/volunteeringEvents/' + uuid, body, { headers: headers });
  }

  deleteEvent(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.delete(environment.backendURL + '/api/volunteeringEvents/' + uuid, { headers: headers });

  }

  updateEventLocation(accessToken,body, uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

      return this.http.put(environment.backendURL + '/api/volunteeringEvents/location/' + uuid, body, { headers: headers });
  }

  updateEventRequirements(accessToken,body, uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    
      return this.http.put(environment.backendURL + '/api/requirements/location/' + uuid, body, { headers: headers });
  }

  createApplication(accessToken,body): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    
      return this.http.post(environment.backendURL + '/api/volunteeringEvents/volunteerInvitation', body, { headers: headers });
  }

  deleteAsset(accessToken, uuid ,asset_uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    
    return this.http.delete(environment.backendURL + '/api/volunteeringEvents/' + uuid + '/assets/' + asset_uuid, { headers: headers });
  }

  createAsset() {
    
  }

  getApplicationStatuses(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.get(environment.backendURL + '/api/resources?type=event_volunteer_status_type', { headers: headers });
  }

  updateApplicationStatus(accessToken,body, uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.put(environment.backendURL + '/api/volunteeringEvents/volunteerInvitation/' + uuid, body, { headers: headers });
  }








}
