import { IImageElement, IProject, WithTimestamp } from "../../domain";

const mockedTimestamps = (): WithTimestamp => ({
  createdAt: new Date().toISOString(),
  modifiedAt: undefined,
  deletedAt: undefined,
})

export const mockedElements: IImageElement[] = [
  {
    ...mockedTimestamps(),
    id: '91637acc-02b3-42c9-80fc-28cc2cc7b369',
    type: 'image',
    tags: [],
    position: { x: 100, y: 100 },
    size: { width: 100, height: 100 },
    rotation: { x: 0, y: 0, z: 0 },
    locked: false,
    name: 'MockedImage',
    asset: {
      url: 'https://mdn.github.io/shared-assets/images/examples/rhino.jpg',
      id: '01c19983-9891-4542-8d6b-69e4cf647048',
      type: 'jpeg',
      ...mockedTimestamps(),
    }
  }
]
export const mockedProject: IProject = {
  ...mockedTimestamps(),
  id: '81b3e7e9-f020-40ac-ab5f-da7607e9cb62',
  name: 'TestProject',
  backgroundColor: '#cccccc',
  elements: mockedElements,
}
