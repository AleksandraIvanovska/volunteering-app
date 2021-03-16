import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  getOrganization(accessToken,uuid): Observable<any>
  {const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  })

    return this.http.get(environment.backendURL + '/api/organizations/' + uuid, { headers: headers });
  }

  deleteComment(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.delete(environment.backendURL + '/api/organizations/comment/' + uuid, { headers: headers });
  }

  createOrganizationComment(accessToken,body): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.post(environment.backendURL + '/api/organizations/comment', body, { headers: headers });
  }

  deleteOrganization(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.delete(environment.backendURL + '/api/organizations/' + uuid, { headers: headers });

  }

  updateOrganization(accessToken,body, uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.put(environment.backendURL + '/api/organizations/' + uuid, body, { headers: headers });
  }

  deleteContact(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.delete(environment.backendURL + '/api/organizations/contact/' + uuid, { headers: headers });
  }

  addContact(accessToken,data): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    
    return this.http.post(environment.backendURL + '/api/organizations/contact', data, { headers: headers });
  }

}

