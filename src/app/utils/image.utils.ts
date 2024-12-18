import { IAsset, ImageAssetType } from '../domain';

const cachedImages = new Map<string, HTMLImageElement>();

export function loadImage(
  asset: IAsset<ImageAssetType>,
  allowCached = true,
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const cacheKey = asset.url;

    const cachedImage = cachedImages.get(cacheKey);

    if (cachedImage && allowCached) {
      resolve(cachedImage);
      return;
    }
    const image = new Image();
    image.onerror = (error) => {
      reject(error);
    };
    image.onload = () => {
      if (allowCached) {
        cachedImages.set(cacheKey, image);
      }
      resolve(image);
    };
    image.src = asset.url;
  });
}
