import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  
  ngOnInit(){
    window.scrollTo(0,0);
  }



}
