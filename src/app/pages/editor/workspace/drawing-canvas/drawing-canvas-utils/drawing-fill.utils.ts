import { Color, HexColor, IPosition } from '../../../../../domain';
import { areColorsEqual, hexToColor } from '../../../../../utils';

export function fillAreaFrom(
  canvasCtx: CanvasRenderingContext2D,
  position: IPosition,
  targetColor: HexColor,
): void {
  const originalImageData = canvasCtx.getImageData(
    0,
    0,
    canvasCtx.canvas.width,
    canvasCtx.canvas.height,
  );
  const originalColor = getColorIndicesForCoord(
    originalImageData,
    position.x,
    position.y,
    canvasCtx.canvas.width,
  );

  const targetColorObj = hexToColor(targetColor);

  _fillAreaFrom(
    canvasCtx,
    originalImageData,
    position,
    originalColor,
    targetColorObj,
  );
}

// http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
function _fillAreaFrom(
  canvasCtx: CanvasRenderingContext2D,
  imageData: ImageData,
  position: IPosition,
  originalColor: Color,
  targetColor: Color,
): void {
  const currentColor = getColorIndicesForCoord(
    imageData,
    position.x,
    position.y,
    canvasCtx.canvas.width,
  );
  if (areColorsEqual(currentColor, targetColor)) {
    return;
  }
  const pixelStack: IPosition[] = [position];

  while (pixelStack.length) {
    const { x, y } = pixelStack.pop()!;
    let newY = y;
    let currentColor = getColorIndicesForCoord(
      imageData,
      x,
      newY,
      canvasCtx.canvas.width,
    );
    while (newY >= 0 && areColorsEqual(currentColor, originalColor)) {
      newY -= 1;
      currentColor = getColorIndicesForCoord(
        imageData,
        x,
        Math.max(0, newY),
        canvasCtx.canvas.width,
      );
    }
    newY += 1;
    let reachLeft = false;
    let reachRight = false;
    currentColor = getColorIndicesForCoord(
      imageData,
      x,
      newY,
      canvasCtx.canvas.width,
    );
    while (
      newY < canvasCtx.canvas.height &&
      areColorsEqual(currentColor, originalColor)
    ) {
      const pixelPos = (newY * canvasCtx.canvas.width + x) * 4;
      colorPixel(imageData, pixelPos, targetColor);

      if (x >= 0) {
        const c = getColorIndicesForCoord(
          imageData,
          x - 1,
          newY,
          canvasCtx.canvas.width,
        );
        if (areColorsEqual(c, originalColor)) {
          if (!reachLeft) {
            pixelStack.push({ x: x - 1, y: newY });
            reachLeft = true;
          }
        } else if (reachLeft) {
          reachLeft = false;
        }
      }
      if (x <= canvasCtx.canvas.width) {
        const c = getColorIndicesForCoord(
          imageData,
          x + 1,
          newY,
          canvasCtx.canvas.width,
        );
        if (areColorsEqual(c, originalColor)) {
          if (!reachRight) {
            pixelStack.push({ x: x + 1, y: newY });
            reachRight = true;
          }
        } else if (reachRight) {
          reachRight = false;
        }
      }
      newY += 1;
      currentColor = getColorIndicesForCoord(
        imageData,
        x,
        newY,
        canvasCtx.canvas.width,
      );
    }
  }
  canvasCtx.putImageData(imageData, 0, 0);
}

function colorPixel(
  colorLayer: ImageData,
  pixelPos: number,
  targetColor: Color,
) {
  colorLayer.data[pixelPos] = targetColor.red;
  colorLayer.data[pixelPos + 1] = targetColor.green;
  colorLayer.data[pixelPos + 2] = targetColor.blue;
  colorLayer.data[pixelPos + 3] = 255;
}

function getColorIndicesForCoord(
  imageData: ImageData,
  x = 0,
  y = 0,
  width = 1,
): Color {
  const initCoor = (y * width + x) * 4;
  const red = imageData.data[initCoor];
  const green = imageData.data[initCoor + 1];
  const blue = imageData.data[initCoor + 2];
  const alpha = imageData.data[initCoor + 3];
  return { red, green, blue, alpha };
}
