import { DatePipe, KeyValuePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { DraggableDirective, DraggableHostDirective } from 'drag-select';

// https://stackoverflow.com/questions/75900305/drag-select-on-javascript-make-elements-selectable

@Component({
  selector: 'Btn-day-hour-divider',
  standalone: true,
  imports: [KeyValuePipe, DatePipe, DraggableDirective, DraggableHostDirective],
  templateUrl: './day-hour-divider.component.html',
  styleUrl: './day-hour-divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DayHourDividerComponent implements OnInit, AfterViewInit {

  minutesDivider = input.required<number>()
  day = input(new Date())
  dayDivided: { start: Date, end: Date }[] = []
  hoursMap: Map<number, Array<{ start: Date, end: Date }>> = new Map()

  div: HTMLDivElement | null = null
  x: number = 0
  y: number = 0
  selectables: any[] = []

  ngAfterViewInit(): void {
    document.querySelectorAll('.selectable').forEach((selectable) => {
      const { x, y, width, height } = selectable.getBoundingClientRect();
      this.selectables.push({
        x: x + window.scrollX,
        y: y + window.scrollY,
        width,
        height,
        elem: selectable,
      })
    })
  }

  ngOnInit(): void {
    this.createHoursMap()
  }

  createHoursMap() {
    let start = new Date(this.day().getFullYear(), this.day().getMonth(), this.day().getDay(), 0, 0, 0, 0)
    let end = new Date(this.day().getFullYear(), this.day().getMonth(), this.day().getDay(), 23, 59, 59, 999)

    for (let minute = start; minute < end; minute.setMinutes(minute.getMinutes() + this.minutesDivider())) {
      let startMin = minute
      let offset = new Date(minute)

      offset.setMinutes(offset.getMinutes() + this.minutesDivider())
      this.dayDivided.push({ start: new Date(startMin), end: offset })
    }

    for (const hours of this.dayDivided) {
      let hour = hours.start.getHours()
      let range = this.hoursMap.get(hour)

      if (range)
        range.push({ start: hours.start, end: hours.end })
      else
        this.hoursMap.set(hour, [{ start: hours.start, end: hours.end }])
    }
  }

}