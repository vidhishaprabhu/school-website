import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private logoutTimer: any;
  constructor(private http: HttpClient,private router:Router) {}
  register(name:string,email:string,password:string){
    const body={name,email,password};
    return this.http.post(`${environment.apiUrl}/register`,body)
  }
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
  startSessionTimer() {

    const token = this.getToken();

    if (!token) return;

    const decoded: any = jwtDecode(token);

    const expiryTime = decoded.exp * 1000; 
    const currentTime = new Date().getTime();

    const timeout = expiryTime - currentTime;

    if (timeout > 0) {

      this.logoutTimer = setTimeout(() => {
        this.logout();
      }, timeout);

    } else {
      this.logout();
    }
  }
}
