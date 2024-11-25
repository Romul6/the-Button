import { Component, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HourComponent } from "./component/hour/hour.component";
import { Hours } from './component/hour/hour';
import { DayHourDividerComponent } from "./component/day-hour-divider/day-hour-divider.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HourComponent, DayHourDividerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  title = 'the-button';
  // hours: Array<Hours> = [
  //   { hour: { start: '10:00', end: '11:00' }, isBooked: true, participants: [''] },
  //   { hour: { start: '10:00', end: '11:00' }, isBooked: true, participants: [''] },
  //   { hour: { start: '10:00', end: '11:00' }, isBooked: false, participants: [''] }
  // ]
  hours: Array<Hours> = []

  constructor() { }

  ngOnInit(): void {
    var start = new Date()
    start.setHours(0)
    start.setMinutes(0)
    start.setSeconds(0)
    start.setMilliseconds(0)

    var end = new Date(start)
    end.setHours(23)

    for (let index = start; index < end; index.setHours(index.getHours() + 1)) {
      this.hours.push({
        hour: { start: index.getHours().toString(), end: index.getHours().toString() },
        isBooked: false,
        participants: []
      }
      )
    }

  }
}