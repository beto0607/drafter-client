import { Component, input } from '@angular/core';
import {
  CarouselComponent,
  CarouselItemDirective,
} from '../../../../../components';
import { IElement } from '../../../../../domain';

@Component({
  imports: [CarouselComponent, CarouselItemDirective],
  selector: 'app-element-content',
  styleUrl: './element-content.component.scss',
  templateUrl: './element-content.component.html',
})
export class ElementContentComponent {
  element = input.required<IElement>();
}
