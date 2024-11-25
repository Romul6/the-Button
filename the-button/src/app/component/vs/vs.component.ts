import { Component, input, model, ModelSignal } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, } from '@angular/cdk/drag-drop';
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

  drop(event: CdkDragDrop<idname[]>) {

    const sameContainer = event.previousContainer === event.container
    if (sameContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return
    }

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

    if (event.container.data.length >= this.max4Team()) {
      let index = 0
      while (event.currentIndex === index) {
        index++
      }

      transferArrayItem(event.container.data, event.previousContainer.data, index, event.previousIndex);
      return
    }

  }

  protected onDeletePlayer(list: ModelSignal<idname[]>, player: idname, event: any) {

    event.target.parentElement.classList.add('delete')
    setTimeout(() => {
      list.update(v => v.filter(a => a.id != player.id))
    }, 300);
  }
}
