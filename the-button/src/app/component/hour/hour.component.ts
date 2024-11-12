import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, Input, model, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingModal } from '../modal-booking/modal-booking.component';

@Component({
  selector: 'app-hour',
  standalone: true,
  imports: [NgClass],
  templateUrl: './hour.component.html',
  styleUrl: './hour.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HourComponentComponent {

  readonly dialog = inject(MatDialog);
  readonly opponent = signal('');
  readonly name = model('');

  hour = input.required<{ start: string, end: string }>()
  isBooked = input.required<boolean>()
  participants = input<{ oppo1: string, oppo2: string, oppo3?: string, oppo4?: string } | null>()

  constructor() { }

  public onClick() {
    const dialogRef = this.dialog.open(BookingModal, {
      data: { name: "Romul", animal: this.opponent(), numberParticipants: 4 },
      width: '600px',
    });

    const self = this
    dialogRef.afterClosed().subscribe({
      next(result: any) {
        console.log(result);
        if (result !== undefined)
          self.opponent.set(result);
      }
    })
  }

}
