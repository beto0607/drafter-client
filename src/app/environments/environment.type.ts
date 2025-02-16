export interface IAppEnvironment {
  stage: 'local' | 'test' | 'home';
  origins: {
    api: string;
  };
}
