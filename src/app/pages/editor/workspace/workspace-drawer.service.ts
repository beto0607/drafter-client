import { Injectable } from "@angular/core";
import { HexColor, IAudioElement, IElement, IGroupElement, IImageElement, ITextElement, IVideoElement } from "../../../domain";
import { isAudioElement, isGroupElement, isImageElement, isTextElement, isVideoElement } from "../../../utils";

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
    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth
    this.canvasCtx = canvasCtx
  }

  drawProjectBackground(color: HexColor): void {
    if (!this.canvasCtx || !this.canvas) {
      throw new Error('Canvas context not set');
    }
    this.canvasCtx.fillStyle = color;
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height)

  }

  async drawElement(element: IElement): Promise<void> {
    console.log('drawElement', element)
    if (isImageElement(element)) {
      await this.drawImage(element);
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

  private async drawImage(imageElement: IImageElement): Promise<void> {
    if (!this.canvasCtx) {
      throw new Error('Canvas context not set');
    }
    const image = new Image();
    image.onload = () => {
      console.log('onload')
      this.canvasCtx?.drawImage(
        image,
        imageElement.position.x,
        imageElement.position.y,
        imageElement.size.width,
        imageElement.size.height
      )
    }
    image.src = imageElement.asset.url;
  }

  private async drawVideo(vidoeElement: IVideoElement): Promise<void> { }
  private async drawText(textElement: ITextElement): Promise<void> { }
  private async drawAudio(audioElement: IAudioElement): Promise<void> { }
  private async drawGroup(groupElement: IGroupElement): Promise<void> { }
}
