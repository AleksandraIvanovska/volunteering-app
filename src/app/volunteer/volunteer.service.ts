import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private http: HttpClient) { }

  getVolunteer(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/volunteers/' + uuid, { headers: headers });
  }

  deleteComment(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.delete(environment.backendURL + '/api/volunteers/comment/' + uuid, { headers: headers });
  }

  createVolunteerComment(accessToken,body): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.post(environment.backendURL + '/api/volunteers/comment', body, { headers: headers });
  }

  deleteVolunteer(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.delete(environment.backendURL + '/api/volunteers/' + uuid, { headers: headers });
  }

  updateVolunteer(accessToken,body, uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.put(environment.backendURL + '/api/volunteers/' + uuid, body, { headers: headers });
  }

  getGenders(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/resources?type=gender_type', { headers: headers });
  }

  getNationalities(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/resources/nationalities', { headers: headers });
  }

  addVolunteerEducation(accessToken, body): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.post(environment.backendURL + '/api/volunteers/education', body, { headers: headers });
  }

  deleteEducation(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.delete(environment.backendURL + '/api/volunteers/education/' + uuid, { headers: headers });
  }

  updateEducation(accessToken,body, uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.put(environment.backendURL + '/api/volunteers/education/' + uuid, body, { headers: headers });
  }

  addVolunteerExperience(accessToken, body): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.post(environment.backendURL + '/api/volunteers/experience', body, { headers: headers });
  }

  deleteExperience(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.delete(environment.backendURL + '/api/volunteers/experience/' + uuid, { headers: headers });
  }

  updateExperience(accessToken,body, uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.put(environment.backendURL + '/api/volunteers/experience/' + uuid, body, { headers: headers });
  }

  addVolunteerLanguage(accessToken, body): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.post(environment.backendURL + '/api/volunteers/language', body, { headers: headers });
  }

  deleteLanguage(accessToken,uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.delete(environment.backendURL + '/api/volunteers/language/' + uuid, { headers: headers });
  }

  updateLanguage(accessToken,body, uuid): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })

    return this.http.put(environment.backendURL + '/api/volunteers/language/' + uuid, body, { headers: headers });
  }

  getAllLanguages(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/resources/languages', { headers: headers });
  }

  getLanguageLevels(accessToken): Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    })
    return this.http.get(environment.backendURL + '/api/resources/languageLevels', { headers: headers });
  }
  
}
