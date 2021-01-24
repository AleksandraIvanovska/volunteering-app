import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

    getNotifications(): Observable<any> {
        return this.httpClient.get(environment.backendURL + '/events');
    }
    markAsRead(uuid): Observable<any> {
        return this.httpClient.get(environment.backendURL + '/events/' + uuid + '/markAsRead');
    }
    readAllNotification(): Observable<any> {
        return this.httpClient.get(environment.backendURL + '/events/markAllAsRead');
    }

}
