import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notice-dashboard',
  imports: [DatePipe, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './notice-dashboard.html',
  styleUrl: './notice-dashboard.scss',
})
export class NoticeDashboard {
  notices: any = [];
  selectedNotice: any = null;
  id: string = '';
  isEdit: boolean = false;
  constructor(
    private apiService: Api,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.selectedNotice = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getNotice();
  }
  onSubmit() {
    if (this.isEdit === true) {
      this.apiService
        .updateNotice(this.id, this.selectedNotice.value)
        .subscribe({
          next: (res: any) => {
            if (res) {
              this.snackBar.open(res.message, 'Close', {
                duration: 3000,
              });
              this.getNotice();
              // console.log(this.notices);
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else {
      this.apiService.addNotice(this.selectedNotice.value).subscribe({
        next: (res: any) => {
          if (res) {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.getNotice();
            this.selectedNotice.reset();
            // console.log(this.notices);
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
  editNotice(notice: any) {
    this.isEdit = true;
    this.selectedNotice.patchValue({
      title: notice.title,
      description: notice.description,
      date: this.formatDate(notice.date),
      category: notice.category,
    });
    this.id = notice._id;
  }
  getNotice() {
    this.apiService.getNotice().subscribe({
      next: (res: any) => {
        if (res) {
          this.notices = res.notice;
          // console.log(this.notices);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  formatDate(date: any) {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months start from 0
    const year = d.getFullYear();

    return `${year}-${month}-${day}`;
  }
  deleteNotice(notice: any) {
    this.apiService.deleteNotice(notice._id).subscribe({
      next: (res: any) => {
        if (res) {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.getNotice();
          // console.log(this.notices);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
