import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient,private router:Router) {}
  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${environment.apiUrl}/login`, body);
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  isloggedIn():boolean{
    if(localStorage.getItem('token')){
      return true
    }
    else{
      return false
    }
  }
  getToken():string|null{
    return localStorage.getItem('token');

  }
}
