import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [DatePipe],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  events: any[] = [];
  selectedEvents: any = {
    title: '',
    description: '',
    shortDescription: '',
    date: '',
    location: '',
  };
  constructor(private apiService: Api) {}
  ngOnInit() {
    window.scrollTo(0, 0);
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
  onEventClicking(event:any){
    this.selectedEvents=event;
    console.log(this.selectedEvents);
  }
}
