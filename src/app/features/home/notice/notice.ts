import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notice',
  imports: [RouterLink],
  templateUrl: './notice.html',
  styleUrl: './notice.scss'
})
export class Notice {
  notices='';
  constructor(private apiService:Api){}
  ngOnInit(){
    this.getNotices();
  }
  getNotices(){
    this.apiService.getNotice().subscribe({
      next:(res:any)=>{
        if(res){
          let noticeArray:any=[];
          res.notice.map((obj:any)=>{
            noticeArray.push(obj.title)
          })
          this.notices=noticeArray.join(', ');
          console.log(this.notices);
        }

      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

}
