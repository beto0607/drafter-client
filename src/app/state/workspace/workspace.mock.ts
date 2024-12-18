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
    size: { width: 100, height: 130 },
    rotation: { x: 0, y: 0, z: 0 },
    locked: false,
    title: 'MMockedImageMockedImageockedImage',
    caption: `
### This is a test
[] accept Markdown
[] have a cool editor
[] profit
`,
    assets: [
      {
        url: 'https://mdn.github.io/shared-assets/images/examples/rhino.jpg',
        id: '01c19983-9891-4542-8d6b-69e4cf647048',
        type: 'jpeg',
        ...mockedTimestamps(),
      },
      {
        url: 'https://file-examples.com/storage/fe22c26a236761a619ba809/2017/04/file_example_MP4_480_1_5MG.mp4',
        id: '01c19983-9891-4542-8d6b-69e4cf647048',
        type: 'mp4',
        ...mockedTimestamps(),
      },
      {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        id: '01c19983-9891-4542-8d6b-69e4cf647048',
        type: 'youtube',
        ...mockedTimestamps(),
      },
      {
        url: 'https://file-examples.com/storage/fe22c26a236761a619ba809/2017/11/file_example_MP3_700KB.mp3',
        id: '01c19983-9891-4542-8d6b-69e4cf647048',
        type: 'mp3',
        ...mockedTimestamps(),
      },
    ],
  },
];
export const mockedProject: IProject = {
  ...mockedTimestamps(),
  id: '81b3e7e9-f020-40ac-ab5f-da7607e9cb62',
  name: 'TestProject',
  backgroundColor: '#cccccc',
  elements: mockedElements,
  tags: [],
};
