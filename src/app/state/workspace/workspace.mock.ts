import { IImageElement, IProject, WithTimestamp } from "../../domain";

const mockedTimestamps = (): WithTimestamp => ({
  createdAt: new Date().toISOString(),
  modifiedAt: undefined,
  deletedAt: undefined,
})

export const mockedElements: IImageElement[] = [
  {
    ...mockedTimestamps(),
    id: '1',
    type: 'image',
    tags: [],
    position: { x: 100, y: 100 },
    size: { width: 100, height: 100 },
    rotation: { x: 0, y: 0, z: 0 },
    locked: false,
    name: 'MockedImage',
    asset: {
      url: 'https://mdn.github.io/shared-assets/images/examples/rhino.jpg',
      id: '',
      type: 'jpeg',
      ...mockedTimestamps(),
    }
  }
]
export const mockedProject: IProject = {
  ...mockedTimestamps(),
  id: '',
  name: 'TestProject',
  backgroundColor: '#ccc',
  elements: mockedElements,
}
