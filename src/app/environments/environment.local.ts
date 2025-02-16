import { IAppEnvironment } from './environment.type';

export const environment: IAppEnvironment = {
  stage: 'local',
  origins: {
    api: 'http://api.drafter.local/api',
  },
};
