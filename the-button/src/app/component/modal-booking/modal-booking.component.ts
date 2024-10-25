import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-modal-booking',
    templateUrl: 'modal-booking.component.html',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
})

export class BookingModal {

    readonly dialogRef = inject(MatDialogRef<BookingModal>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);
    readonly animal = model(this.data.animal);

    onNoClick(): void {
        this.dialogRef.close();
    }
}