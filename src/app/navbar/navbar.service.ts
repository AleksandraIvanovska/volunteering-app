import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http: HttpClient) { }

  addEvent(accessToken,body): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.post(environment.backendURL + '/api/volunteeringEvents', body, { headers: headers });
  }

  getStatuses(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/resources?type=event_status_type', { headers: headers });
  }

  getGroupSize(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/resources?type=group_size_type', { headers: headers });
  }

  login(body) {
    return this.http.post(environment.backendURL + '/api/users/login', body);
  }

  register(body): Observable<any> {
    return this.http.post<any>(environment.backendURL + '/api/users/register', body);
  }

  // resetPassword(body): Observable<any> {
  //   return this.http.post<any>(environment.api + '/api/password/reset', body);
  // }

  // forgotPassword(body): Observable<any> {
  //   return this.http.post<any>(environment.api + '/api/password/email', body);
  // }

  // verifyEmail(accessToken): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`
  //   })
  //   return this.http.get(environment.api + '/api/email/resend', { headers: headers });
  // }

  getIsUserOrganization(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/users/isUserOrganization', { headers: headers });
  }

 

}
