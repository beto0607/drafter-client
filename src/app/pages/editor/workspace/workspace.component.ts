import { Component, effect, viewChild } from "@angular/core";

@Component({
  selector: 'app-workspace',
  imports: [],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {
  private canvas = viewChild<HTMLCanvasElement>('canvas');

  constructor() {
    effect(() => {
      const canvas = this.canvas()
      console.log(canvas)
    })
  }
}

