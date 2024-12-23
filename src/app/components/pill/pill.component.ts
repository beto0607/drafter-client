import { Component, input, output } from '@angular/core';
import { ITag } from '../../domain';
import { IconComponent } from '../icon/icon.component';

@Component({
  imports: [IconComponent],
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrl: './pill.component.scss',
})
export class PillComponent {
  pill = input.required<ITag>();

  deletable = input(false);
  pillClicked = output();
  pillDeleteClicked = output();

  onPillClicked(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.pillClicked.emit();
  }

  onDeletePillClicked(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.pillDeleteClicked.emit();
  }
}
