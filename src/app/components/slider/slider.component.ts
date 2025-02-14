import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-slider',
  styleUrl: './slider.component.scss',
  template: `<input
    type="range"
    [min]="minValue()"
    [max]="maxValue()"
    [value]="value()"
    [disabled]="disabled()"
    (input)="onValueChanged($event)"
  />`,
})
export class SliderComponent {
  disabled = input(false);
  minValue = input(1);
  maxValue = input(10);

  value = input(5);

  valueChanged = output<number>();

  onValueChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = parseInt(target.value);

    this.valueChanged.emit(newValue);
  }
}
