import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-dashboard',
  imports: [CommonModule],
  templateUrl: './contact-dashboard.html',
  styleUrl: './contact-dashboard.scss'
})
export class ContactDashboard {
  contacts:any=[];
  selectedContact={
    name:'',
    email:'',
    phone:null,
    subject:'',
    message:''
  }
  constructor(private apiService: Api) {}
    ngOnInit() {
      // window.scrollTo(0, 0);
      this.getContacts();
    }
    getContacts() {
      this.apiService.getContacts().subscribe({
        next: (res: any) => {
          if (res) {
            this.contacts = res.contacts;
            console.log(this.contacts);
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
    viewContact(contact:any){
      this.selectedContact=contact
    }

}
