import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

    getNotifications(accessToken): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      })
        return this.httpClient.get(environment.backendURL + '/api/events', { headers: headers });
    }
    markAsRead(accessToken,uuid): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      })
        return this.httpClient.get(environment.backendURL + '/api/events/' + uuid + '/markAsRead', { headers: headers });
    }
    readAllNotification(accessToken): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      })
        return this.httpClient.get(environment.backendURL + '/api/events/markAllAsRead', { headers: headers });
    }

}
