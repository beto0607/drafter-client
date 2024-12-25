import { Component, inject } from '@angular/core';
import {
  ColorPickerComponent,
  IconComponent,
  SelectableIconButtonComponent,
} from '../../../../../components';
import { ToolType } from '../drawing-canvas-tools.types';
import { DrawingCanvasService } from '../drawing-canvas.service';
import { HexColor } from '../../../../../domain';

@Component({
  imports: [IconComponent, SelectableIconButtonComponent, ColorPickerComponent],
  selector: 'app-drawing-canvas-tools',
  templateUrl: './drawing-canvas-tools.component.html',
  styleUrl: './drawing-canvas-tools.component.scss',
})
export class DrawingCanvasToolsComponent {
  private drawingCanvasService = inject(DrawingCanvasService);

  currentTool = this.drawingCanvasService.currentTool;
  currentColor = this.drawingCanvasService.currentColor;

  onSelectedTool(newTool: ToolType): void {
    this.drawingCanvasService.setCurrentTool(newTool);
  }

  onColorSelected(newColor: HexColor): void {
    this.drawingCanvasService.setColor(newColor);
  }
}
