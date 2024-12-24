import { IElement, IProject, WithTimestamp } from '../../domain';
import { uuidv4 } from '../../utils';

const mockedTimestamps = (): WithTimestamp => ({
  createdAt: new Date().toISOString(),
  modifiedAt: undefined,
  deletedAt: undefined,
});

export const mockedElements: IElement[] = [
  {
    ...mockedTimestamps(),
    id: uuidv4(),
    tags: [
      {
        color: '#00ff00',
        text: 'LGTM',
      },
      {
        color: '#9c1',
        text: 'Blocked',
      },
    ],
    position: { x: 200, y: 200 },
    size: { width: 250, height: 250 },
    rotation: { x: 0, y: 0, z: 0 },
    locked: false,
    title: 'MMockedImageMockedImageockedImage',
    caption: `
### This is a test
- [x] This task is done
- [ ] This is still pending
- [] accept Markdown
- [x] have a cool editor
- [ ] profit
`,
    assets: [
      {
        url: 'https://mdn.github.io/shared-assets/images/examples/rhino.jpg',
        id: uuidv4(),
        type: 'image',
        extenstion: 'jpeg',
        mimeType: 'image/jpeg',
        ...mockedTimestamps(),
      },
      {
        url: 'http://home.drafter.local/demo-files/file_example_MP4_480_1_5MG.mp4',
        id: uuidv4(),
        type: 'video',
        extenstion: 'mp4',
        mimeType: 'video/mp4',
        ...mockedTimestamps(),
      },
      {
        url: 'http://home.drafter.local/demo-files/file_example_MP3_700KB.mp3',
        id: uuidv4(),
        type: 'audio',
        extenstion: 'mpeg',
        mimeType: 'audio/mpeg',
        ...mockedTimestamps(),
      },
      {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        id: uuidv4(),
        type: 'link',
        extenstion: 'youtube',
        mimeType: 'link',
        ...mockedTimestamps(),
      },
    ],
  },
];
export const mockedProject: IProject = {
  ...mockedTimestamps(),
  id: '',
  name: 'TestProject',
  backgroundColor: '#cccccc',
  elements: mockedElements,
  tags: [],
};
