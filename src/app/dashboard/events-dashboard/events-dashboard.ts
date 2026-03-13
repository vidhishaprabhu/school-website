import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-events-dashboard',
  imports: [DatePipe, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './events-dashboard.html',
  styleUrl: './events-dashboard.scss',
})
export class EventsDashboard {
  events: any = [];
  selectedEvent: any = null;
  id: string = '';
  isEdit: boolean = false;
  constructor(
    private apiService: Api,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.selectedEvent = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      shortDescription: ['', Validators.required],
      date: ['', Validators.required],
      eventTime: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getEvents();
  }
  getEvents() {
    this.apiService.getEvents().subscribe({
      next: (res: any) => {
        if (res) {
          this.events = res.events;
          console.log(this.events);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  onSubmit() {
    if (this.isEdit === true) {
      this.apiService.updateEvent(this.id, this.selectedEvent.value).subscribe({
        next: (res: any) => {
          if (res) {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.getEvents();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.apiService.addEvent(this.selectedEvent.value).subscribe({
        next: (res: any) => {
          if (res) {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            this.selectedEvent.reset();
            this.getEvents();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
  deleteEvent(event: any) {
    this.apiService.deleteEvent(event._id).subscribe({
      next: (res: any) => {
        if (res) {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
          });
          this.getEvents();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  editEvent(event: any) {
    this.isEdit = true;
    if (!event.date) {
      console.log('Date not available');
      return;
    }

    const d = new Date(event.date);

    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().slice(0, 5);

    this.selectedEvent.patchValue({
      title: event.title,
      description: event.description,
      shortDescription: event.shortDescription,
      date: date,
      eventTime: time,
      location: event.location,
    });

    this.id = event._id;
  }
  formatDate(date: any) {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months start from 0
    const year = d.getFullYear();

    return `${year}-${month}-${day}`;
  }
}
