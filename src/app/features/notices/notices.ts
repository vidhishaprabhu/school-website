import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notices',
  imports: [DatePipe],
  templateUrl: './notices.html',
  styleUrl: './notices.scss'
})
export class Notices {
  notices:any[]=[];
  selectedNotice:any={
    title:'',
    description:'',
    date:'',
    category:''
  }
  constructor(private apiService:Api){}
  ngOnInit(){
    this.getNotices();
    window.scrollTo(0, 0);
  }
  getNotices(){
    this.apiService.getNotice().subscribe({
      next:(res:any)=>{
        if(res){
          this.notices=res.notice;
        }
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }
  showNotice(notice:any){
    this.selectedNotice=notice;

  }
}
