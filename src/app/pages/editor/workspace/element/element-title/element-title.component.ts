import { Component, input } from '@angular/core';
import { TitleInputComponent } from '../../../../../components';

@Component({
  imports: [TitleInputComponent],
  selector: 'app-element-title',
  templateUrl: './element-title.component.html',
  styleUrl: './element-title.component.scss',
})
export class ElementTitleComponent {
  elementTitle = input.required<string>();

  onTitleChanged(newValue: string): void {
    console.log(newValue);
  }
}
