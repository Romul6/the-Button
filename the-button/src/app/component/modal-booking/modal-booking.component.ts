import { Component, inject, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
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
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, ReactiveFormsModule, MatSelectModule],
})

export class BookingModal {

    readonly dialogRef = inject(MatDialogRef<BookingModal>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);
    readonly animal = model(this.data.animal);

    toppings = new FormControl('');

    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

    onNoClick(): void {
        this.dialogRef.close();
    }
}