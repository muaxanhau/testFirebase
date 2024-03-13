// add new environment here
type EnvironmentList = 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';
export type EnvironmentsConfigModel = Record<
  EnvironmentList,
  {
    enableLog: boolean;
    version: {
      phase: number;
      release: number;
      build: number;
    };
    baseUrl: string;
  }
>;

export type DevToolConfigModel = {
  delayFetching: number;
};
