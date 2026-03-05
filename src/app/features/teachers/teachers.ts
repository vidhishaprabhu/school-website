import { Component } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-teachers',
  imports: [],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss'
})
export class Teachers {
  teachers: any[] = [];
    selectedTeachers: any = {
      name: '',
      subject: '',
      designation: '',
      bio: '',
      image: '',
    };
    constructor(private apiService: Api) {}
    ngOnInit() {
      window.scrollTo(0, 0);
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
    onEventClicking(teacher:any){
      this.selectedTeachers=teacher;
      console.error(this.selectedTeachers);
    }

}
