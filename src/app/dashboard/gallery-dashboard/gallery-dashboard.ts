import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gallery-dashboard',
  imports: [DatePipe, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './gallery-dashboard.html',
  styleUrl: './gallery-dashboard.scss',
})
export class GalleryDashboard {
  galleries: any = [];
  id: any = '';
  isEdit: boolean = false;
  selectedGallery = {
    title: '',
    imageUrl: '',
    date: '',
  };
  selectedGalleries: any = [];
  constructor(
    private apiService: Api,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.selectedGalleries = fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  ngOnInit() {
    // window.scrollTo(0, 0);
    this.getGalleries();
  }
  getGalleries() {
    this.apiService.getGallery().subscribe({
      next: (res: any) => {
        if (res) {
          this.galleries = res.gallery;
          console.log(this.galleries);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  onSubmit() {
    if (this.isEdit) {
      this.apiService
        .updateGallery(this.id, this.selectedGalleries.value)
        .subscribe({
          next: (res: any) => {
            if (res) {
              this.snackBar.open(res.message, 'Close', {
                duration: 3000,
              });
              this.getGalleries();
              this.selectedGalleries.reset();
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else {
      this.apiService.addGallery(this.selectedGalleries.value).subscribe({
        next: (res: any) => {
          if (res) {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.getGalleries();
            this.selectedGalleries.reset();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
  edit(gallery: any) {
    this.isEdit = true;
    this.selectedGalleries.patchValue({
      date: this.formatDate(gallery.date),
      imageUrl: gallery.imageUrl,
      title: gallery.title,
    });
    this.id = gallery._id;
  }
  formatDate(date: any) {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months start from 0
    const year = d.getFullYear();

    return `${year}-${month}-${day}`;
  }
  deleteGallery(gallery: any) {
    this.apiService.deleteGallery(gallery._id).subscribe({
      next: (res: any) => {
        if (res) {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.getGalleries();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
