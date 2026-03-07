import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private authService:Auth,private router:Router){}

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
  isLoggedIn():boolean{
    return this.authService.isloggedIn();
  }

}
