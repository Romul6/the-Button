import { Component, EventEmitter, input, model, ModelFunction, ModelSignal } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDragStart, } from '@angular/cdk/drag-drop';
import { idname } from '../../models/idName';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'Btn-vs',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatIconModule, MatButtonModule],
  templateUrl: './vs.component.html',
  styleUrl: './vs.component.scss'
})

export class VsComponent {

  team1 = model.required<idname[]>()
  team2 = model.required<idname[]>()

  max4Team = input.required<number>()

  private currentIndexSelected = 0

  drop(event: CdkDragDrop<idname[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length >= this.max4Team()) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        setTimeout(() => {
          transferArrayItem(event.container.data, event.previousContainer.data, 0, this.currentIndexSelected);
        }, 5000);

      } else {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
    }
  }

  drag(started: any) {
    this.currentIndexSelected = started.currentIndex
  }

  protected onDeletePlayer(list: ModelSignal<idname[]>, event: any) {
    list.update(v => v.filter(a => a.id != event.id))
  }

}
