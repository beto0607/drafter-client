import { Component, input, output } from '@angular/core';
import { ITag } from '../../domain';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrl: './pill.component.scss',
})
export class PillComponent {
  pill = input.required<ITag>();
  pillClicked = output();

  onPillClicked(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.pillClicked.emit();
  }
}
