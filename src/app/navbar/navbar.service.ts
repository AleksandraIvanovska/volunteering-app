import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http: HttpClient) { }

  addEvent(body, accessToken): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${accessToken}`
    // })
    //return this.httpClient.post(environment.backendURL + '/api/placvolunteeringEventses', body, { headers: headers });
    return this.http.post(environment.backendURL + '/api/volunteeringEvents', body);
  }

  getStatuses(): Observable<any>
  {
    return this.http.get(environment.backendURL + '/api/resources?type=event_status_type');
  }

  getGroupSize(): Observable<any>
  {
    return this.http.get(environment.backendURL + '/api/resources?type=group_size_type');
  }

}
