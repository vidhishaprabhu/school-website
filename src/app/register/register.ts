import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm:FormGroup;
  constructor(private authService:Auth,private fb:FormBuilder,private router:Router){
    this.registerForm=fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.max(3)]]
    })
  }
  register(){
    // console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value.name,this.registerForm.value.email,this.registerForm.value.password).subscribe((res:any)=>{
      if(res){
        alert(res.message);
        this.router.navigateByUrl('/login')
        this.registerForm.reset();
      }
      else{
        console.error('There is some error');
      }
    })
  }




}
