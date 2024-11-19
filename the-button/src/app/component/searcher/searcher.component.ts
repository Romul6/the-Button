import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, model, OnInit, output, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { Observable, of } from 'rxjs'
import { idname } from '../../models/idName'

@Component({
  selector: 'Btn-searcher',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule, MatSelectModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearcherComponent implements OnInit {

  opponent = model<string | idname>('')
  filteredOpponenets!: Observable<idname[]>
  onOpponentSelected = output<idname>()

  opponents: idname[] = [
    { id: 1, name: "Alejandro Mateo" },
    { id: 2, name: "Sofía Isabella" },
    { id: 3, name: "Daniel Lucas" },
    { id: 4, name: "Valentina Martina" },
    { id: 5, name: "Mateo" },
    { id: 6, name: "Camila" },
    { id: 7, name: "Lucas" },
    { id: 8, name: "Isabella" },
    { id: 9, name: "David" },
    { id: 10, name: "Martina" },
    { id: 11, name: "Samuel" },
    { id: 12, name: "Lucía" },
    { id: 13, name: "Nicolás" },
    { id: 14, name: "Paula" },
    { id: 15, name: "Sebastián" },
    { id: 16, name: "María" },
    { id: 17, name: "Tomás" },
    { id: 18, name: "Ana" },
    { id: 19, name: "Gabriel" },
    { id: 20, name: "Julia" },
    { id: 21, name: "Miguel" },
    { id: 22, name: "Irene" },
    { id: 23, name: "Ángel" },
    { id: 24, name: "Clara" },
    { id: 25, name: "Diego" },
    { id: 26, name: "Laura" },
    { id: 27, name: "Pablo" },
    { id: 28, name: "Sara" },
    { id: 29, name: "Martín" },
    { id: 30, name: "Andrea" },
    { id: 31, name: "Álvaro" },
    { id: 32, name: "Elena" },
    { id: 33, name: "Carlos" },
    { id: 34, name: "Sandra" },
    { id: 35, name: "Jorge" },
    { id: 36, name: "Alicia" },
    { id: 37, name: "Adrián" },
    { id: 38, name: "Carolina" },
    { id: 39, name: "Juan" },
    { id: 40, name: "Patricia" },
    { id: 41, name: "Rodrigo" },
    { id: 42, name: "Natalia" },
    { id: 43, name: "Luis" },
    { id: 44, name: "Carmen" },
    { id: 45, name: "Jaime" },
    { id: 46, name: "Victoria" },
    { id: 47, name: "Iván" },
    { id: 48, name: "Alicia" },
    { id: 49, name: "Sergio" },
    { id: 50, name: "Lola" },
    { id: 51, name: "Mario" },
    { id: 52, name: "Antonia" },
    { id: 53, name: "Enzo" },
    { id: 54, name: "Cecilia" },
    { id: 55, name: "Oliver" },
    { id: 56, name: "Regina" },
    { id: 57, name: "Bruno" },
    { id: 58, name: "Beatriz" },
    { id: 59, name: "Ricardo" },
    { id: 60, name: "Manuela" },
    { id: 61, name: "Andrés" },
    { id: 62, name: "Nuria" },
    { id: 63, name: "Rafa" },
    { id: 64, name: "Gema" },
    { id: 65, name: "Marcos" },
    { id: 66, name: "Gloria" },
    { id: 67, name: "Hugo" },
    { id: 68, name: "Mónica" },
    { id: 69, name: "Cristian" },
    { id: 70, name: "Eva" },
    { id: 71, name: "Leonardo" },
    { id: 72, name: "Isabel" },
    { id: 73, name: "Antonio" },
    { id: 74, name: "Ángela" },
    { id: 75, name: "Salvador" },
    { id: 76, name: "Fátima" },
    { id: 77, name: "Vicente" },
    { id: 78, name: "Daniela" },
    { id: 79, name: "Omar" },
    { id: 80, name: "Rocío" },
    { id: 81, name: "Félix" },
    { id: 82, name: "Elsa" },
    { id: 83, name: "Ernesto" },
    { id: 84, name: "Rosa" },
    { id: 85, name: "Rubén" },
    { id: 86, name: "Nora" },
    { id: 87, name: "Ramiro" },
    { id: 88, name: "Alejandra" },
    { id: 89, name: "Jesús" },
    { id: 90, name: "Silvia" },
    { id: 91, name: "Francisco" },
    { id: 92, name: "Claudia" },
    { id: 93, name: "Emilio" },
    { id: 94, name: "Mariana" },
    { id: 95, name: "Alonso" },
    { id: 96, name: "Teresa" },
    { id: 97, name: "Gonzalo" },
    { id: 98, name: "Paloma" },
    { id: 99, name: "Eduardo" },
    { id: 100, name: "Raquel" },
    { id: 101, name: "Braulio" },
    { id: 102, name: "Ágata" },
    { id: 103, name: "Mauricio" },
    { id: 104, name: "Bárbara" },
    { id: 105, name: "Julián" },
    { id: 106, name: "Diana" },
    { id: 107, name: "Esteban" },
    { id: 108, name: "Maribel" },
    { id: 109, name: "Saúl" },
    { id: 110, name: "Rebeca" },
    { id: 111, name: "Valentín" },
    { id: 112, name: "Adela" },
    { id: 113, name: "Lucas" },
    { id: 114, name: "Consuelo" },
    { id: 115, name: "Simón" },
    { id: 116, name: "Aleida" },
    { id: 117, name: "Héctor" },
    { id: 118, name: "Aurora" },
    { id: 119, name: "Rafael" },
    { id: 120, name: "Miranda" },
    { id: 121, name: "Lorenzo" },
    { id: 122, name: "Amelia" },
    { id: 123, name: "Joel" },
    { id: 124, name: "Margarita" },
    { id: 125, name: "Elías" },
    { id: 126, name: "Magdalena" },
    { id: 127, name: "Iván" },
    { id: 128, name: "Eugenia" },
    { id: 129, name: "Benjamín" },
    { id: 130, name: "Jimena" },
    { id: 131, name: "Arnoldo" },
    { id: 132, name: "Aleida" },
    { id: 133, name: "Oscar" },
    { id: 134, name: "Blanca" },
    { id: 135, name: "Noé" },
    { id: 136, name: "Mercedes" },
    { id: 137, name: "Maximiliano" },
    { id: 138, name: "Perla" },
    { id: 139, name: "Germán" },
    { id: 140, name: "Celeste" },
    { id: 141, name: "Raúl" },
    { id: 142, name: "Adriana" },
    { id: 143, name: "Claudio" },
    { id: 144, name: "Gabriela" },
    { id: 145, name: "Josué" },
    { id: 146, name: "Florencia" },
    { id: 147, name: "Fabián" },
    { id: 148, name: "Lucrecia" },
    { id: 149, name: "Cristóbal" },
    { id: 150, name: "Ariadna" },
  ]

  constructor() {
    effect(() => {
      const name = typeof this.opponent() === 'string' ? this.opponent().toString() : (this.opponent() as idname).name
      this.filteredOpponenets = this._filter(name || '')
    })

    setTimeout(() => {
      this.onOpponentSelected.emit(this.opponents[0])
      this.onOpponentSelected.emit(this.opponents[1])
      this.onOpponentSelected.emit(this.opponents[2])
      this.onOpponentSelected.emit(this.opponents[3])
    }, 1000);
  }

  ngOnInit(): void {
    this.opponent.subscribe((value) => {
      if (value && typeof (value) === 'object') {
        this.onOpponentSelected.emit(value as idname)
        setTimeout(() => {
          this.opponent.set('')

        }, 0);
      }
    })
  }

  public displayFn(user: idname): string {
    return user && user.name ? user.name : ''
  }

  private _filter(value: string): Observable<idname[]> {
    return of(this.opponents.filter(option => option.name.toLowerCase().includes(value.toLowerCase())))
  }

}
