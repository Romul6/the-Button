import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { SearcherComponent } from '../searcher/searcher.component';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
    animal: string;
    name: string;
}

export interface idname {
    id: number;
    name: string;
    image?: string;
}

@Component({
    selector: 'app-modal-booking',
    templateUrl: 'modal-booking.component.html',
    styleUrl: 'modal-booking.component.scss',
    standalone: true,
    imports: [MatDialogModule, SearcherComponent, MatButtonModule],
})

export class BookingModal {

    readonly dialogRef = inject(MatDialogRef<BookingModal>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);

    constructor() {
    }

    onAccept(): any {

    }

    public onCancel(): void {
        this.dialogRef.close();
    }
}