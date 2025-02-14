import { Component, input, output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  imports: [IconComponent],
  selector: 'app-selectable-icon-button',
  templateUrl: './selectable-icon-button.component.html',
  styleUrl: './selectable-icon-button.component.scss',
})
export class SelectableIconButtonComponent {
  icon: IconComponent['icon'] = input.required();
  selected = input(false);

  buttonClicked = output();

  onButtonClicked(): void {
    this.buttonClicked.emit();
  }
}
