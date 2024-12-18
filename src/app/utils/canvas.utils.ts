import { HexColor, IPosition, ISize } from "../domain";

export function drawFillRect(
  canvasCtx: CanvasRenderingContext2D,
  rect: IPosition & ISize,
  color: HexColor
): void {
  canvasCtx.beginPath()
  canvasCtx.fillStyle = color;
  canvasCtx.fillRect(
    rect.x,
    rect.y,
    rect.width,
    rect.height
  )
  canvasCtx.fill()
  canvasCtx.closePath()
}

export function drawFillRoundRect(
  canvasCtx: CanvasRenderingContext2D,
  rect: IPosition & ISize,
  color: HexColor,
  radius: number | number[]
): void {
  canvasCtx.beginPath()
  canvasCtx.fillStyle = color;
  canvasCtx.roundRect(
    rect.x,
    rect.y,
    rect.width,
    rect.height,
    radius
  )
  canvasCtx.fill()
  canvasCtx.closePath()
}

export function drawStrokeRect(
  canvasCtx: CanvasRenderingContext2D,
  rect: IPosition & ISize,
  color: HexColor
): void {
  canvasCtx.beginPath()
  canvasCtx.strokeStyle = color;
  canvasCtx.strokeRect(
    rect.x,
    rect.y,
    rect.width,
    rect.height,
  )
  canvasCtx.stroke()
  canvasCtx.closePath()
}

export function drawStrokeRoundRect(
  canvasCtx: CanvasRenderingContext2D,
  rect: IPosition & ISize,
  color: HexColor,
  radius: number | number[]
): void {
  canvasCtx.beginPath()
  canvasCtx.strokeStyle = color;
  canvasCtx.roundRect(
    rect.x,
    rect.y,
    rect.width,
    rect.height,
    radius
  )
  canvasCtx.stroke()
  canvasCtx.closePath()
}

//<path xmlns="http://www.w3.org/2000/svg" d="M21 15L15 21M21 8L8 21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
export function drawResizeIcon(
  canvasCtx: CanvasRenderingContext2D,
  rect: IPosition & ISize,
  color: HexColor,
): void {
  const path = new Path2D()
  const svgPath = new Path2D("M21 15L15 21M21 8L8 21")
  const m = new DOMMatrix();
  m.a = m.d = 0.75;
  m.b = 0;
  m.c = 0;
  m.e = rect.x + ((1 - 0.75) * 21);
  m.f = rect.y + ((1 - 0.75) * 21);

  canvasCtx.beginPath()
  canvasCtx.strokeStyle = color;
  path.addPath(svgPath, m);
  canvasCtx.stroke(path)
  canvasCtx.closePath()

}
