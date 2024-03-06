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
    tokenType: string;
  }
>;

export type DevToolConfigModel = {
  enable: boolean;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'ALL';
  url: string | null;
  delayFetching: number;
};
