import {
  Component,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { HexColor } from '../../domain';

@Component({
  selector: 'app-color-picker',
  template: `<input
    type="color"
    [value]="currentColor()"
    (input)="onColorChanged($event)"
  />`,
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {
  private elementRef = inject(ElementRef<HTMLDivElement>);
  currentColor = input<HexColor>('#ffffff');
  colorSelected = output<HexColor>();

  private colorPopover =
    viewChild.required<ElementRef<HTMLDivElement>>('colorPopover');

  onColorChanged(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    if (newValue != this.currentColor()) {
      this.colorSelected.emit(newValue as HexColor);
    }
  }

  openColorEditor(): void {
    const nativeElement = this.elementRef.nativeElement as HTMLElement;
    const { x, y } = nativeElement.getBoundingClientRect();
    const colorPopover = this.colorPopover().nativeElement;
    colorPopover.style.top = `${y - 20}px`;
    colorPopover.style.left = `${x + 36}px`;
    colorPopover.showPopover();
  }
}
