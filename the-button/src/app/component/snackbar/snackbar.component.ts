import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
  selector: 'Btn-snack-bar',
  templateUrl: 'snackbar.component.html',
  styleUrl: 'snackbar.component.scss',
  imports: [MatButtonModule],
  standalone: true
})

export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
}