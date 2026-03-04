import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http:HttpClient) { }
  getNotice(){
    return this.http.get(`${environment.apiUrl}/get-notice`);
  }
  getEvents(){
    return this.http.get(`${environment.apiUrl}/get-event`);
  }
  getGallery(){
    return this.http.get(`${environment.apiUrl}/get-gallery`);
  }
}
