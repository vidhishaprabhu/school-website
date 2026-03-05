import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [DatePipe],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  
  galleries:any[]=[];
    constructor(private apiService:Api){}
    ngOnInit(){
      this.getGallery();
      window.scrollTo(0, 0);
    }
    getGallery(){
      this.apiService.getGallery().subscribe((res:any)=>{
        this.galleries=res.gallery;
        console.log(this.galleries);
      })
  
    }
  



}
