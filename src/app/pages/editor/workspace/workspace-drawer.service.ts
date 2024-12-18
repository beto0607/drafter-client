import { Injectable } from "@angular/core";
import { HexColor, IAudioElement, IElement, IGroupElement, IImageElement, IProject, ITextElement, IVideoElement } from "../../../domain";
import { isAudioElement, isGroupElement, isImageElement, isTextElement, isVideoElement, loadImage } from "../../../utils";
import { SELECTED_ELEMENT_COLOR } from "./workspace-drawer.constants";

@Injectable()
export class WorkspaceDrawerService {
  private canvas: HTMLCanvasElement | undefined;
  private canvasCtx: CanvasRenderingContext2D | undefined

  setCanvas(canvas: HTMLCanvasElement): void {
    this.canvas = canvas
    const canvasCtx = this.canvas.getContext('2d')
    if (!canvasCtx) {
      throw new Error('Couldn\'t get context from canvas')
    }
    this.canvasCtx = canvasCtx
  }

  async drawProject(project: IProject, selectedElements: IElement['id'][]): Promise<void> {
    this.drawProjectBackground(project.backgroundColor)

    for (const element of project.elements) {
      const selected = selectedElements.includes(element.id)
      await this.drawElement(element, selected)
    }

  }

  async drawElement(element: IElement, selected = false): Promise<void> {
    if (isImageElement(element)) {
      await this.drawImage(element, selected);
    } else if (isTextElement(element)) {
      await this.drawText(element);
    } else if (isVideoElement(element)) {
      await this.drawVideo(element);
    } else if (isAudioElement(element)) {
      await this.drawAudio(element);
    } else if (isGroupElement(element)) {
      await this.drawGroup(element);
    } else {
      throw new Error('Unknwon element type', {
        cause: element
      });
    }
  }

  private async drawImage(imageElement: IImageElement, selected = false): Promise<void> {
    if (!this.canvasCtx) {
      throw new Error('Canvas context not set');
    }
    if (selected) {
      this.canvasCtx.beginPath()
      this.canvasCtx.strokeStyle = SELECTED_ELEMENT_COLOR;
      this.canvasCtx.roundRect(
        imageElement.position.x - 3,
        imageElement.position.y - 3,
        imageElement.size.width + 6,
        imageElement.size.height + 6,
        2
      )
      this.canvasCtx.stroke()
    }
    const image = await loadImage(imageElement.asset);
    this.canvasCtx.drawImage(
      image,
      imageElement.position.x,
      imageElement.position.y,
      imageElement.size.width,
      imageElement.size.height
    )
  }

  private async drawVideo(vidoeElement: IVideoElement): Promise<void> { }
  private async drawText(textElement: ITextElement): Promise<void> { }
  private async drawAudio(audioElement: IAudioElement): Promise<void> { }
  private async drawGroup(groupElement: IGroupElement): Promise<void> { }

  private drawProjectBackground(color: HexColor): void {
    if (!this.canvasCtx || !this.canvas) {
      throw new Error('Canvas context not set');
    }
    this.canvasCtx.fillStyle = color;
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
