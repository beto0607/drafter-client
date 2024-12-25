import { Component, computed, inject } from '@angular/core';
import { SliderComponent } from '../../../../../../components';
import { DrawingCanvasService } from '../../drawing-canvas.service';

@Component({
  imports: [SliderComponent],
  selector: 'app-brush-size',
  templateUrl: './brush-size.component.html',
  styleUrl: './brush-size.component.scss',
})
export class BrushSizeComponent {
  private drawingCanvasService = inject(DrawingCanvasService);

  currentSize = this.drawingCanvasService.currentSize;
  isDisabled = computed(
    () => this.drawingCanvasService.currentTool() !== 'pencil',
  );

  onPencilSizeChanged(newValue: number): void {
    this.drawingCanvasService.setCurrentSize(newValue);
  }
}
