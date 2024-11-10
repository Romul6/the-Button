import { Component, inject, input, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { SearcherComponent } from '../searcher/searcher.component';
import { MatButtonModule } from '@angular/material/button';
import { DialogData } from '../../models/dialogData';
import { idname } from '../../models/idName';

@Component({
    selector: 'app-modal-booking',
    templateUrl: 'modal-booking.component.html',
    styleUrl: 'modal-booking.component.scss',
    standalone: true,
    imports: [MatDialogModule, SearcherComponent, MatButtonModule],
})

export class BookingModal {

    readonly dialogRef = inject(MatDialogRef<BookingModal>)
    readonly data = inject<DialogData>(MAT_DIALOG_DATA)

    numberParticipants = new Array(this.data.numberParticipants)
    participants: Array<idname> = []

    constructor() {
    }

    onOpponentSelected(opponent: idname) {
        this.participants.push(opponent)
        // this.dialogRef.close(opponent)
    }

    onSave() {
        this.dialogRef.close(this.participants)
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}