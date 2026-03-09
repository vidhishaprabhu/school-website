import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-teachers-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './teachers-dashboard.html',
  styleUrl: './teachers-dashboard.scss',
})
export class TeachersDashboard {
  teachers: any = [];
  selectedTeacher: any = null;
  id:string=''
  isEdit:boolean=false;
  constructor(
    private apiService: Api,
    private fb: FormBuilder,
  ) {
    this.selectedTeacher = fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      designation: ['', Validators.required],
      image: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getTeachers();
  }
  getTeachers() {
    this.apiService.getTeachers().subscribe({
      next: (res: any) => {
        if (res) {
          this.teachers = res.teachers;
          console.log(this.teachers);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  editTeachers(teacher:any){
    this.isEdit=true;
    this.selectedTeacher.patchValue({
      name:teacher.name,
      subject:teacher.subject,
      designation:teacher.designation,
      image:teacher.image,
      bio:teacher.bio
    })
    this.id=teacher._id;
  }
  onSubmit(){
    if(this.isEdit===true){
      this.apiService.updateTeacher(this.id,this.selectedTeacher.value).subscribe({
      next: (res: any) => {
        if (res) {
          alert(res.message)
          this.getTeachers();
          // console.log(this.teachers);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
      

    }
    else{
      this.apiService.addTeachers(this.selectedTeacher.value).subscribe({
      next: (res: any) => {
        if (res) {
          alert(res.message);
          this.getTeachers();
          this.selectedTeacher.reset();
          // console.log(this.teachers);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
    }

  }
  deleteTeacher(teacher:any){
    this.apiService.deleteTeacher(teacher._id).subscribe({
      next: (res: any) => {
        if (res) {
          alert(res.message)
          this.getTeachers();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });

  }
}
