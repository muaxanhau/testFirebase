import {DevToolConfigModel, EnvironmentsConfigModel} from 'models';

const environments: EnvironmentsConfigModel = {
  DEVELOPMENT: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'http://localhost:3000/v1/api/',
  },
  STAGING: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'https://reqres.in/',
  },
  PRODUCTION: {
    enableLog: false,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'https://reqres.in/',
  },
};

/**
 * *******************************
 * *** change environment here ***
 * *******************************
 */
export const config = environments.DEVELOPMENT;

/**
 * debug log for response api
 */
export const devToolConfig: DevToolConfigModel = {
  enableLog: true, // should disable or remove on prod mode
  delayFetching: 0, // delay fetch data from server
};
