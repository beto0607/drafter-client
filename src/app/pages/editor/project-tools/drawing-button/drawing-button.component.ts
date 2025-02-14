import { Component, inject } from '@angular/core';
import { IconComponent } from '../../../../components';
import { DrawingCanvasOpenerService } from '../../workspace/drawing-canvas';

@Component({
  imports: [IconComponent],
  selector: 'app-drawing-button',
  templateUrl: './drawing-button.component.html',
  styleUrl: './drawing-button.component.scss',
})
export class DrawingButtonComponent {
  private drawingCanvasOpenerService = inject(DrawingCanvasOpenerService);

  onDrawingButtonClicked(): void {
    this.drawingCanvasOpenerService.openDialog();
  }
}
