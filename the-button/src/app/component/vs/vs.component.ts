import { Component, EventEmitter, input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDragStart, } from '@angular/cdk/drag-drop';
import { idname } from '../../models/idName';

@Component({
  selector: 'Btn-vs',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './vs.component.html',
  styleUrl: './vs.component.scss'
})

export class VsComponent {

  team1 = input.required<idname[]>()
  team2 = input.required<idname[]>()
  max4Team = input.required<number>()

  private currentIndexSelected = 0

  drop(event: CdkDragDrop<idname[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length >= this.max4Team()) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        transferArrayItem(event.container.data, event.previousContainer.data, this.currentIndexSelected, 0);

      } else {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
    }
  }

  drag(started: any) {
    this.currentIndexSelected = started.currentIndex

  }

}
