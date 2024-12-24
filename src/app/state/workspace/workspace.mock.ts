import { IElement, IProject, WithTimestamp } from '../../domain';

const mockedTimestamps = (): WithTimestamp => ({
  createdAt: new Date().toISOString(),
  modifiedAt: undefined,
  deletedAt: undefined,
});

export const mockedElements: IElement[] = [
  {
    ...mockedTimestamps(),
    id: '91637acc-02b3-42c9-80fc-28cc2cc7b369',
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
        id: '01c19983-9891-4542-8d6b-69e4cf647048',
        type: 'image',
        extenstion: 'jpeg',
        mimeType: 'image/jpeg',
        ...mockedTimestamps(),
      },
      {
        url: 'http://home.drafter.local/demo-files/file_example_MP4_480_1_5MG.mp4',
        id: '19314854-8419-41eb-bb5f-ab5cb8c87cff',
        type: 'video',
        extenstion: 'mp4',
        mimeType: 'video/mp4',
        ...mockedTimestamps(),
      },
      {
        url: 'http://home.drafter.local/demo-files/file_example_MP3_700KB.mp3',
        id: 'bb1784b9-5a61-4a73-8ff2-3f72e345296d',
        type: 'audio',
        extenstion: 'mpeg',
        mimeType: 'audio/mpeg',
        ...mockedTimestamps(),
      },
      {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        id: 'be7ae8ce-70e7-4eba-9283-7e0b21e0d95e',
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
