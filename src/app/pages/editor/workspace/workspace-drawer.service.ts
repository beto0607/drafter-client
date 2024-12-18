import { Injectable } from "@angular/core";
import { HexColor, IElement, IImageElement, IProject } from "../../../domain";
import { isAudioElement, isGroupElement, isImageElement, isTextElement, isVideoElement, loadImage } from "../../../utils";
import { drawFillRect, drawFillRoundRect, drawResizeIcon, drawStrokeRoundRect } from "../../../utils/canvas.utils";
import { ELEMENT_BACKGROUND_COLOR, ELEMENT_BORDER_COLOR, ELEMENT_NAME_COLOR, ELEMENT_NAME_FONT, ELEMENT_NAME_OFFSET, RESIZE_ICON_COLOR, RESIZE_ICON_SIZE, SELECTED_ELEMENT_COLOR, SELECTED_ELEMENT_PADDING } from "./workspace-drawer.constants";

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
    this.canvasCtx.font = "24px serif"
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
      // await this.drawText(element);
    } else if (isVideoElement(element)) {
      // await this.drawVideo(element);
    } else if (isAudioElement(element)) {
      // await this.drawAudio(element);
    } else if (isGroupElement(element)) {
      // await this.drawGroup(element);
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
    drawFillRoundRect(
      this.canvasCtx,
      {
        x: imageElement.position.x - SELECTED_ELEMENT_PADDING,
        y: imageElement.position.y - SELECTED_ELEMENT_PADDING - ELEMENT_NAME_OFFSET,
        width: imageElement.size.width + (SELECTED_ELEMENT_PADDING * 2),
        height: imageElement.size.height + (SELECTED_ELEMENT_PADDING * 2) + ELEMENT_NAME_OFFSET + RESIZE_ICON_SIZE,
      },
      ELEMENT_BACKGROUND_COLOR,
      2
    )
    this.canvasCtx.beginPath()
    this.canvasCtx.textAlign = 'center'
    this.canvasCtx.textBaseline = 'middle'
    this.canvasCtx.font = ELEMENT_NAME_FONT
    this.canvasCtx.fillStyle = ELEMENT_NAME_COLOR
    this.canvasCtx.fillText(
      imageElement.name,
      imageElement.position.x + (imageElement.size.width / 2),
      imageElement.position.y + SELECTED_ELEMENT_PADDING - ELEMENT_NAME_OFFSET / 2,
      imageElement.size.width
    )
    this.canvasCtx.fill()
    if (selected) {
      drawStrokeRoundRect(
        this.canvasCtx,
        {
          x: imageElement.position.x - SELECTED_ELEMENT_PADDING,
          y: imageElement.position.y - SELECTED_ELEMENT_PADDING - ELEMENT_NAME_OFFSET,
          width: imageElement.size.width + (SELECTED_ELEMENT_PADDING * 2),
          height: imageElement.size.height + (SELECTED_ELEMENT_PADDING * 2) + ELEMENT_NAME_OFFSET + RESIZE_ICON_SIZE,
        },
        SELECTED_ELEMENT_COLOR,
        2
      )
    } else {
      drawStrokeRoundRect(
        this.canvasCtx,
        {
          x: imageElement.position.x - SELECTED_ELEMENT_PADDING,
          y: imageElement.position.y - SELECTED_ELEMENT_PADDING - ELEMENT_NAME_OFFSET,
          width: imageElement.size.width + (SELECTED_ELEMENT_PADDING * 2),
          height: imageElement.size.height + (SELECTED_ELEMENT_PADDING * 2) + ELEMENT_NAME_OFFSET + RESIZE_ICON_SIZE
        },
        ELEMENT_BORDER_COLOR,
        2
      )
    }
    const image = await loadImage(imageElement.asset);
    this.canvasCtx.drawImage(
      image,
      imageElement.position.x,
      imageElement.position.y,
      imageElement.size.width,
      imageElement.size.height
    )

    drawResizeIcon(this.canvasCtx,
      {
        x: imageElement.position.x + imageElement.size.width - RESIZE_ICON_SIZE - SELECTED_ELEMENT_PADDING - 1,
        y: imageElement.position.y + imageElement.size.height - SELECTED_ELEMENT_PADDING - 1,
        width: RESIZE_ICON_SIZE,
        height: RESIZE_ICON_SIZE
      },
      selected ? SELECTED_ELEMENT_COLOR : RESIZE_ICON_COLOR
    )
  }


  private drawProjectBackground(color: HexColor): void {
    if (!this.canvasCtx || !this.canvas) {
      throw new Error('Canvas context not set');
    }
    drawFillRect(this.canvasCtx,
      {
        x: 0, y: 0,
        width: this.canvas.width,
        height: this.canvas.height
      },
      color
    )
  }
}
