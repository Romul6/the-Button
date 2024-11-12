import { Component, inject, input, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { SearcherComponent } from '../searcher/searcher.component';
import { MatButtonModule } from '@angular/material/button';
import { DialogData } from '../../models/dialogData';
import { idname } from '../../models/idName';
import { VsComponent } from "../vs/vs.component";

@Component({
    selector: 'app-modal-booking',
    templateUrl: 'modal-booking.component.html',
    styleUrl: 'modal-booking.component.scss',
    standalone: true,
    imports: [MatDialogModule, SearcherComponent, MatButtonModule, VsComponent],
})

export class BookingModal {

    readonly dialogRef = inject(MatDialogRef<BookingModal>)
    readonly data = inject<DialogData>(MAT_DIALOG_DATA)

    numberParticipants = new Array(this.data.numberParticipants)
    participants: Array<idname> = []

    team1: Array<idname> = []
    team2: Array<idname> = []

    constructor() {
    }

    onOpponentSelected(opponent: idname) {
        if (this.team1.length + this.team2.length >= this.data.numberParticipants)
            return

        var r = this.data.numberParticipants / 2
        if (this.team1.length < r)
            this.team1.push(opponent)
        else
            this.team2.push(opponent)
    }

    onSave() {
        this.dialogRef.close({ team1: this.team1, team2: this.team2 })
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}