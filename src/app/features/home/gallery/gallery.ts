import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [DatePipe,RouterModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  galleries:any[]=[];
  constructor(private apiService:Api){}
  ngOnInit(){
    this.getGallery();
  }
  getGallery(){
    this.apiService.getGallery().subscribe((res:any)=>{
      this.galleries=res.gallery;
      console.log(this.galleries);
    })

  }

}
