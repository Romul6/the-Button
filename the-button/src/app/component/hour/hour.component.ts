import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, model, Output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingModal } from '../modal-booking/modal-booking.component';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';

@Component({
  selector: 'app-hour',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './hour.component.html',
  styleUrl: './hour.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HourComponentComponent {

  @Input({ required: true }) hour!: { start: string, end: string }
  @Input({ required: true }) isBooked!: boolean
  @Input() participants: { first: string, second: string } | null = null

  readonly dialog = inject(MatDialog);
  readonly animal = signal('');
  readonly name = model('');

  constructor() {

  }


  public onClick() {
    const dialogRef = this.dialog.open(BookingModal, {
      data: { name: "Romul", animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

        this.animal.set(result);
      }
    });
  }

  public getButton(): string {
    if (this.isBooked)
      return "is-booked"
    else
      return ""
  }
}
