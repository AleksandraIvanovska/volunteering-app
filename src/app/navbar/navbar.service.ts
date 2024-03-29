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



  getIsUserOrganization(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/users/isUserOrganization', { headers: headers });
  }

  addOrganization(accessToken,body): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.post(environment.backendURL + '/api/organizations', body, { headers: headers });
  }

  addVolunteer(accessToken, body): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.post(environment.backendURL + '/api/volunteers', body, { headers: headers });
  }

  getNotifications(accessToken): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/events/latest', { headers: headers });
}

markAsRead(accessToken, uuid): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  })
    return this.http.get(environment.backendURL + '/api/events/' + uuid + '/markAsRead', { headers: headers });
}

readAllNotification(accessToken): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  })
    return this.http.get(environment.backendURL + '/api/events/markAllAsRead', { headers: headers });
}
 
forgotPassword(body): Observable<any> {
    return this.http.post<any>(environment.backendURL + '/api/users/forgotPassword', body);
    return this.http.post<any>(environment.backendURL + '/api/password/email', body);
}

resetPassword(body): Observable<any> {
  return this.http.post<any>(environment.backendURL + '/api/users/reset', body);
}

  // verifyEmail(accessToken): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   })
  //   return this.http.get(environment.api + '/api/email/resend', { headers: headers });
  // }

}
