import {
  Component,
  computed,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { IconComponent, SliderComponent } from '../../../../../../components';
import { DrawingCanvasService } from '../../drawing-canvas.service';

@Component({
  imports: [SliderComponent, IconComponent],
  selector: 'app-brush-size',
  templateUrl: './brush-size.component.html',
  styleUrl: './brush-size.component.scss',
})
export class BrushSizeComponent {
  private drawingCanvasService = inject(DrawingCanvasService);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private popover = viewChild.required<ElementRef<HTMLDivElement>>('popover');

  currentSize = this.drawingCanvasService.currentSize;
  isDisabled = computed(
    () => this.drawingCanvasService.currentTool() === 'fill',
  );

  onPencilSizeChanged(newValue: number): void {
    this.drawingCanvasService.setCurrentSize(newValue);
  }

  onOpenSliderClicked(): void {
    const popover = this.popover().nativeElement;
    popover.showPopover();
    const { x, y } = this.elementRef.nativeElement.getBoundingClientRect();
    popover.style.left = x + 30 + 'px';
    popover.style.top = y - 5 + 'px';
  }
}
