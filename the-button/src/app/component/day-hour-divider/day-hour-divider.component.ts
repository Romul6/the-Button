import { DatePipe, KeyValuePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
// https://stackoverflow.com/questions/75900305/drag-select-on-javascript-make-elements-selectable
@Component({
  selector: 'Btn-day-hour-divider',
  standalone: true,
  imports: [KeyValuePipe, DatePipe],
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

  onPointerDown(event: PointerEvent) {
    event.preventDefault();

    this.x = event.pageX;
    this.y = event.pageY;

    this.div = document.createElement("div");

    this.div.style.position = "absolute";
    this.div.style.width = "0";
    this.div.style.height = "0";
    this.div.style.left = this.x + "px";
    this.div.style.top = this.y + "px";
    this.div.classList.add("drag-select");

    document.body.append(this.div);
  }

  onPointerUp(event: PointerEvent) {
    this.div?.remove();

    const a = document.querySelectorAll('.intersected')

    a.forEach((e) => e.classList.add('is-selected'))

    console.log(document.querySelectorAll('.intersected'));

  }

  onPointerMove(event: any) {

    if (!this.div) return

    const diffX = event.pageX - this.x;
    const diffY = event.pageY - this.y;

    this.div.style.left = diffX < 0 ? this.x + diffX + "px" : this.x + "px";
    this.div.style.top = diffY < 0 ? this.y + diffY + "px" : this.y + "px";

    this.div.style.height = Math.abs(diffY) + "px";
    this.div.style.width = Math.abs(diffX) + "px";

    this.checkSelected(); // extra line 1
  }

  checkSelected() {
    const { x, y, height, width } = this.div!.getBoundingClientRect();
    for (const selectable of this.selectables) {
      if (this.checkRectIntersection({ x: x + window.scrollX, y: y + window.scrollY, height, width }, selectable)) {
        selectable.elem.classList.add("intersected");
      } else {
        selectable.elem.classList.remove("intersected");
      }
    }
  }

  checkRectIntersection(r1: any, r2: any) {
    return !(
      r1.x + r1.width < r2.x ||
      r2.x + r2.width < r1.x ||
      r1.y + r1.height < r2.y ||
      r2.y + r2.height < r1.y
    );
  }

}